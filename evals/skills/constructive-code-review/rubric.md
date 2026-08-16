# Rubric: constructive-code-review

Every dimension is one `##` section of
`skills/constructive-code-review/SKILL.md` restated as a checkable
question. Score each 0 (absent) / 1 (partial) / 2 (met).

- **D1 — Severity signaled** (section "Every comment signals its own
  severity"). Each substantive comment is explicitly marked blocker,
  suggestion, or question — not left for the contributor to infer from
  tone.

- **D2 — Grounded in a concrete scenario** (section "Ground feedback in a
  concrete scenario, not an abstract preference"). Findings are phrased as
  "if X, then Y happens, because Z" against the specific code shown, not
  generic risk assertions ("consider edge cases") or a checklist applied
  uniformly regardless of what's in front of it.

- **D3 — Credit before/alongside critique** (section "Credit before (or
  alongside) critique"). When the diff shows real effort (tests added,
  comments that ease review, a hard problem solved reasonably), the
  response says so explicitly, and says it first if critique follows.

- **D4 — Routes to the right person** (section "Route to the right
  person"). When a finding depends on history or a decision the reviewer
  wasn't part of, the response tags/names who should weigh in instead of
  asserting confident judgment on their behalf.

- **D5 — Depth calibrated to blast radius** (section "Calibrate depth to
  risk"). Distinguishes "mechanical" from "low-risk" as separate axes —
  a short, easy-to-read diff that touches shared state, public API, or
  security-relevant code earns the full adversarial pass (concurrency,
  combination with other features, failure path), not a light pass just
  because it's short.

- **D6 — Decisive resolution** (section "Decide, don't stall"). The
  response resolves to an explicit decision (approve / request changes,
  with nice-to-haves clearly labeled as follow-ups) rather than leaving
  the contributor unsure whether the PR is actually done.

**Verdict = pass iff D1 == 2 AND D2 >= 1 AND D6 >= 1 AND (D3, D4, D5, each
only where the scenario actually calls for it) all score >= 1.**

D1 and D2 are weighted heaviest because the skill's own opening thesis is
that vague, unsignaled feedback "fails both goals" (actionability and
teaching) — a response that finds the right issue but doesn't mark its
severity or ground it concretely has not actually delivered constructive
feedback by this skill's definition.
