// Shared plumbing for the skill eval harness. Zero external dependencies —
// only Node built-ins, spawning the `claude` CLI directly.
//
// Isolation flags used on every `claude -p` call below (`--setting-sources
// project --strict-mcp-config`) were chosen empirically: this machine's
// default session pulls in every globally-installed skill/plugin and every
// configured MCP server, which both inflates cost (tens of thousands of
// tokens of tool-schema cache-creation on the first call) and pollutes
// trigger evals with irrelevant competing skills. These flags trim that
// down to roughly this repo's plugin plus Claude Code's own bundled
// skills — full isolation to *only* the 5 pilot skills isn't achievable via
// CLI flags (a handful of bundled skills like "debug" and "code-review"
// always load), which is a known limitation documented in evals/README.md.

import { spawn } from "node:child_process";
import { readFile, writeFile, mkdir, readdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  ".."
);

export const EVALS_DIR = path.join(REPO_ROOT, "evals");

export function spawnCollect(cmd, args, { cwd = REPO_ROOT, input } = {}) {
  return new Promise((resolve) => {
    try {
      const child = spawn(cmd, args, { cwd, stdio: ["pipe", "pipe", "pipe"] });
      let stdout = "";
      let stderr = "";
      child.stdout.on("data", (d) => {
        stdout += d;
      });
      child.stderr.on("data", (d) => {
        stderr += d;
      });
      child.on("error", (err) => {
        resolve({ code: 1, stdout: "", stderr: String(err) });
      });
      child.on("close", (code) => resolve({ code: code ?? 1, stdout, stderr }));
      if (input) child.stdin.write(input);
      child.stdin.end();
    } catch (err) {
      resolve({ code: 1, stdout: "", stderr: String(err) });
    }
  });
}

// `spawnCollect` defaults `cwd` to REPO_ROOT, which is fine for `claude -p`
// (restricted to `--tools Skill` on trigger cases, and never asked to write
// files on quality/judge cases) but is NOT fine for agentic CLIs like junie
// or opencode that have real file-write tools and no such restriction —
// a junie eval run against this exact repo once treated eval prompts as
// real tasks and rewrote/created files in REPO_ROOT for real (see git
// history around the junie-harness sandboxing fix). Any harness that spawns
// an agentic CLI with file-write access must run it against a disposable
// directory instead, never REPO_ROOT itself. Skill discovery still works
// from an unrelated project dir since `--skill-location` takes an absolute
// path.
export async function withSandboxDir(fn) {
  const dir = await mkdtemp(path.join(tmpdir(), "agent-skills-eval-sandbox-"));
  try {
    return await fn(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export async function gitShortSha() {
  const { stdout } = await spawnCollect("git", ["rev-parse", "--short", "HEAD"]);
  return stdout.trim() || "nogit";
}

export function parseNdjson(stdout) {
  const events = [];
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      events.push(JSON.parse(trimmed));
    } catch {
      // stray non-JSON output on stdout (shouldn't normally happen) — skip it
    }
  }
  const result = events.find((e) => e.type === "result") ?? null;
  return { events, result };
}

export function lastJsonValue(stdout) {
  const lines = stdout.trim().split("\n").filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    try {
      return JSON.parse(lines[i]);
    } catch {
      // keep looking further back
    }
  }
  return null;
}

// Matches a Skill-tool invocation in a CLI's free-text/JSON stdout, e.g.
// `Skill(skill="foo")` or `"skill": "foo"`. Shared by harnesses (opencode,
// api) whose CLI/API output has no structured tool-call event to read
// instead.
export function extractFiredSkillsFromText(text) {
  const regex = /(?:Skill\(skill=["']?([^"'\s\)]+)["']?\)|"skill"\s*:\s*["']([^"']+)["'])/g;
  const firedSkills = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const skillName = (match[1] || match[2]).split(":").pop();
    if (!firedSkills.includes(skillName)) firedSkills.push(skillName);
  }
  return firedSkills;
}

async function stripFrontmatter(md) {
  return md.replace(/^---\n[\s\S]*?\n---\n/, "");
}

/** Concatenates a skill's SKILL.md (frontmatter stripped) with any
 * references/*.md files, for direct injection via --append-system-prompt. */
export async function loadSkillContent(slug) {
  const skillDir = path.join(REPO_ROOT, "skills", slug);
  const skillMd = await readFile(path.join(skillDir, "SKILL.md"), "utf8");
  let content = await stripFrontmatter(skillMd);
  const refDir = path.join(skillDir, "references");
  try {
    const files = (await readdir(refDir)).filter((f) => f.endsWith(".md")).sort();
    for (const f of files) {
      const refContent = await readFile(path.join(refDir, f), "utf8");
      content += `\n\n## Reference: ${f}\n\n${refContent}`;
    }
  } catch {
    // no references/ dir for this skill — fine
  }
  return content;
}

// Harnesses without schema-constrained output (junie, opencode) append this
// to the rendered judge prompt to ask for JSON in plain text instead.
export const JUDGE_JSON_INSTRUCTION =
  'Respond ONLY with valid JSON matching schema: {"verdict": "pass"|"fail", "dimension_scores": {}, "summary": "..."}';

/** Reads evals/lib/judge-prompt.md and fills in the rubric, scenario prompt,
 * and transcript for a quality-case judging pass. Shared by every harness's
 * runJudge. */
export async function renderJudgePrompt(rubric, scenarioPrompt, transcript) {
  const template = await readFile(path.join(EVALS_DIR, "lib", "judge-prompt.md"), "utf8");
  return template
    .replace("{{RUBRIC}}", rubric)
    .replace("{{SCENARIO_PROMPT}}", scenarioPrompt)
    .replace("{{TRANSCRIPT}}", transcript || "(the assistant produced no text response)");
}

export async function loadCases(slug) {
  const p = path.join(EVALS_DIR, "skills", slug, "cases.json");
  const raw = await readFile(p, "utf8");
  const cases = JSON.parse(raw);
  for (const key of ["trigger_positive", "trigger_negative", "quality"]) {
    if (!Array.isArray(cases[key])) {
      throw new Error(`evals/skills/${slug}/cases.json is missing a "${key}" array`);
    }
  }
  return cases;
}

export async function loadRubric(slug) {
  return readFile(path.join(EVALS_DIR, "skills", slug, "rubric.md"), "utf8");
}

export async function loadFixture(slug, relativePath) {
  return readFile(path.join(EVALS_DIR, "skills", slug, relativePath), "utf8");
}

export async function listPilotSkills() {
  const dir = path.join(EVALS_DIR, "skills");
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

export async function writeResult(slug, resultObj) {
  const dir = path.join(EVALS_DIR, "results", slug);
  await mkdir(dir, { recursive: true });
  const sha = await gitShortSha();
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(dir, `${ts}__${sha}.json`);
  const json = `${JSON.stringify(resultObj, null, 2)}\n`;
  await writeFile(file, json);
  await writeFile(path.join(dir, "latest.json"), json);
  return file;
}

export async function readResultFile(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

// --- Thresholds (see evals/README.md for the rationale) ---------------

export function computeTriggerStats(positiveResults, negativeResults, targetSlug) {
  const recallTotal = positiveResults.length;
  const recallHits = positiveResults.filter((r) => r.firedSkills.includes(targetSlug)).length;
  const misses = recallTotal - recallHits;
  const recallOk = recallTotal === 0 ? true : recallTotal <= 5 ? misses === 0 : misses <= 1;

  const precisionTotal = negativeResults.length;
  const falseFires = negativeResults.filter((r) => r.firedSkills.includes(targetSlug));
  const precision = precisionTotal ? (precisionTotal - falseFires.length) / precisionTotal : 1;
  const precisionOk = precisionTotal === 0 ? true : precision >= 0.7;

  return {
    recall: { hits: recallHits, total: recallTotal, misses, ok: recallOk },
    precision: {
      value: precision,
      total: precisionTotal,
      falseFires: falseFires.length,
      unrelatedFalseFires: falseFires.filter((r) => r.case.kind === "unrelated").length,
      nearMissFalseFires: falseFires.filter((r) => r.case.kind === "near_miss").length,
      ok: precisionOk,
    },
  };
}

export function computeQualityStats(qualityResults) {
  const total = qualityResults.length;
  const passes = qualityResults.filter((r) => r.judgeOutput?.verdict === "pass").length;
  const fails = total - passes;
  const maxFails = total === 0 ? 0 : total <= 5 ? 1 : Math.floor(total * 0.2);
  const rate = total ? passes / total : 1;
  return { passes, total, fails, rate, ok: fails <= maxFails };
}

// Harness-level configuration failures (bad --model/--judge-model name,
// binary not on PATH) look identical to a genuine skill FAIL in the
// summary table — every case just silently scores 0. This scans stderr
// across a skill's results for the tell-tale signatures so run.js can
// surface a distinct, actionable warning instead of a misleading FAIL row.
const SETUP_ERROR_PATTERNS = [
  /invalid model/i,
  /unknown model/i,
  /model not found/i,
  /command not found/i,
  /ENOENT/,
  /is not recognized as an internal or external command/i,
];

function isSetupErrorStderr(stderr) {
  return typeof stderr === "string" && stderr.length > 0 && SETUP_ERROR_PATTERNS.some((re) => re.test(stderr));
}

export function detectSetupErrors(trigger, quality) {
  const all = [
    ...(trigger?.positive ?? []),
    ...(trigger?.negative ?? []),
    ...(quality?.results ?? []),
  ];
  const total = all.length;
  if (total === 0) return null;
  const offenders = all.filter((r) => isSetupErrorStderr(r.stderr));
  if (offenders.length === 0) return null;
  return {
    count: offenders.length,
    total,
    allFailed: offenders.length === total,
    sample: offenders[0].stderr.trim().split("\n").slice(0, 3).join(" "),
  };
}

export function formatSummaryTable(rows) {
  const headers = ["Skill", "Trigger recall", "Trigger precision", "Quality", "Overall"];
  const lines = rows.map((r) => [
    r.skill,
    r.trigger ? `${r.trigger.recall.hits}/${r.trigger.recall.total}${r.trigger.recall.ok ? "" : " FAIL"}` : "skipped",
    r.trigger
      ? `${(r.trigger.precision.value * 100).toFixed(0)}% (unrel ${r.trigger.precision.unrelatedFalseFires}fp / near-miss ${r.trigger.precision.nearMissFalseFires}fp)${r.trigger.precision.ok ? "" : " FAIL"}`
      : "skipped",
    r.quality ? `${r.quality.passes}/${r.quality.total}${r.quality.ok ? "" : " FAIL"}` : "skipped",
    r.overallPass ? "PASS" : "FAIL",
  ]);
  const widths = headers.map((h, i) => Math.max(h.length, ...lines.map((l) => l[i].length)));
  const fmt = (cols) => cols.map((c, i) => c.padEnd(widths[i])).join("  ");
  return [fmt(headers), fmt(widths.map((w) => "-".repeat(w))), ...lines.map(fmt)].join("\n");
}
