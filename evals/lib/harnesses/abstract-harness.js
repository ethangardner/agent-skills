export class AbstractHarness {
  constructor(options = {}) {
    this.options = options;
  }

  async runTriggerCase(prompt, options = {}) {
    throw new Error("runTriggerCase is not implemented");
  }

  async runQualityCase(slug, prompt, options = {}) {
    throw new Error("runQualityCase is not implemented");
  }

  async runJudge(rubric, scenarioPrompt, transcript, options = {}) {
    throw new Error("runJudge is not implemented");
  }
}
