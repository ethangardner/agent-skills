import { AbstractHarness } from "./abstract-harness.js";
import { MockHarness } from "./mock-harness.js";
import {
  spawnCollect,
  lastJsonValue,
  loadSkillContent,
  extractFiredSkillsFromText,
  renderJudgePrompt,
  JUDGE_JSON_INSTRUCTION,
  withSandboxDir,
} from "../runner-lib.js";

export class OpenCodeHarness extends AbstractHarness {
  async runTriggerCase(prompt, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runTriggerCase(prompt, { ...options, harnessLabel: "OpenCode" });
    }
    const model = options.model ?? this.options.model;
    const bin = options.bin ?? this.options.bin ?? "opencode";

    return withSandboxDir(async (projectDir) => {
      const args = ["run"];
      if (model) args.push("--model", model);
      args.push(prompt);

      const { stdout, stderr, code } = await spawnCollect(bin, args, { cwd: projectDir });

      return {
        firedSkills: extractFiredSkillsFromText(stdout),
        cost: 0,
        processExitCode: code,
        stderr,
      };
    });
  }

  async runQualityCase(slug, prompt, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runQualityCase(slug, prompt, { ...options, harnessLabel: "OpenCode" });
    }
    const model = options.model ?? this.options.model;
    const bin = options.bin ?? this.options.bin ?? "opencode";
    const skillContent = await loadSkillContent(slug);
    const fullPrompt = `${skillContent}\n\n---\nUser prompt:\n${prompt}`;

    return withSandboxDir(async (projectDir) => {
      const args = ["run"];
      if (model) args.push("--model", model);
      args.push(fullPrompt);

      const { stdout, stderr, code } = await spawnCollect(bin, args, { cwd: projectDir });
      return {
        transcript: stdout,
        cost: 0,
        isError: code !== 0,
        processExitCode: code,
        stderr,
      };
    });
  }

  async runJudge(rubric, scenarioPrompt, transcript, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runJudge(rubric, scenarioPrompt, transcript, {
        ...options,
        harnessLabel: "OpenCode",
      });
    }
    const model = options.judgeModel ?? options.model ?? this.options.judgeModel ?? this.options.model;
    const bin = options.bin ?? this.options.bin ?? "opencode";
    const rendered = await renderJudgePrompt(rubric, scenarioPrompt, transcript);
    const fullPrompt = `${rendered}\n\n${JUDGE_JSON_INSTRUCTION}`;

    return withSandboxDir(async (projectDir) => {
      const args = ["run"];
      if (model) args.push("--model", model);
      args.push(fullPrompt);

      const { stdout, stderr, code } = await spawnCollect(bin, args, { cwd: projectDir });
      let judgeOutput = lastJsonValue(stdout);
      if (!judgeOutput || typeof judgeOutput !== "object" || !judgeOutput.verdict) {
        const jsonMatch = stdout.match(/\{[\s\S]*"verdict"[\s\S]*\}/);
        if (jsonMatch) {
          try {
            judgeOutput = JSON.parse(jsonMatch[0]);
          } catch {
            // keep null
          }
        }
      }

      return {
        judgeOutput,
        cost: 0,
        isError: code !== 0 || !judgeOutput,
        processExitCode: code,
        stderr,
      };
    });
  }
}
