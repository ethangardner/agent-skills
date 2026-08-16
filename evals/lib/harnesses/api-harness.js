import { AbstractHarness } from "./abstract-harness.js";
import { MockHarness } from "./mock-harness.js";
import {
  lastJsonValue,
  loadSkillContent,
  extractFiredSkillsFromText,
  renderJudgePrompt,
} from "../runner-lib.js";

export class ApiHarness extends AbstractHarness {
  constructor(options = {}) {
    super(options);
    this.endpoint = options.endpoint || process.env.OPENAI_BASE_URL || "http://localhost:11434/v1";
    this.apiKey = options.apiKey || process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY || "ollama";
  }

  async _fetchCompletion(payload, options = {}) {
    const endpoint = options.endpoint || this.endpoint;
    const apiKey = options.apiKey || this.apiKey;
    const url = endpoint.endsWith("/chat/completions") ? endpoint : `${endpoint.replace(/\/+$/, "")}/chat/completions`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API call failed with status ${response.status}: ${errText}`);
    }

    return await response.json();
  }

  async runTriggerCase(prompt, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runTriggerCase(prompt, { ...options, harnessLabel: "API" });
    }
    const model = options.model ?? this.options.model ?? "qwen2.5-coder:7b";
    const payload = {
      model,
      messages: [
        {
          role: "system",
          content: "You are an assistant evaluating skill triggers. If the user prompt matches a skill capability, call the Skill tool.",
        },
        { role: "user", content: prompt },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "Skill",
            description: "Invoke a skill by name",
            parameters: {
              type: "object",
              properties: {
                skill: { type: "string", description: "The skill name/slug" },
              },
              required: ["skill"],
            },
          },
        },
      ],
    };

    const firedSkills = [];
    let isError = false;
    let stderr = "";

    try {
      const res = await this._fetchCompletion(payload, options);
      const choice = res.choices?.[0];
      const message = choice?.message;

      if (message?.tool_calls) {
        for (const tc of message.tool_calls) {
          if (tc.function?.name === "Skill") {
            try {
              const args = typeof tc.function.arguments === "string" ? JSON.parse(tc.function.arguments) : tc.function.arguments;
              if (args?.skill) {
                firedSkills.push(String(args.skill).split(":").pop());
              }
            } catch {
              // ignore parse errors
            }
          }
        }
      }

      const text = message?.content || "";
      for (const skillName of extractFiredSkillsFromText(text)) {
        if (!firedSkills.includes(skillName)) firedSkills.push(skillName);
      }
    } catch (err) {
      isError = true;
      stderr = String(err);
    }

    return {
      firedSkills,
      cost: 0,
      processExitCode: isError ? 1 : 0,
      stderr,
    };
  }

  async runQualityCase(slug, prompt, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runQualityCase(slug, prompt, { ...options, harnessLabel: "API" });
    }
    const model = options.model ?? this.options.model ?? "qwen2.5-coder:7b";
    const skillContent = await loadSkillContent(slug);

    const payload = {
      model,
      messages: [
        { role: "system", content: skillContent },
        { role: "user", content: prompt },
      ],
    };

    let transcript = "";
    let isError = false;
    let stderr = "";

    try {
      const res = await this._fetchCompletion(payload, options);
      transcript = res.choices?.[0]?.message?.content ?? "";
    } catch (err) {
      isError = true;
      stderr = String(err);
    }

    return {
      transcript,
      cost: 0,
      isError,
      processExitCode: isError ? 1 : 0,
      stderr,
    };
  }

  async runJudge(rubric, scenarioPrompt, transcript, options = {}) {
    if (options.mock || this.options.mock) {
      return new MockHarness(this.options).runJudge(rubric, scenarioPrompt, transcript, {
        ...options,
        harnessLabel: "API",
      });
    }
    const judgeModel = options.judgeModel ?? options.model ?? this.options.judgeModel ?? this.options.model ?? "gemini-2.0-flash";
    const rendered = await renderJudgePrompt(rubric, scenarioPrompt, transcript);

    const payload = {
      model: judgeModel,
      messages: [
        {
          role: "system",
          content: "You are an evaluation judge. Respond strictly with valid JSON.",
        },
        { role: "user", content: rendered },
      ],
      response_format: { type: "json_object" },
    };

    let judgeOutput = null;
    let isError = false;
    let stderr = "";

    try {
      const res = await this._fetchCompletion(payload, options);
      const content = res.choices?.[0]?.message?.content ?? "";
      try {
        judgeOutput = JSON.parse(content);
      } catch {
        judgeOutput = lastJsonValue(content);
      }
    } catch (err) {
      isError = true;
      stderr = String(err);
    }

    return {
      judgeOutput,
      cost: 0,
      isError: isError || !judgeOutput,
      processExitCode: isError ? 1 : 0,
      stderr,
    };
  }
}
