# Worked example: design-token architecture research

*Research type: inventory and comparative analysis — no statistics, no
dataset. The evidence is a systematic inventory of the current state plus a
structured comparison against external prior art, turned into recorded
decisions.*

The `research/token-migration-planning` branch on `uswds/uswds-elements`
(never merged, never even opened as a PR — see the caveat at the end) shows
this shape end to end.

## The question

How should USWDS Elements' design-token architecture be structured — how
many tiers, what naming convention, how should light/dark theming work — so
that a multi-phase migration can proceed on a settled foundation instead of
re-litigating these decisions PR by PR?

## Step 1 — Inventory the current state before proposing anything

Before any comparison or decision, the branch contains a plain inventory of
what exists today: `uswds-properties-tokens.csv`, `uswds-settings-tokens.csv`,
and `uswds-system-tokens.csv` enumerate the existing token set. This is the
inventory half of "inventory and analysis" — you cannot evaluate a migration
path without first having an accurate, complete list of what's being
migrated. Skipping straight to "here's the new structure" without this step
is how migrations miss things.

## Step 2 — Comparative analysis against external prior art

`design-system-token-research.md` compares three external systems — Tailwind
v4, Radix UI Themes, and Adobe Spectrum (1st and 2nd generation) — on
specific, named axes (tiering strategy, namespace/prefix strategy, theming
approach), not a vague "let's see what others do." Each comparison ends in
a table of pros and cons and an explicit recommendation with rationale:

> **Why not more?** Spectrum's 5-tier system added complexity without clear
> benefit (evidenced by 2nd-gen collapsing to 2 tiers).
> **Why not fewer?** 1 tier (Tailwind) sacrifices semantic meaning —
> government sites need consistent info/warning/error colors.

Note what makes this a real analysis and not just a survey: Spectrum's own
version history (5 tiers → 2 tiers) is cited as *evidence* for the "why not
more" argument, not just asserted. A comparative analysis earns its
conclusions the same way a quantitative one does — by pointing at something
checkable, not by asserting the recommendation is obviously right.

## Step 3 — Record decisions as they're made, not just the final state

Ten numbered ADRs (`0001`–`0010`) record each decision individually —
token-package location, primitive naming, the mode-aware semantic tier,
component token tier, and so on — each with a Status and Date. Critically,
when a later decision changes an earlier one, that's recorded as an
amendment, not a silent edit:

> **ADR-0003**, Amended: 2026-07-23 — ADR-0004 (component token tier)
> supersedes the "exclusively" language in Decision Drivers and
> Consequences... See ADR-0004 Decision (b) for the dual alias target
> policy and migration path.

A reader hitting ADR-0003 later still gets the original reasoning *and* a
pointer to what changed it and why — the decision history stays intact
instead of being overwritten to look like it was right the first time.

## Step 4 — Turn the analysis into a phased, dependency-ordered plan

The research doesn't stop at "here's what we should do" — `plan-01` and
`plan-02` docs, plus nine `pr-00` through `pr-08` planning documents, break
the migration into individually-scoped units, each stating its concern,
which ADR(s) it implements, and which other planned PRs it depends on. This
is the same "scope each question to its own artifact" principle as the
quantitative example, applied to implementation units instead of research
questions.

## Step 5 — Traceability from plan to shipped work

`pr-00-tier-first-restructure.md`'s file-move table is essentially identical
to the actual shipped PR #287's "Major changes" section — the plan and the
executed change match. That's the payoff of steps 1–4: by the time
implementation starts, there's nothing left to decide, only to execute
against an already-settled plan.

## What made this a good trail

- The inventory (Step 1) means the comparison in Step 2 is grounded in the
  actual current system, not a generic best-practices discussion.
- The comparison (Step 2) cites evidence for its recommendations (Spectrum's
  own version history) rather than asserting them.
- The decision record (Step 3) tracks *changes to decisions*, not just
  decisions — an amendment is dated and cross-referenced, not silently
  folded in.
- The plan (Step 4) and the shipped PR (Step 5) match, which is the real
  test of whether the research was worth doing: did it actually settle the
  question before code got written, or did the code end up deciding things
  the research was supposed to decide?

## Caveat: this trail has a real gap the first example doesn't

Unlike PRs #4/#5 in the quantitative example, **no PR was ever opened for
this branch** — ten ADRs and a multi-phase plan currently exist only in an
unreviewed branch, not in front of the team they're meant to guide. A
research trail can satisfy every principle in `SKILL.md` and still fall
short of being useful if it never reaches the people who need to act on it.
Even research this thorough benefits from a documentation-only PR to get
eyes on the plan before the phases built on top of it start landing —
research that only one person has read hasn't finished being research yet.
