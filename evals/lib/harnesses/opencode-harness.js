import { AbstractHarness } from "./abstract-harness.js";
import {
  spawnCollect,
  lastJsonValue,
  loadSkillContent,
  extractFiredSkillsFromText,
  extractJudgeJsonFromBraces,
  renderJudgePrompt,
  resolveJudgeModel,
  JUDGE_JSON_INSTRUCTION,
  withSandboxDir,
} from "../runner-lib.js";

export class OpenCodeHarness extends AbstractHarness {
  static label = "OpenCode";

  async _runTriggerCase(prompt, options = {}) {
    const model = options.model ?? this.options.model;
    const bin = options.bin ?? this.options.bin ?? "opencode";

    return withSandboxDir(async (projectDir) => {
      const args = ["run", "--dir", projectDir];
      if (model) args.push("--model", model);
      args.push(prompt);

      const { stdout, stderr, code } = await spawnCollect(bin, args, { cwd: projectDir });

      return {
        firedSkills: extractFiredSkillsFromText(`${stdout}\n${stderr}`),
        cost: 0,
        processExitCode: code,
        stderr,
      };
    });
  }

  async _runQualityCase(slug, prompt, options = {}) {
    const model = options.model ?? this.options.model;
    const bin = options.bin ?? this.options.bin ?? "opencode";
    const skillContent = await loadSkillContent(slug);
    const fullPrompt = `${skillContent}\n\n---\nUser prompt:\n${prompt}`;

    return withSandboxDir(async (projectDir) => {
      const args = ["run", "--dir", projectDir];
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

  async _runJudge(rubric, scenarioPrompt, transcript, options = {}) {
    const model = resolveJudgeModel(options, this.options);
    const bin = options.bin ?? this.options.bin ?? "opencode";
    const rendered = await renderJudgePrompt(rubric, scenarioPrompt, transcript);
    const fullPrompt = `${rendered}\n\n${JUDGE_JSON_INSTRUCTION}`;

    return withSandboxDir(async (projectDir) => {
      const args = ["run", "--dir", projectDir];
      if (model) args.push("--model", model);
      args.push(fullPrompt);

      const { stdout, stderr, code } = await spawnCollect(bin, args, { cwd: projectDir });
      let judgeOutput = lastJsonValue(stdout);
      if (!judgeOutput || typeof judgeOutput !== "object" || !judgeOutput.verdict) {
        judgeOutput = extractJudgeJsonFromBraces(stdout) ?? judgeOutput;
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
