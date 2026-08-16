export class MockHarness {
  constructor(options = {}) {
    this.options = options;
  }

  async runTriggerCase(prompt, options = {}) {
    const firedSkills = [];
    if (options.slug && !options.isNegative) {
      firedSkills.push(options.slug);
    }
    return {
      firedSkills,
      cost: 0,
      processExitCode: 0,
      stderr: "",
    };
  }

  async runQualityCase(slug, prompt, options = {}) {
    const label = options.harnessLabel ? `${options.harnessLabel} ` : "";
    return {
      transcript: `[Mock ${label}transcript for ${slug}]\nPrompt: ${prompt.slice(0, 100)}...`,
      cost: 0,
      isError: false,
      processExitCode: 0,
      stderr: "",
    };
  }

  async runJudge(rubric, scenarioPrompt, transcript, options = {}) {
    const label = options.harnessLabel ? `${options.harnessLabel} ` : "";
    return {
      judgeOutput: {
        verdict: "pass",
        dimension_scores: { mock_rubric_check: 5 },
        summary: `Mock ${label}judge pass.`,
      },
      cost: 0,
      isError: false,
      processExitCode: 0,
      stderr: "",
    };
  }
}
