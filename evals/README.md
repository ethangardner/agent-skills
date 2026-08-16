# Skill evals

Evals for a pilot set of 5 skills in this repo, answering: does the
skill's own description reliably cause it to fire on the right prompts,
and does following its instructions actually produce good output? There
was no test/eval infrastructure in this repo before this — see
`git log` for context if you're wondering why this looks new.

## Filesystem isolation for agentic CLI harnesses

`junie` and `opencode` are agentic CLIs with real file-write tools and no
`--tools`-style restriction flag (unlike `claude -p --tools Skill`, which
is genuinely read-only on trigger cases). Left pointed at this repo, they
will treat an eval prompt as a real task and write files for real — this
happened during development: a junie run rewrote an existing markdown file
and invented several unrelated files (a changelog, a runbook, fabricated
research docs) directly in this checkout, because it was invoked with
`cwd`/`--project` defaulting to `REPO_ROOT`. `JunieHarness` and `OpenCodeHarness` now wrap
every call in `withSandboxDir()` (`evals/lib/runner-lib.js`), which spawns
the CLI against a fresh `mkdtemp` scratch directory (`--project
<scratch-dir>` for junie; `cwd: <scratch-dir>` for opencode, unconfirmed
whether opencode has its own equivalent `--project`-style flag since the
CLI wasn't available to test against) and deletes it afterward. Skill
discovery still works from an unrelated project dir since junie's
`--skill-location` and opencode's `.agents/skills` discovery are both
independent of the working/project directory. If you add a new harness
for another agentic CLI, wrap its calls in `withSandboxDir()` too —
`spawnCollect`'s `cwd` defaults to `REPO_ROOT`, which is safe for
`claude -p` but not safe by default for anything with unrestricted file
tools.

## Prerequisites

- Node.js (the harness uses only built-in modules — no `npm install` needed).
- For default runs: The `claude` CLI on `PATH`, logged in (OAuth/subscription auth).
- For local or free-tier runs: OpenCode CLI, Ollama (e.g. `ollama run qwen2.5-coder:7b`), or an OpenAI-compatible endpoint (e.g., OpenRouter / Gemini Flash).
- **For `--harness junie` or `--harness opencode`: the skills have to be visible to that CLI in the first place.**
  The two CLIs are not symmetric here:
  - `junie` has a native flag for pointing at an arbitrary skills
    directory — `--skill-location <path>` — the same role `--plugin-dir`
    plays for the `claude` harness. `JunieHarness`
    (`evals/lib/harnesses/junie-harness.js`) passes
    `--skill-location <repo>/skills` on every trigger case, so it reads
    the canonical `skills/` tree directly. No symlink is needed or
    shipped for junie. (Default skill locations, e.g. a user's own
    `~/.junie/skills`, are still active alongside it — `junie` also
    exposes `--skill-default-locations` to disable those, but unlike an
    invalid `--model` value, an invalid `--skill-default-locations` value
    didn't get rejected when tried against the live CLI, so its accepted
    syntax couldn't be confirmed without spending a real call. If you want
    to rule out ambient-skill contamination in trigger cases, work out the
    right value yourself and wire it into `JunieHarness`.) Confirm the
    `--skill-location` flag is actually working with e.g.
    `junie --model sonnet --skill-location <repo>/skills --task "<a trigger prompt>" --output-format text`
    and look for a `Read skill` step in the output before trusting a
    junie eval run's trigger numbers. `JunieHarness` has been verified
    against a live `junie` run this way: it uses `--output-format
    json-stream` and looks for `{"type":"step","name":"Read skill",...}`
    lines, which is junie's actual, confirmed fire signal (its plain-text
    output has no stable machine-readable marker for this).
  - `opencode` has **no equivalent flag or config key** — per opencode.ai's
    own docs, it only discovers skills from a fixed set of conventional
    directories: project-local `.opencode/skills/`, `.claude/skills/`,
    `.agents/skills/` (walked up to the git worktree root), and their
    global equivalents. This repo ships `.agents/skills` as a symlink to
    `../skills` so it stays in sync with the canonical tree automatically
    — that's not a repo-specific workaround, it's opencode's own
    documented discovery mechanism, and there's currently no way to point
    it at `skills/` without going through one of those three directory
    names. If `.agents/skills` is ever missing (e.g. a fresh clone before
    it's committed), trigger recall for `--harness opencode` will
    silently read as 0 for every case — the CLI runs fine, it just has no
    skills to invoke.
    `OpenCodeHarness` (`evals/lib/harnesses/opencode-harness.js`) has
    **not** been verified against a live run (no `opencode` CLI was
    available to test against) — it still scans raw stdout for
    `Skill(skill=...)`/`"skill": "..."` patterns, the same approach that
    turned out to be wrong for junie. Treat its trigger numbers as
    unconfirmed until someone checks `opencode run "<a trigger prompt>"`
    output for what a skill invocation actually looks like and updates
    the parser to match.

## Running

```sh
npm run eval                                           # all 5 pilot skills, both buckets
node evals/run.js swebok-process                        # one skill, both buckets
node evals/run.js swebok-process --trigger-only          # cheap smoke test, no quality/judge calls
node evals/run.js swebok-process --quality-only
node evals/run.js --model sonnet --judge-model haiku
node evals/run.js swebok-process --baseline evals/results/swebok-process/2026-08-01T00-00-00-000Z__abc1234.json
node evals/run.js --max-total-budget-usd 20 --yes

# Cost Optimization & Local Evals (Low-Hardware Options):
node evals/run.js --mock                               # offline dry-run (zero cost, tests harness logic)
node evals/run.js swebok-process --case tp-1 --mock    # single case smoke test
node evals/run.js --harness opencode                   # run via OpenCode CLI
node evals/run.js --harness junie                      # run via Junie CLI
node evals/run.js --harness junie --model gemini-3.5-flash-lite  # Junie CLI with Gemini Flash Lite (name as junie lists it, not a provider-prefixed id)
node evals/run.js --harness api --endpoint http://localhost:11434/v1 --model qwen2.5-coder:7b  # Ollama local LLM
node evals/run.js --harness api --judge-harness claude  # hybrid run (local/free scenario + cloud judge)
```

Results land in `evals/results/<skill>/<timestamp>__<git-sha>.json` (plus
a `latest.json` pointer) and are gitignored — they're a local artifact of
a specific run, not something to commit.

## What's actually measured, and how

Each pilot skill has `evals/skills/<slug>/cases.json` (the fixed test
cases) and `evals/skills/<slug>/rubric.md` (the grading rubric, written so
every dimension traces back to a specific line or section of the real
`skills/<slug>/SKILL.md` — nothing in a rubric is invented). Two buckets:

**Trigger precision/recall.** Each `trigger_positive`/`trigger_negative`
case is run with only the `Skill` tool available
(`claude -p --plugin-dir <repo> --tools Skill --output-format stream-json`),
and the event stream is scanned for whether the target skill actually got
invoked. Recall is measured over `trigger_positive`; precision over
`trigger_negative`, which is itself split into `unrelated` prompts (should
obviously not fire) and `near_miss` prompts (phrased to plausibly steal an
*adjacent* skill's territory instead — chosen from each skill's own
cross-references to other skills where possible, so a near-miss failure
means two skills are actually colliding, not just an arbitrary unrelated
prompt firing by accident).

**Quality.** Each `quality` case runs with the target skill's SKILL.md
(and any `references/*.md`) injected directly via `--append-system-prompt`,
rather than relying on the prompt to naturally trigger it. This is
deliberate: it isolates "is the guidance good when followed" from
"does it reliably get selected," which the trigger bucket already covers.
**A quality-only pass does not by itself prove real end-to-end value** —
read both buckets together. The resulting transcript is graded by a
second `claude -p` call (a cheaper/faster model by default) using
`--json-schema` to force a structured `{verdict, dimension_scores,
summary}` response, applying the rubric's own stated pass rule rather than
free-floating opinion.

## Thresholds (asymmetric on purpose)

Under-triggering silently loses the skill's entire value; over-triggering
just costs a few tokens on a discipline the user probably still benefits
from. So the bars are not symmetric:

- **Trigger recall**: 0 misses tolerated at n≤5 positive cases, at most 1
  at n=6–10.
- **Trigger precision** (pooled unrelated + near-miss): ≥70%.
- **Quality pass rate**: ≥80% (at most 1 fail out of ~4-5 cases).

A skill "passes" a run iff both trigger sub-thresholds and the quality
threshold are met (for whichever buckets you didn't skip with
`--trigger-only`/`--quality-only`).

## Pluggable Harness Adapters & Low-Hardware Setups

To significantly reduce evaluation costs and support local execution on standard hardware, the harness provides pluggable adapters:

- **`--harness claude`**: Uses the `claude` CLI with Anthropic models (default).
- **`--harness opencode`**: Dispatches prompts through the OpenCode CLI (`opencode run`).
- **`--harness junie`**: Dispatches prompts through the Junie CLI (`junie`).
- **`--harness api`**: Direct HTTP calls via Node native `fetch` to OpenAI-compatible endpoints (e.g. Ollama, OpenRouter, vLLM).
- **`--harness mock`** / **`--mock`**: Instant offline dry-run mode with $0 cost.

### Model names are harness-specific

`--model` and `--judge-model` are passed straight through to whichever CLI
`--harness`/`--judge-harness` selects — **there is no shared model
namespace across harnesses.** A name valid for one is usually invalid, or
silently means something different, for another:

| `--harness` | Model names come from | Example |
| --- | --- | --- |
| `claude` (default) | Anthropic model aliases/IDs the `claude` CLI accepts | `sonnet`, `haiku`, `claude-sonnet-5` |
| `junie` | Whatever the `junie` CLI lists — bare names, not provider-prefixed | `sonnet`, `gemini-3.5-flash-lite` |
| `opencode` | Whatever your OpenCode config/provider defines — often provider-prefixed | `anthropic/claude-sonnet-4-5` |
| `api` | Whatever the OpenAI-compatible `--endpoint` actually serves | an Ollama tag (`qwen2.5-coder:7b`), an OpenRouter slug (`google/gemini-2.0-flash-exp:free`) |

Consequences:
- **`--judge-model` is scoped to `--judge-harness`, not `--harness`.** If
  you set `--harness junie` and leave `--judge-harness` unset, it defaults
  to `junie` too, so `--judge-model` must also be a junie model name.
  `node evals/run.js --harness api --judge-harness claude --judge-model haiku`
  is the one common case where the two differ on purpose (see "Hybrid Model
  Split" below).
- **There's no cross-harness default.** Omitting `--model`/`--judge-model`
  lets each harness fall back to its own default (`ClaudeHarness` defaults
  judging to `haiku`; `junie`/`opencode` omit `--model` entirely and use
  whatever that CLI is configured with; `api` falls back to a free model).
  Nothing here defaults to a Claude model name when you've picked a
  non-Claude harness.
- **When in doubt, ask the CLI, don't guess.** Running the target harness's
  CLI once with a deliberately-wrong `--model` (or its `--help`/`models`
  subcommand, if it has one) is the fastest way to get its real,
  currently-valid model list — CLIs add/rename models over time, so this
  README won't stay authoritative.
- **A run where every case errors before the skill even ran is a
  model/harness mismatch, not a skill failure.** `run.js` detects this
  (via the "SETUP ERROR" warning printed under each skill's row) and calls
  it out separately from the normal FAIL — check `stderr` in the result
  JSON either way before concluding a skill's trigger/quality logic is
  actually broken.

### Hybrid Model Split
You can route scenario generation to a free/local engine while reserving a lightweight cloud model for rubric judging:
```sh
node evals/run.js --harness api --endpoint http://localhost:11434/v1 --judge-harness claude --judge-model haiku
```

### Local Setup with Ollama & Qwen 2.5 Coder
For low-spec local hardware (e.g. 8GB - 16GB RAM):
1. Install and start [Ollama](https://ollama.com).
2. Pull a compact coding model: `ollama pull qwen2.5-coder:7b`
3. Execute evals locally with zero API costs:
   ```sh
   node evals/run.js --harness api --endpoint http://localhost:11434/v1 --model qwen2.5-coder:7b
   ```

### Free Cloud APIs (OpenRouter / Gemini Flash)
If local GPU resources are unavailable:
```sh
node evals/run.js --harness api --endpoint https://openrouter.ai/api/v1 --api-key <YOUR_KEY> --model google/gemini-2.0-flash-exp:free
```

### Junie CLI with Custom / Lightweight Models
Run evaluations via Junie CLI specifying lightweight or custom models:
```sh
node evals/run.js --harness junie --model gemini-3.5-flash-lite --judge-model sonnet
```
(Model names are junie's own bare names, not provider-prefixed — see
"Model names are harness-specific" below. Run `junie` with an invalid
`--model` once to get the CLI's current valid-name list printed back at you.)

### Single Case & Trigger Smoke Testing
Limit evaluation execution to a single specific case ID to iterate rapidly:
```sh
node evals/run.js swebok-process --case tp-1 --mock
```

## Regression checking

The primary mechanism is just re-running: `cases.json`/`rubric.md` are
checked into git as the fixed target, so after editing a SKILL.md, re-run
its evals and see if it still clears the same thresholds. `--baseline
<path-to-a-prior-result.json>` additionally diffs current per-case
pass/fail against a specific earlier run and prints `REGRESSED: <case-id>`
for anything that flipped pass→fail — pick which prior run file to treat
as baseline yourself; nothing is auto-promoted.

## Known limitations (read before trusting a single run)

- **Single sample per case.** Both trigger firing and judge verdicts are
  one stochastic LLM call each — in testing, the exact same prompt against
  the exact same skill fired the Skill tool on one run and answered
  directly (skipping the tool) on another. A single fail is a signal to
  look closer, not proof of a regression; a single pass isn't proof of
  robustness either. Multi-sample majority voting would fix this but
  roughly N-doubles the cost — not done for this pilot.
- **Imperfect isolation.** Trigger/quality runs use `--setting-sources
  project --strict-mcp-config` to avoid dragging in this machine's full
  set of globally-installed skills and MCP servers (which otherwise both
  inflates cost and pollutes trigger evals with irrelevant competing
  skills). This does *not* fully isolate to only the 5 pilot skills — a
  handful of skills bundled with Claude Code itself (e.g. `debug`,
  `code-review`) always load and can plausibly compete with
  `failure-mode-classification` and `constructive-code-review` for a
  trigger. If a trigger-recall case unexpectedly fails, check `firedSkills`
  in the result JSON before assuming the SKILL.md description is at fault.
- **Cost is front-loaded and variable.** Anthropic's prompt cache is
  content-addressed, not tied to a session — the first call in a run
  writes the cache (more expensive), and later calls with the same system
  context read from it (much cheaper). Don't extrapolate a run's total
  cost from its first call.
- **Only 5 of 31 skills are covered.** This is a pilot. Extending it to
  another skill means adding `evals/skills/<slug>/{cases.json,rubric.md}`
  following the pattern here — no runner changes needed, `run.js`
  discovers skills by directory listing.

## Explicitly out of scope for this pass

Rolling out to the other 26 skills; CI wiring (no CI exists in this repo
today — this stays a manual `npm run eval`); grading `references/*.md`
files as independent targets (they're only exercised indirectly, injected
alongside SKILL.md during quality evals); a `--disable-slash-commands`
baseline-comparison run to quantify how much value the skill adds over no
skill at all (a natural follow-up, not built here); an exhaustive
cross-skill discrimination matrix beyond the hand-picked near-miss pairs
in each skill's `cases.json`.
