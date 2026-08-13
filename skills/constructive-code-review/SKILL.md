---
name: constructive-code-review
description: >-
  Give code review feedback that is specific, actionable, and calibrated —
  as opposed to reviewing code for correctness/security/quality issues (use
  a code-quality-review skill for that content). This skill is about how to
  phrase and structure the feedback once you've found something worth
  saying: whether it's a blocker or a suggestion, how to ground it in a
  concrete scenario, how to credit the contributor, and when to route a
  finding to someone else. Use when reviewing a pull request or patch from
  another person, drafting review comments, deciding whether to approve or
  request changes, or when the user asks "how should I phrase this review
  comment", "review this PR for me", "is this feedback too harsh/vague", or
  "should I approve this". Trigger even when the user just pastes a diff and
  asks "what do you think" — the phrasing and severity-signaling discipline
  applies as soon as feedback is about to reach another person.
---

# Constructive Code Review

Review feedback changes the PR and teaches what matters. Vague feedback fails
both goals: the contributor cannot act on it, and readers learn nothing. Mark
each point's severity so minor suggestions do not stall the PR and real issues
do not sound optional.

## Every comment signals its own severity

State explicitly whether a comment is a blocker, a suggestion, or a
question — don't make the contributor infer it from tone:

- **Blocker**: "this needs to change before merge, because ___."
- **Suggestion**: "consider ___" or "you might want to ___, but not blocking."
- **Question**: genuinely open — you don't yet know if there's a problem.

A review that's all blockers reads as gatekeeping; a review that's all soft
suggestions on something that actually needs to change is a disservice to
the contributor and the codebase. Say which one each comment is.

## Ground feedback in a concrete scenario, not an abstract preference

"Consider handling this edge case" teaches nothing. "If a user sets X, then
Y happens, because Z" gives the contributor something to verify and fix.
Where possible, show the failure case directly — a runnable example, a
specific input, a concrete state transition — rather than asserting a risk
exists. This is also how you catch real issues instead of stylistic ones:
working through "what happens if..." for the specific code in front of you,
not applying a generic checklist.

## Credit before (or alongside) critique

When a contribution shows effort — comments that ease review, tests added
unprompted, a hard problem solved reasonably — say so explicitly, and say it
first if there's also critique to deliver. This isn't padding: it's accurate
signal about what to keep doing, and it's what keeps a review from reading as
purely extractive. For first-time or external contributors, this matters
more, not less — a review that's 100% critique with zero acknowledgment reads
as hostile even when every point is correct.

## Route to the right person

When a finding is about a specific area's history or a decision you weren't
part of, tag the person who owns that context instead of asserting confident
judgment on their behalf. This is not deference — it gets a better answer
than either of you would produce alone, and it keeps ownership visible to
future readers of the thread.

## Calibrate depth to risk

Not every PR deserves the same scrutiny. A mechanical, low-blast-radius
change (a config tweak, a comment fix) gets a light pass. A change that
touches shared state, public API, security-relevant code, or something many
other components depend on earns the full adversarial pass: what happens
under concurrent use, what happens if this is combined with another existing
feature in a way the author didn't anticipate, what happens on the failure
path. Spend the scrutiny where the blast radius is, not evenly across every
line.

"Mechanical" and "low-risk" are different axes — don't conflate a small,
easy-to-read diff with a safe one. A dependency bump or a generated/codemod
diff is mechanical (little to read, no design judgment involved) but often
carries real risk (supply-chain, transitive behavior change), so it doesn't
belong in the light-pass bucket just because it's short. That class of
change routes to `low-risk-change-verification`'s transcript treatment
instead — reserve the genuine light pass for changes that are mechanical
*and* have no behavior surface at all, like formatting, comments, or
docs-only config.

## Decide, don't stall

Once the must-fix bar is met, approve. Don't hold a PR open on
nice-to-haves — say explicitly "this is good to merge; consider ___ as a
follow-up" rather than leaving the contributor unsure whether the PR is
actually done. An approval with a clearly-labeled suggestion for later is not
a contradiction; a review that never resolves to a decision is a cost with no
benefit.

## When NOT to over-apply this

A one-line change from someone you pair with daily doesn't need the full
scenario-and-severity treatment — "LGTM" is a proportionate review when the
change is genuinely that small and the risk is genuinely that low. The
discipline exists for when a comment carries real weight; don't manufacture
weight where none exists.
