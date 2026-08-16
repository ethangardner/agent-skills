import { ClaudeHarness } from "./claude-harness.js";
import { MockHarness } from "./mock-harness.js";
import { OpenCodeHarness } from "./opencode-harness.js";
import { JunieHarness } from "./junie-harness.js";
import { ApiHarness } from "./api-harness.js";

const HARNESS_REGISTRY = {
  claude: ClaudeHarness,
  opencode: OpenCodeHarness,
  junie: JunieHarness,
  api: ApiHarness,
  mock: MockHarness,
};

export function getHarness(name = "claude", options = {}) {
  const harnessName = (name || "claude").toLowerCase();
  const HarnessClass = HARNESS_REGISTRY[harnessName];
  if (!HarnessClass) {
    throw new Error(`Unknown harness "${name}". Supported harnesses are: ${Object.keys(HARNESS_REGISTRY).join(", ")}`);
  }
  return new HarnessClass(options);
}
