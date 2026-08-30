---
name: liberating-structure-min-specs
description: Run a Min Specs session (from Liberating Structures) with the user to strip a rule set down to only what's truly essential, by first brainstorming every possible do and don't with no filtering, then applying a strict removal test to each survivor. Use this whenever someone has a policy, checklist, onboarding doc, style guide, process, or set of rules they suspect is bloated, or asks to "cut this down to what actually matters," "find the minimum viable rules," "what do we actually need here," mentions Min Specs, Liberating Structures, or wants help separating must-haves from nice-to-haves. Distinct from Agreement & Certainty, which classifies a problem by how much people agree and how knowable the answer is rather than pruning a rule set, and from Purpose-to-Practice, which designs a new initiative's purpose, principles, and practices from scratch rather than narrowing one that already exists or has been proposed. Prefer Min Specs specifically when the raw material is already a rule set — real or draft — and the job is subtraction, not invention.
---

# Min Specs

A pruning structure, adapted so one language model can run it alone with a
single human. The original seats a group of 4–7 who brainstorm every rule they
can think of, then fight down to the few that are actually load-bearing. Here
the LLM plays host and the user supplies both the rules and the judgment about
what breaks without them.

Min Specs is not a brainstorming exercise with a cleanup step tacked on. It is
two distinct, sequential acts — generate everything, then justify each survivor
or cut it — and the value comes entirely from not letting them blur together.
Blur them and you get what most rule sets already are: an unreviewed pile that
grew by accretion, with every item defended by vague prudence instead of a
named consequence.

No casting section: there are no personas to invent here. Min Specs isn't a
consultation between distinct points of view — it's the user's own judgment
applied twice, once loosely and once strictly, so there's nothing to cast.

## The core mechanism (non-negotiable)

**Nothing gets evaluated until the list is finished.** Groups sabotage Min
Specs almost exclusively by filtering while they generate — someone floats a
rule, someone else says "well, we don't really need that one," and the list
quietly stops growing at whatever felt safe. That kills the exercise before it
starts, because the whole method depends on having a genuinely long, unfiltered
list to prune *from*. A short, pre-filtered list makes the second half
meaningless — there's nothing left to cut, so nothing gets tested. Hold the
line: during the brainstorm, every proposed rule goes on the list, full stop.
No "do we need that," no "that's basically covered by the other one," not from
the user and not from you.

**Then, once the list is closed, apply one test to every single item with no
exceptions:** *if this were removed, what specifically breaks?* Not "it seems
important," not "it's just good practice," not "we'd probably regret dropping
it" — a specific, nameable failure. If the user can articulate exactly what
goes wrong, the rule survives. If they hedge, gesture at general prudence, or
reach for "better safe than sorry," it's cut. This is the Saint-Exupéry line
the structure is built around: perfection here isn't reached by adding
safeguards, it's reached by removing every rule that isn't actually load-bearing.
Most rule sets are bloated not with bad rules but with defensible-sounding ones
nobody has ever had to justify — that's exactly the category this test is
designed to catch.

## The core translation

In the room, the group brainstorms on paper individually, then pools lists and
votes rule by rule as a table. Alone, you can't crowdsource volume the same
way — so your job in the brainstorm phase is to keep generating angles and
prompting for more rather than letting the user stop at the first six items
that come to mind, and your job in the filtering phase is to be the one who
actually asks the removal-test question out loud, item by item, rather than
letting the user wave a rule through unexamined.

## Phases

Run these in order. Stop where marked and wait for the user. Don't collapse
generation and filtering into one pass — see above.

### Phase 0 — Intake

Ask what goal or purpose this rule set is meant to serve. Push for precision
here: "good behavior on the team" or "a smooth onboarding" is too vague to
prune against, because you can't tell what's essential to a goal you can't
state. You want something closer to "a new hire can ship a small fix to
production, safely, by the end of week one" — specific enough that a rule's
necessity can actually be argued for or against it.

**Stop.** Wait for the goal, and don't move on until it's concrete. If the user
gives you something vague, push back once before proceeding — Min Specs run
against a mushy goal produces a mushy list, and the removal test has nothing
firm to test against.

### Phase 1 — Full brainstorm, no filtering

Invite the user to list every possible do and not-do that could plausibly serve
that goal — dos and don'ts both, mixed together, no ordering, no editing.
Prompt for volume: ask what rules exist because of a past incident, what rules
exist because someone senior likes them, what an overcautious version of this
rule set would include, what a reckless version would strip. Push past the
first pass — the obvious rules come fast and the genuinely marginal ones,
which are exactly what the removal test needs to chew on, come later.

If a rule surfaces that sounds redundant with another, or dubious, or clearly
excessive: it still goes on the list. Say so if you're tempted to comment —
then don't.

**Stop.** Confirm the list is actually exhausted — ask "anything else, even
if it sounds excessive or obvious" — before moving on.

### Phase 2 — Sort into candidates

Split the finished list into candidate must-dos and candidate must-not-dos.
This is pure sorting, not judgment — a rule keeps its place on the list either
way, you're just organizing by which bucket the removal test will run against.
If something is ambiguous (a "should" that could be either), ask the user
which form they actually mean.

### Phase 3 — The removal test

Go through every candidate, one at a time, out loud. For each: "If we removed
this, what specifically breaks?"

- A specific, concrete consequence keeps the rule. "New hires would deploy
  without code review and we'd ship an unreviewed regression" survives.
- "It's good practice" / "we'd want that anyway" / "seems safer" does not
  survive. Cut it.
- Don't let the user answer for a rule in the abstract — tie the answer back
  to the Phase 0 goal specifically. A consequence that has nothing to do with
  the stated goal isn't a reason to keep the rule *for this purpose*, whatever
  else it might be good for.
- Move at one item per exchange. Don't batch five rules into one judgment —
  the discipline is in forcing the specific answer for each one, and batching
  is how vague answers sneak through.

This phase is the whole structure. Don't rush it to get to a tidy final list —
the friction here, applied honestly, is the product.

### Phase 4 — Finalize the minimum

State the surviving must-dos and must-not-dos cleanly, as a short list. Nothing
else — no rationale restated, no hedge language. If a rule made it through the
test, it doesn't need a defense attached to it anymore.

### Phase 5 — Final check

Ask: now that the list is stripped down, does anything essential seem to be
missing? This is the one place new rules may be added after Phase 1 closed —
but only if the user can point to something the goal genuinely requires that
truly wasn't on the original list, not as a way to quietly restore something
that was just cut. If nothing's missing, say so and stop; don't manufacture a
gap to make the check feel thorough.

## Things that break the session

- **Filtering during the brainstorm.** The single most common failure. If
  you or the user start narrowing the list before Phase 1 closes, the list
  never gets long enough for the removal test to mean anything.
- **Keeping a rule because it "feels responsible."** Prudence-flavored
  language ("just good practice," "better to have it") is precisely what the
  removal test exists to strip out. If the user can't name the specific
  failure, the rule goes, no matter how professional it sounds.
- **Re-adding cut items out of anxiety.** Once something is cut in Phase 3,
  it stays cut unless Phase 5 turns up a genuine, goal-tied gap. Reflexively
  restoring a rule because losing it feels uncomfortable defeats the entire
  exercise — discomfort is not evidence something breaks.

## Judgment calls

If the brainstorm comes back thin — five or six items instead of twenty — take
that as real information rather than a problem to fix. A short candidate list
usually means the domain genuinely doesn't need many rules; don't invent
padding items to make the exercise feel more substantial. The point is the
minimum, not a target word count.

If the user can't state a clear goal in Phase 0, stop there and work on the
goal first. Min Specs has no leverage against an unstated purpose — every
downstream judgment call depends on being able to ask "does this serve the
goal," and there's no way to answer that without one.
