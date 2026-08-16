import { MockHarness } from "./mock-harness.js";

export class AbstractHarness {
  static label = "Harness";

  constructor(options = {}) {
    this.options = options;
  }

  async runTriggerCase(prompt, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runTriggerCase(prompt, {
        ...options,
        harnessLabel: this.constructor.label,
      });
    }
    return this._runTriggerCase(prompt, options);
  }

  async runQualityCase(slug, prompt, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runQualityCase(slug, prompt, {
        ...options,
        harnessLabel: this.constructor.label,
      });
    }
    return this._runQualityCase(slug, prompt, options);
  }

  async runJudge(rubric, scenarioPrompt, transcript, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runJudge(rubric, scenarioPrompt, transcript, {
        ...options,
        harnessLabel: this.constructor.label,
      });
    }
    return this._runJudge(rubric, scenarioPrompt, transcript, options);
  }

  async _runTriggerCase(prompt, options = {}) {
    throw new Error("_runTriggerCase is not implemented");
  }

  async _runQualityCase(slug, prompt, options = {}) {
    throw new Error("_runQualityCase is not implemented");
  }

  async _runJudge(rubric, scenarioPrompt, transcript, options = {}) {
    throw new Error("_runJudge is not implemented");
  }
}
