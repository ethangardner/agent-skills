# Rubric: change-documentation-rigor

Every dimension is traceable to a specific section of
`skills/change-documentation-rigor/SKILL.md` (and, for D5, its
`references/pr-template.md`). Score each 0 (absent) / 1 (partial) / 2 (met).

- **D1 — Why, not just what** (section "The three questions every message
  answers", Q1). States the problem solved or the trigger, not the
  mechanical action alone. "Because it was next on the list" is only
  acceptable if the response says what list and why it matters now.

- **D2 — Stated evidence** (section "The three questions...", Q2). A
  concrete verification step is named (tests run + result, a diff against
  baseline, a linked CI run, a confirmed repro) — not "should work" or an
  unstated claim of correctness.

- **D3 — Rejected alternatives named** (section "The three questions...",
  Q3). **Make-or-break dimension** — the skill calls this "the
  highest-leverage sentence in the message and the one most often
  skipped." If the scenario implies alternatives existed (an explicit
  choice, a considered-and-rejected approach), the response must name what
  wasn't picked and why. Only score N/A (treat as met) when the scenario
  gives no indication any alternative was ever considered.

- **D4 — Batch-change handling** (section "For batch/mechanical changes
  specifically"; only scored on batch-style scenarios). Changes are
  grouped and named specifically (not "updated dependencies"); what was
  deliberately *not* changed is listed with a reason; a checkable
  behavior-preservation claim is stated.

- **D5 — Template discipline** (section "PR description: use the repo's
  own template first"). When the scenario states a native template
  exists, the response fills that exact template in completely rather
  than substituting a generic structure. When the scenario states no
  native template exists, the response falls back to the
  `references/pr-template.md` shape (Summary, Breaking change, Related
  issue, Problem statement, Solution, Major changes, Testing and review)
  with every section filled, not left as a placeholder.

- **D6 — Proportionate scaling** (section "When NOT to over-apply this";
  only scored on trivial-change scenarios). A one-line, low-stakes change
  gets a single clear sentence, not a full Problem Statement / Solution
  breakdown — but a stated verification claim isn't dropped just because
  the change is small.

**Verdict = pass iff D3 == 2 AND D1 >= 1 AND D2 >= 1 AND (D4, D5, D6, each
only where applicable to the scenario) all score >= 1.**
