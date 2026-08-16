# Rubric: desk-research

Dimensions are drawn from the five numbered "Philosophy" points and the
seven-step "Workflow" in `skills/desk-research/SKILL.md`. Score each 0
(absent) / 1 (partial) / 2 (met). Some dimensions only apply to scenarios
with the corresponding shape — `cases.json`'s `notes` field states which
apply per case.

- **D1 — States the question/decision, not just the mechanism**
  (Philosophy point 4, Workflow step 1). The response says what decision
  the analysis informs, not only what technique was run.

- **D2 — Inventories existing sources first** (Workflow step 2). Before
  proposing new collection or analysis, the response checks/uses what
  already exists (prior docs, internal data, public datasets) — especially
  decisive when a scenario states existing documentation already covers
  part of the question.

- **D3 — Parameter search shown, not asserted** (Philosophy point 2; only
  scored when the scenario involves a tunable parameter such as a cluster
  count or threshold). A search across candidate values is shown or
  requested, not a single value presented as obviously correct.

- **D4 — Independent validation** (Philosophy point 3). A pattern-finding
  or clustering result is checked against a second, independently-derived
  signal before being presented as a trustworthy answer rather than a
  hypothesis — or, if no independent signal is available, the response
  says so explicitly instead of presenting the result with unearned
  confidence.

- **D5 — Answer-first, trail preserved** (Philosophy point 1, Workflow
  step 7). The summary leads with the finding and its confidence, with
  supporting exploration available but not required reading to get the
  answer.

- **D6 — Restraint** (section "When NOT to over-apply this"; only scored
  on scenarios where the question is already answered by existing
  documentation or doesn't hinge on data). The response recognizes when a
  fresh research pass isn't warranted rather than mounting one reflexively.

**Verdict = pass iff D1 >= 1 AND D5 >= 1 AND (D2, D3, D4, D6, each only
where applicable to the scenario) all score >= 1.**
