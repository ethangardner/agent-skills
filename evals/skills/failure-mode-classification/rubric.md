# Rubric: failure-mode-classification

Every dimension below is traceable to a specific `##` section of
`skills/failure-mode-classification/SKILL.md`. Score each 0 (absent) / 1
(partial) / 2 (met).

- **D1 — Named and tracked** (section "Name the failure mode before fixing
  it"). The output gives the failure a stable name/number AND states where
  it's tracked (a parent issue or taxonomy location) — not just a
  description buried in the fix.

- **D2 — Mechanism, not symptom** (section "Root-cause to mechanism, not
  symptom"). **Make-or-break dimension** — the skill states this is "what
  makes the fix verifiable." Calibration anchor, taken verbatim from the
  skill itself:
  - Symptom-level (score 0-1): "timestamps were stale."
  - Mechanism-level (score 2): "`repository.update()` issues a raw SQL
    `UPDATE` that bypasses the ORM's entity lifecycle hooks, so
    `@UpdateDateColumn` never fires on that code path."
  Score 2 only if the output's causal claim is similarly falsifiable
  against a specific code path or mechanism, not a restatement of the
  observed behavior.

- **D3 — Investigation kept separate from fix** (section "Separate
  investigation from fix"). When the mechanism is not yet known, a good
  response proposes a throwaway/scratch investigation step distinct from a
  clean, landed fix. When the mechanism is already known or given, a good
  response doesn't present messy exploratory reasoning as the final
  artifact.

- **D4 — Correctly calibrated application** (section "When NOT to
  over-apply this", plus the description's single-occurrence clause). For
  genuinely one-off, non-recurring scenarios (a typo, a single bad input, a
  mistake fixed in the same PR it was introduced), the naming/taxonomy
  discipline is correctly *skipped*. For scenarios with real recurrence
  potential — even at one occurrence (retries, races, external-service
  flakiness, partial/interrupted writes) — it's correctly *applied*.

**Verdict = pass iff D2 == 2 AND (D1 + D3 + D4) >= 4.**

D2 is the make-or-break dimension because the skill's own thesis is that
mechanism-level root-causing is "what makes the fix verifiable" — a
response that restates the symptom as if it were the cause fails this
skill regardless of how well it performs on the other three dimensions.
