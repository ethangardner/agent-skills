import { readFile } from "node:fs/promises";
import path from "node:path";
import { AbstractHarness } from "./abstract-harness.js";
import { MockHarness } from "./mock-harness.js";
import {
  REPO_ROOT,
  EVALS_DIR,
  spawnCollect,
  parseNdjson,
  lastJsonValue,
  loadSkillContent,
  renderJudgePrompt,
} from "../runner-lib.js";

export class ClaudeHarness extends AbstractHarness {
  async runTriggerCase(prompt, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runTriggerCase(prompt, { ...options, harnessLabel: "Claude" });
    }
    const budget = options.budget ?? this.options.budget ?? 0.25;
    const model = options.model ?? this.options.model;
    const flags = [
      "-p",
      "--plugin-dir",
      REPO_ROOT,
      "--setting-sources",
      "project",
      "--strict-mcp-config",
      "--tools",
      "Skill",
      "--output-format",
      "stream-json",
      "--verbose",
      "--no-session-persistence",
      "--max-budget-usd",
      String(budget),
    ];
    if (model) flags.push("--model", model);
    const { stdout, stderr, code } = await spawnCollect("claude", [...flags, prompt]);
    const { events, result } = parseNdjson(stdout);
    const firedSkills = [];
    for (const e of events) {
      if (e.type !== "assistant") continue;
      for (const block of e.message?.content ?? []) {
        if (block.type === "tool_use" && block.name === "Skill" && block.input?.skill) {
          const skillName = String(block.input.skill).split(":").pop();
          if (!firedSkills.includes(skillName)) firedSkills.push(skillName);
        }
      }
    }
    return {
      firedSkills,
      cost: result?.total_cost_usd ?? null,
      processExitCode: code,
      stderr,
    };
  }

  async runQualityCase(slug, prompt, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runQualityCase(slug, prompt, { ...options, harnessLabel: "Claude" });
    }
    const budget = options.budget ?? this.options.budget ?? 0.75;
    const model = options.model ?? this.options.model;
    const tools = options.tools ?? "Read,Write,Edit,Bash,Grep,Glob";
    const skillContent = await loadSkillContent(slug);
    const flags = [
      "-p",
      "--setting-sources",
      "project",
      "--strict-mcp-config",
      "--tools",
      tools,
      "--append-system-prompt",
      skillContent,
      "--output-format",
      "json",
      "--no-session-persistence",
      "--max-budget-usd",
      String(budget),
    ];
    if (model) flags.push("--model", model);
    const { stdout, stderr, code } = await spawnCollect("claude", [...flags, prompt]);
    const result = lastJsonValue(stdout);
    return {
      transcript: result?.result ?? "",
      cost: result?.total_cost_usd ?? null,
      isError: result?.is_error ?? true,
      processExitCode: code,
      stderr,
    };
  }

  async runJudge(rubric, scenarioPrompt, transcript, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runJudge(rubric, scenarioPrompt, transcript, {
        ...options,
        harnessLabel: "Claude",
      });
    }
    const budget = options.budget ?? this.options.budget ?? 0.2;
    const judgeModel = options.judgeModel ?? this.options.judgeModel ?? "haiku";
    const schema = await readFile(path.join(EVALS_DIR, "lib", "judge-result.schema.json"), "utf8");
    const rendered = await renderJudgePrompt(rubric, scenarioPrompt, transcript);
    const flags = [
      "-p",
      "--model",
      judgeModel,
      "--setting-sources",
      "project",
      "--strict-mcp-config",
      "--tools",
      "",
      "--json-schema",
      schema,
      "--output-format",
      "json",
      "--no-session-persistence",
      "--max-budget-usd",
      String(budget),
    ];
    const { stdout, stderr, code } = await spawnCollect("claude", [...flags, rendered]);
    const result = lastJsonValue(stdout);
    let judgeOutput = null;
    try {
      judgeOutput = JSON.parse(result?.result ?? "null");
    } catch {
      // leave null
    }
    return {
      judgeOutput,
      cost: result?.total_cost_usd ?? null,
      isError: result?.is_error ?? judgeOutput === null,
      processExitCode: code,
      stderr,
    };
  }
}
