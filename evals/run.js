#!/usr/bin/env node
// Eval harness entrypoint. See evals/README.md for methodology.
//
// Usage:
//   node evals/run.js                                   # all pilot skills, both buckets
//   node evals/run.js swebok-process                     # one skill, both buckets
//   node evals/run.js swebok-process --trigger-only
//   node evals/run.js swebok-process --quality-only
//   node evals/run.js --model sonnet --judge-model haiku   # both are Claude model names — only valid with the default --harness claude
//   node evals/run.js swebok-process --baseline evals/results/swebok-process/2026-08-01T00-00-00-000Z__abc1234.json
//   node evals/run.js --max-total-budget-usd 20 --yes
//   node evals/run.js --mock                            # offline zero-cost dry-run
//   node evals/run.js swebok-process --case trigger_pos_1 --mock
//   node evals/run.js swebok-process --harness opencode --judge-harness claude

import {
  listPilotSkills,
  loadCases,
  loadRubric,
  loadFixture,
  computeTriggerStats,
  computeQualityStats,
  formatSummaryTable,
  writeResult,
  readResultFile,
  detectSetupErrors,
} from "./lib/runner-lib.js";
import { getHarness } from "./lib/harnesses/registry.js";

const TRIGGER_BUDGET_DEFAULT = 0.25;
const QUALITY_BUDGET_DEFAULT = 0.75;
const JUDGE_BUDGET_DEFAULT = 0.2;
const CONCURRENCY = 3;

function parseArgs(argv) {
  const opts = {
    skill: null,
    triggerOnly: false,
    qualityOnly: false,
    model: undefined,
    // No cross-harness default here on purpose: "haiku" is a Claude model
    // name and is invalid for junie/opencode/api. Leaving this undefined
    // lets each harness fall back to its own sensible default (ClaudeHarness
    // still defaults to "haiku" internally; junie/opencode omit --model and
    // let the CLI use whatever it's configured with; api falls back to a
    // free model). Always pass --judge-model explicitly with a name valid
    // for --judge-harness (or --harness, if --judge-harness isn't set) —
    // see "Model names are harness-specific" in evals/README.md.
    judgeModel: undefined,
    baseline: null,
    maxTotalBudget: 15,
    yes: false,
    verbose: false,
    harness: undefined,
    judgeHarness: undefined,
    caseId: null,
    mock: false,
    endpoint: undefined,
    apiKey: undefined,
  };
  const rest = [...argv];

  while (rest.length) {
    const arg = rest.shift();
    if (arg === "--trigger-only") opts.triggerOnly = true;
    else if (arg === "--quality-only") opts.qualityOnly = true;
    else if (arg === "--model") opts.model = rest.shift();
    else if (arg === "--judge-model") opts.judgeModel = rest.shift();
    else if (arg === "--baseline") opts.baseline = rest.shift();
    else if (arg === "--max-total-budget-usd") opts.maxTotalBudget = Number(rest.shift());
    else if (arg === "--yes") opts.yes = true;
    else if (arg === "--verbose") opts.verbose = true;
    else if (arg === "--harness") {
      opts.harness = rest.shift();
    } else if (arg === "--judge-harness") {
      opts.judgeHarness = rest.shift();
    } else if (arg === "--case") {
      opts.caseId = rest.shift();
    } else if (arg === "--mock") {
      opts.mock = true;
    } else if (arg === "--endpoint") {
      opts.endpoint = rest.shift();
    } else if (arg === "--api-key") {
      opts.apiKey = rest.shift();
    } else if (!arg.startsWith("--")) {
      opts.skill = arg;
    } else {
      throw new Error(`Unknown flag: ${arg}`);
    }
  }

  if (opts.triggerOnly && opts.qualityOnly) {
    throw new Error("--trigger-only and --quality-only are mutually exclusive");
  }

  if (opts.mock) {
    if (!opts.harness) opts.harness = "mock";
    if (!opts.judgeHarness) opts.judgeHarness = "mock";
  }

  if (!opts.harness) opts.harness = "claude";
  if (!opts.judgeHarness) opts.judgeHarness = opts.harness;

  return opts;
}

async function pMapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next;
      next += 1;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function getModelCostMultiplier(harness, model, endpoint) {
  if (harness === "mock") return 0;
  if (endpoint && (endpoint.includes("localhost") || endpoint.includes("127.0.0.1") || endpoint.includes("0.0.0.0"))) {
    return 0;
  }
  if (!model) return 1.0;
  const m = model.toLowerCase();
  if (m.includes("free") || m.includes("local") || m.includes("ollama")) {
    return 0;
  }
  if (/flash|lite|mini|micro|haiku|nano|small|\b[0-9]+b\b/.test(m)) {
    return 0.02;
  }
  return 1.0;
}

function estimateCost(cases, opts, primaryMult, judgeMult) {
  if (opts.mock) return 0;
  const triggerUnitCost = TRIGGER_BUDGET_DEFAULT * primaryMult;
  const qualityUnitCost = QUALITY_BUDGET_DEFAULT * primaryMult;
  const judgeUnitCost = JUDGE_BUDGET_DEFAULT * judgeMult;

  const triggerCalls = opts.qualityOnly ? 0 : cases.trigger_positive.length + cases.trigger_negative.length;
  const qualityCalls = opts.triggerOnly ? 0 : cases.quality.length;

  return (
    triggerCalls * triggerUnitCost +
    qualityCalls * qualityUnitCost +
    (opts.triggerOnly ? 0 : qualityCalls * judgeUnitCost)
  );
}

async function runTriggerBucket(slug, cases, opts, primaryHarness) {
  // Positive and negative cases are independent, so run them through one
  // shared pMapLimit pool (still capped at CONCURRENCY) instead of two
  // sequential pools — cuts the number of spawn "rounds" for a bucket.
  const items = [
    ...cases.trigger_positive.map((c) => ({ case: c, isNegative: false })),
    ...cases.trigger_negative.map((c) => ({ case: c, isNegative: true })),
  ];
  const results = await pMapLimit(items, CONCURRENCY, async ({ case: c, isNegative }) => {
    const r = await primaryHarness.runTriggerCase(c.prompt, {
      budget: TRIGGER_BUDGET_DEFAULT,
      model: opts.model,
      slug,
      isNegative,
      kind: c.kind,
      endpoint: opts.endpoint,
      apiKey: opts.apiKey,
    });
    if (opts.verbose) {
      const tag = isNegative ? `[trigger-] ${c.id} (${c.kind})` : `[trigger+] ${c.id}`;
      console.log(`  ${tag}: fired=${r.firedSkills.join(",") || "none"}`);
    }
    return { case: c, isNegative, ...r };
  });
  const positive = results.filter((r) => !r.isNegative);
  const negative = results.filter((r) => r.isNegative);
  const stats = computeTriggerStats(positive, negative, slug);
  return { positive, negative, stats };
}

async function runQualityBucket(slug, cases, rubric, opts, primaryHarness, judgeHarness) {
  const results = await pMapLimit(cases.quality, CONCURRENCY, async (c) => {
    const scenarioPrompt = c.fixture
      ? `${c.prompt}\n\n---\nSupporting context (${c.fixture}):\n\n${await loadFixture(slug, c.fixture)}`
      : c.prompt;
    const quality = await primaryHarness.runQualityCase(slug, scenarioPrompt, {
      budget: QUALITY_BUDGET_DEFAULT,
      model: opts.model,
      endpoint: opts.endpoint,
      apiKey: opts.apiKey,
    });
    const judge = await judgeHarness.runJudge(rubric, scenarioPrompt, quality.transcript, {
      budget: JUDGE_BUDGET_DEFAULT,
      judgeModel: opts.judgeModel,
      endpoint: opts.endpoint,
      apiKey: opts.apiKey,
    });
    if (opts.verbose) {
      console.log(`  [quality] ${c.id}: verdict=${judge.judgeOutput?.verdict ?? "JUDGE_ERROR"}`);
    }
    const { cost: judgeCost, ...judgeRest } = judge;
    return {
      case: c,
      transcript: quality.transcript,
      scenarioCost: quality.cost,
      judgeCost,
      ...judgeRest,
    };
  });
  const stats = computeQualityStats(results);
  return { results, stats };
}

// Builds a caseId -> passed map from a run's trigger/quality buckets, so
// current and baseline results can be compared case-by-case.
function buildPassMap(trigger, quality, slug) {
  const map = new Map();
  for (const r of quality?.results ?? []) map.set(r.case.id, r.judgeOutput?.verdict === "pass");
  for (const r of trigger?.positive ?? []) map.set(r.case.id, r.firedSkills.includes(slug));
  for (const r of trigger?.negative ?? []) map.set(r.case.id, !r.firedSkills.includes(slug));
  return map;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const primaryHarness = getHarness(opts.harness, opts);
  const judgeHarness = getHarness(opts.judgeHarness, opts);

  const skills = opts.skill ? [opts.skill] : await listPilotSkills();

  const primaryMult = getModelCostMultiplier(opts.harness, opts.model, opts.endpoint);
  const judgeMult = getModelCostMultiplier(opts.judgeHarness, opts.judgeModel, opts.endpoint);

  let totalEstimate = 0;
  const perSkillCases = {};
  for (const slug of skills) {
    let cases = await loadCases(slug);
    if (opts.caseId) {
      cases = {
        trigger_positive: cases.trigger_positive.filter((c) => c.id === opts.caseId),
        trigger_negative: cases.trigger_negative.filter((c) => c.id === opts.caseId),
        quality: cases.quality.filter((c) => c.id === opts.caseId),
      };
    }
    perSkillCases[slug] = cases;
    totalEstimate += estimateCost(cases, opts, primaryMult, judgeMult);
  }

  let costNote = "";
  if (totalEstimate === 0) {
    costNote = "(running on local/free model or mock harness)";
  } else if (primaryMult < 0.1 || judgeMult < 0.1) {
    costNote = "(estimated using lightweight model pricing)";
  } else {
    costNote = "(actual cost is usually much lower once Anthropic's prompt cache warms up after the first call)";
  }

  console.log(
    `Estimated worst-case cost for this run: $${totalEstimate.toFixed(2)} across ${skills.length} skill(s) ${costNote}.`
  );
  if (totalEstimate > opts.maxTotalBudget && !opts.yes && !opts.mock) {
    console.error(
      `Refusing to run: estimate ($${totalEstimate.toFixed(2)}) exceeds --max-total-budget-usd ` +
        `(${opts.maxTotalBudget}). Re-run with --yes to proceed anyway, or raise --max-total-budget-usd.`
    );
    process.exitCode = 1;
    return;
  }

  const summaryRows = [];
  for (const slug of skills) {
    console.log(`\n=== ${slug} ===`);
    const cases = perSkillCases[slug];
    const rubric = await loadRubric(slug);

    let trigger = null;
    let quality = null;
    if (!opts.qualityOnly) {
      trigger = await runTriggerBucket(slug, cases, opts, primaryHarness);
    }
    if (!opts.triggerOnly) {
      quality = await runQualityBucket(slug, cases, rubric, opts, primaryHarness, judgeHarness);
    }

    const overallPass = (trigger ? trigger.stats.recall.ok && trigger.stats.precision.ok : true) &&
      (quality ? quality.stats.ok : true);

    const resultObj = {
      meta: {
        skill: slug,
        timestamp: new Date().toISOString(),
        model: opts.model ?? "default",
        judgeModel: opts.judgeModel ?? "harness-default",
        harness: opts.harness,
        judgeHarness: opts.judgeHarness,
      },
      trigger,
      quality,
      overallPass,
    };
    const file = await writeResult(slug, resultObj);
    console.log(`  results written to ${file}`);

    const setupError = detectSetupErrors(trigger, quality);
    if (setupError) {
      const scope = setupError.allFailed ? "EVERY case" : `${setupError.count}/${setupError.total} cases`;
      console.log(
        `  ⚠ SETUP ERROR, not a skill failure: ${scope} for "${slug}" errored before the skill ` +
          `ever ran (bad --model/--judge-model for --harness ${opts.harness}/--judge-harness ` +
          `${opts.judgeHarness}, or the CLI isn't on PATH). Sample: ${setupError.sample}`
      );
      if (setupError.allFailed) {
        console.log(
          `  Fix the model/harness pairing (see "Model names are harness-specific" in evals/README.md) and re-run — ` +
            `the FAIL below measures nothing about the skill.`
        );
      }
    }

    if (opts.baseline) {
      const baseline = await readResultFile(opts.baseline);
      const currentIds = buildPassMap(trigger, quality, slug);
      const baselineIds = buildPassMap(baseline.trigger, baseline.quality, slug);
      for (const [id, passedBefore] of baselineIds) {
        if (passedBefore && currentIds.get(id) === false) {
          console.log(`  REGRESSED: case "${id}" passed in baseline, fails now`);
        }
      }
    }

    summaryRows.push({
      skill: slug,
      trigger: trigger?.stats ?? null,
      quality: quality?.stats ?? null,
      overallPass,
    });
  }

  console.log("\n" + formatSummaryTable(summaryRows));
  process.exitCode = summaryRows.every((r) => r.overallPass) ? 0 : 1;
}

main().catch((err) => {
  console.error(err.stack || String(err));
  process.exitCode = 1;
});
