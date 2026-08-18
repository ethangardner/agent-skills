---
name: failure-mode-classification
description: >-
  Investigate a recurring or ambiguous production bug by giving the failure a
  stable, referenceable name and root-causing it to the actual mechanism, not
  the surface symptom. Use when diagnosing something that has failed more
  than once, writing a fix PR for an intermittent or hard-to-reproduce bug,
  or being asked "why does this keep happening", "diagnose this incident",
  "what's causing these failures", or "is this the same bug as before".
  Trigger even when only one occurrence has been confirmed so far, if the
  failure class (retries, races, external-service flakiness, partial writes)
  is the kind that's likely to recur — the naming pays for itself the second
  time it happens, and costs little the first time.
---

# Failure Mode Classification

A report such as "sometimes X is stale" gets re-investigated from scratch
when it returns. A stable label — "failure mode 2: retries exhausted with no
terminal write" — links occurrences and makes the fix PR a starting point for
the next investigation.

## Name the failure mode before fixing it

When a bug is one of several plausible ways the same system can fail, give
it a stable name and number, tracked against a parent issue or taxonomy —
not just a description in the fix PR. "Failure mode 2" only works as a label
if there's a "failure mode 1" it's distinguished from, and a place (the
parent issue) where both are listed together. This turns "have we seen this
before?" into a lookup instead of an investigation.

## Root-cause to mechanism, not symptom

The fix should name the actual mechanism responsible, not just what was
observed:

- Symptom: "timestamps were stale."
- Mechanism: "`repository.update()` issues a raw SQL `UPDATE` that bypasses
  the ORM's entity lifecycle hooks, so `@UpdateDateColumn` never fires on
  that code path."

The mechanism-level statement is what makes the fix verifiable (does the fix
actually address that code path?) and what makes the bug findable by anyone
who later hits the same underlying cause through a different symptom.

If a report already states the mechanism — a pasted stack trace, a code
excerpt, "on closer look, X bypasses Y" — use it. Don't re-derive it from a
codebase you were never given access to, and don't treat the absence of that
codebase as a reason to stop; only ask a follow-up when the report genuinely
omits something the naming or mechanism call depends on.

## Separate investigation from fix

If you don't yet know the mechanism, investigate in a throwaway PR or
scratch branch — it's fine for that to be messy and closed unmerged once you
understand what's happening. Land the taxonomy update and the real fix as
their own clean PR once the mechanism is confirmed. This is the same
instinct as `change-documentation-rigor`'s "keep exploratory iteration out
of the public PR queue" — an investigation is allowed to fail publicly;
a fix should land with an already-verified explanation.

## Relationship to broader maintenance/operations discipline

This is a narrow, in-the-moment habit, not a replacement for planning-level
disciplines: `swebok-maintenance` covers systematic impact analysis before
changing existing code, and `swebok-operations` covers incident process,
runbooks, and SLAs at the organizational level. This skill is what to do
once you're inside a specific recurring-failure investigation — name it,
root-cause it to a mechanism, keep the messy part out of the permanent
record.

## When NOT to over-apply this

A genuinely one-off bug — a typo, a single bad input that can't recur, a
mistake fixed in the same PR it was introduced — doesn't need a taxonomy
entry. Reserve naming for failure classes with real recurrence potential:
retries, races, partial/interrupted writes, external-service flakiness,
anything where "is this the same issue as before?" is a question someone
will plausibly ask again.
