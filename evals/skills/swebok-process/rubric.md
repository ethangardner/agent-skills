# Rubric: swebok-process

Two scenario modes, matched to `scenario_mode` in `cases.json`. Line
references are to `skills/swebok-process/SKILL.md` as of this rubric's
writing. Score each dimension 0 (absent) / 1 (partial) / 2 (met).

## Definition mode (derives from "## Output format", L237-268)

- **D1 — Project characterization** (L245-251): all six factors present
  (requirements stability, team size/distribution, criticality/safety,
  regulatory/contractual constraints, stakeholder availability,
  technology/domain novelty), each with a stated rationale grounded in the
  scenario — not "it depends" (explicitly called out as a non-answer at
  L74-75).
- **D2 — Model selection** (L253-256). **Make-or-break dimension.** The
  selected model must be traceable to the D1 characterization, not chosen
  by default or fashion; if the model is tailored from its base form,
  tailoring decisions are stated explicitly (undocumented tailoring is
  "process drift, not process adaptation" per L159-162). Per the skill's
  own thesis (L47-55), model selection is a risk-management decision, so a
  response that picks a model without connecting it to the stated
  characterization fails this dimension regardless of which model it
  picks.
- **D3 — Phase table** (L258-259): activities, entry criteria, exit
  criteria, artifacts, and owner are populated with real content specific
  to the scenario, not placeholders.
- **D4 — Measurement plan** (L261-262, L186-209): uses a
  Goal→Question→Metric structure (GQM) connecting metrics to actual goals,
  not an unstructured list of metrics "collected because they're
  available" (the failure mode named explicitly at L291-292).
- **D5 — Improvement cadence** (L264-267): retrospective/review frequency,
  how improvement actions are tracked, and an escalation path are all
  present.
- **D6 — Scaling judgment** (L57-64, "When NOT to over-apply this"):
  relevant specifically to solo/small-scope scenarios. A good response
  recognizes when the full heavyweight template is disproportionate and
  explicitly states the scaling decision rather than silently applying
  either extreme.

**Verdict = pass iff D2 == 2 AND (D1 + D3 + D4 + D5 + D6, counting only
dimensions applicable to the scenario) achieves at least 2/3 of the
applicable maximum.** For a full-scope scenario (D1-D5 applicable, D6
not), that is sum(D1,D3,D4,D5) >= 6 of 8. For a scaling scenario (D6
applicable, D1-D5 judged only on whether the response correctly abbreviates
rather than skips them), D6 == 2 is required in addition to D2 == 2.

## Review / checklist mode (derives from "## Reviewing an existing process
definition (checklist mode)", L275-299)

C1-C8 map 1:1 to the eight checklist questions (L280-297), each scored on
whether the response actually engages that question with evidence from the
described process, not just an opinion:

1. Lifecycle model explicitly named vs. followed by habit (L280-281)
2. Selection justified by actual project characteristics (L282-284)
3. Tailoring decisions documented (L285-286)
4. Explicit entry/exit criteria per phase (L287-288)
5. Required artifacts defined (L289-290)
6. Measurement plan connects metrics to goals via GQM (L291-292)
7. Retrospectives/reviews produce owned action items (L293-294)
8. Process matched to actual regulatory/contractual constraints (L295-297)

C9 — Leads with the highest-leverage gap, not a top-to-bottom recital of
all eight questions (explicit instruction, L299).

**Verdict = pass iff C9 == 2 AND at least 6 of C1-C8 score >= 1.**
