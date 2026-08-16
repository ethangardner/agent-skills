import path from "node:path";
import { AbstractHarness } from "./abstract-harness.js";
import {
  REPO_ROOT,
  spawnCollect,
  parseNdjson,
  loadSkillContent,
  renderJudgePrompt,
  extractJudgeJsonFromText,
  resolveJudgeModel,
  JUDGE_JSON_INSTRUCTION,
  withSandboxDir,
} from "../runner-lib.js";

// Points junie straight at this repo's canonical skills/ tree, the same
// role `--plugin-dir` plays for ClaudeHarness — no `.junie/skills` symlink
// needed. Only runTriggerCase needs this: runQualityCase/runJudge inject
// the target skill's content directly into the prompt and never rely on
// junie's own skill discovery.
//
// Deliberately NOT pairing this with `--skill-default-locations`: passing
// an invalid value (e.g. "bogus") to that flag silently ran the task
// anyway instead of rejecting it like `--model` does, so its accepted
// value format couldn't be confirmed against the live CLI. Leaving
// default locations on means this machine's own `~/.junie/skills` (if
// populated) can still leak extra skills into trigger cases — a known,
// documented isolation gap rather than a guessed-at flag.
const SKILL_LOCATION_ARGS = ["--skill-location", path.join(REPO_ROOT, "skills")];

// `junie --output-format json-stream` emits NDJSON: one {"type":"step",...}
// line per action (including {"type":"step","name":"Read skill","details":
// "<slug>"} whenever it loads a skill's SKILL.md — this is the only
// reliable trigger-fired signal; junie's plain-text output has no
// consistent, parseable marker for tool/skill invocation) and a final
// {"type":"result","result":"<final answer text>",...} line. The default
// text format was tried first and abandoned: it renders "Read skill" as an
// ANSI-colored two-line UI element with no stable machine-readable shape.
function extractFiredSkills(events) {
  const firedSkills = [];
  for (const e of events) {
    if (e.type !== "step" || e.name !== "Read skill" || typeof e.details !== "string") continue;
    const skillName = e.details.split(" (")[0].trim();
    if (skillName && !firedSkills.includes(skillName)) firedSkills.push(skillName);
  }
  return firedSkills;
}

// The result event's per-model cost breakdown is keyed `llmUsage` in
// `--output-format json` but (as observed against a live run) `errorCode`
// in `--output-format json-stream` — same shape, mislabeled key, likely a
// junie CLI quirk. Check both so real spend shows up instead of a
// hardcoded 0, but degrade quietly if the shape ever changes.
function sumJunieCost(resultEvent) {
  const usage = resultEvent?.llmUsage ?? resultEvent?.errorCode;
  if (!Array.isArray(usage)) return 0;
  return usage.reduce((sum, m) => sum + (typeof m?.cost === "number" ? m.cost : 0), 0);
}

export class JunieHarness extends AbstractHarness {
  static label = "Junie";

  async _runTriggerCase(prompt, options = {}) {
    const model = options.model ?? this.options.model;
    const bin = options.bin ?? this.options.bin ?? "junie";

    return withSandboxDir(async (projectDir) => {
      const args = ["--output-format", "json-stream", "--project", projectDir, ...SKILL_LOCATION_ARGS];
      if (model) args.push("--model", model);
      args.push(prompt);

      const { stdout, stderr, code } = await spawnCollect(bin, args, { cwd: projectDir });
      const { events, result } = parseNdjson(stdout);

      return {
        firedSkills: extractFiredSkills(events),
        cost: sumJunieCost(result),
        processExitCode: code,
        stderr,
      };
    });
  }

  async _runQualityCase(slug, prompt, options = {}) {
    const model = options.model ?? this.options.model;
    const bin = options.bin ?? this.options.bin ?? "junie";
    const skillContent = await loadSkillContent(slug);
    const fullPrompt = `${skillContent}\n\n---\nUser prompt:\n${prompt}`;

    return withSandboxDir(async (projectDir) => {
      const args = ["--output-format", "json-stream", "--project", projectDir];
      if (model) args.push("--model", model);
      args.push(fullPrompt);

      const { stdout, stderr, code } = await spawnCollect(bin, args, { cwd: projectDir });
      const { result } = parseNdjson(stdout);
      return {
        transcript: result?.result ?? stdout,
        cost: sumJunieCost(result),
        isError: code !== 0 || !result,
        processExitCode: code,
        stderr,
      };
    });
  }

  async _runJudge(rubric, scenarioPrompt, transcript, options = {}) {
    const model = resolveJudgeModel(options, this.options);
    const bin = options.bin ?? this.options.bin ?? "junie";
    const rendered = await renderJudgePrompt(rubric, scenarioPrompt, transcript);
    const fullPrompt = `${rendered}\n\n${JUDGE_JSON_INSTRUCTION}`;

    return withSandboxDir(async (projectDir) => {
      const args = ["--output-format", "json-stream", "--project", projectDir];
      if (model) args.push("--model", model);
      args.push(fullPrompt);

      const { stdout, stderr, code } = await spawnCollect(bin, args, { cwd: projectDir });
      const { result } = parseNdjson(stdout);
      const judgeOutput = extractJudgeJsonFromText(result?.result ?? stdout);

      return {
        judgeOutput,
        cost: sumJunieCost(result),
        isError: code !== 0 || !judgeOutput,
        processExitCode: code,
        stderr,
      };
    });
  }
}
