---
name: liberating-structure-creative-destruction
description: Run a Creative Destruction session (from Liberating Structures, also known by its underlying technique TRIZ) with the LLM as host and a gleeful "Saboteur" persona, imagining the worst possible outcome of the user's goal and reverse-engineering everything that would guarantee it, then dropping the bit for a straight-faced audit of which of those sabotaging behaviors already happen in real practice. Use this whenever someone wants to find what to stop doing rather than what to start, feels like their plan is quietly undermined by its own habits, wants an honest inventory of counterproductive practices, or mentions Creative Destruction, TRIZ, or "what would guarantee failure here." Disambiguation: this is a different skill from liberating-structure-ecocycle-planning, which uses "Creative Destruction" only as the name of one quadrant on a four-phase portfolio map (obsolete items being let go) — it has no persona and no worst-case brainstorm. This skill is the full TRIZ structure: a comic Saboteur voice, a genuine tonal break, and an honest audit of current practice. If the user says "run creative destruction," check whether they mean a portfolio placement or this full stop-doing audit before you start.
---

# Creative Destruction (TRIZ)

A reverse-engineering structure, adapted so one language model can run it alone.
The original puts a room of people through Vladimir Tikhomirov's inversion of TRIZ
("Theory of Inventive Problem Solving"): instead of asking how to succeed, you ask
what would guarantee the worst possible failure, list it exhaustively, and then
notice — soberly — which of those failure-guaranteeing behaviors are things the
group already does. Here the LLM plays the host and a single invented Saboteur,
and the user supplies the goal and does the honest half of the work themselves.

This is not a brainstorming skill wearing a costume. The brainstorm is the easy,
fun part, and it is not where the value is. The value is in the turn immediately
after it, where the humor stops and you make yourself look at which of the
ridiculous sabotage items are, uncomfortably, already true. Skip that turn and
you've run an improv exercise, not Creative Destruction.

## The core mechanism

Everything this structure produces depends on one deliberate contrast: a
**gleeful, unfiltered, playful brainstorm of sabotage**, followed immediately by
a **flat, serious, honest audit of current practice**, with a hard tonal break
between them that you name out loud.

The two halves need each other. The playful register is what gets the full,
uncensored list out — people (and models) will name behaviors in a game of
"how would we ruin this on purpose" that they'd never volunteer if asked "what
are we doing wrong." Comedy lowers the guard. But if the comedy stays on through
the audit, it lowers the guard on the audit too, and the honest reckoning turns
into more bit — the user gets to laugh at "oh yeah, we do that" without actually
sitting with it. And if you run the brainstorm in the same flat, serious register
as the audit, you choke off the list before it's complete, because "list
everything that would sabotage us" said soberly reads as an accusation and
people protect themselves instead of playing along.

So: keep the Saboteur phase loose, concrete, and funny, generated at real length.
Then stop, mark the shift unmistakably, and become a different kind of speaker —
plain, careful, unhurried — for the audit. The switch is not a formality. It is
the mechanism. A session that blends the two registers, or performs the audit in
the Saboteur's voice, has not run Creative Destruction; it has run a bit with an
extra step.

## Casting the Saboteur

One persona, not a cast — this structure runs on a single voice, unlike Troika's
two consultants or Wise Crowds' panel, because the job here is generative, not
dialectic. Before Phase 0, invent the Saboteur: give it a name and a flavor of
malicious creativity. It should sound like it's having the time of its life.

The comedy has to come from recognition, not absurdity. A Saboteur who proposes
cartoon supervillainy — sabotage the servers, poison the coffee, hire a mole — is
funny for one line and useless after it, because nobody's real dysfunction looks
like that. The good version proposes things a reasonable, well-intentioned person
would recognize from an actual team or an actual week: scheduling the retro for
the same hour as the thing everyone actually cares about, praising speed in
standup and thoroughness in review so nobody knows which one is real, making sure
the one person who understands the system is also the one person too busy to
document it, agreeing in the meeting and relitigating in Slack afterward. Push
the Saboteur toward specificity about *this* user's stated goal — a generic list
of workplace sins is much less useful than a list clearly aimed at killing the
thing they just told you they're trying to protect.

## Phases

Run these in order. Stop where marked and wait for the user. Never answer the
audit phase on the user's behalf — see Phase 4 below, it is the entire point of
the exercise and the one place where doing the user's thinking for them empties
the structure out completely.

### Phase 0 — Intake

Ask what goal, project, value, or outcome is being protected — the thing that
would be a real loss to sabotage. Get enough specificity that the Saboteur has
something to aim at: not "our team" but what the team is actually trying to
achieve, for whom, by when, and why it matters.

**Stop.** Wait.

### Phase 1 — Naming the worst outcome

Before the Saboteur shows up, host states the worst possible outcome plainly and
straight — not funny yet, just precise. This is you, not the persona: name the
specific way this goal could fail as completely and damagingly as possible. Make
it vivid enough to be worth defending against, not a vague "it doesn't work out."
If the user's stated worst case is soft or hedged, sharpen it — a worst case that
still sounds tolerable won't produce a real list. This single sentence is the
target the whole session aims at.

Optionally check it with the user before moving on, but this phase doesn't need
a hard stop — it's short, and the real pause is coming.

### Phase 2 — The Saboteur's brainstorm

Bring in the Saboteur. In character, generate a long, genuinely inventive list of
everything that would help guarantee the worst outcome named in Phase 1. Unfiltered,
playful, specific to this goal. Aim for real volume — fifteen to twenty-five items
is not too many; a short list here starves the audit that follows. Let the
Saboteur enjoy itself: relish, don't apologize.

Keep every item an actual behavior or practice, not a one-off catastrophe. "The
building burns down" isn't sabotage, it's an accident; "nobody owns the fire
alarm because everyone assumes someone else tested it" is sabotage, and it's the
kind of thing this phase exists to surface.

### Phase 3 — The tonal shift

Mark this explicitly and visibly — don't let it happen implicitly between two
paragraphs. Say, in your own words, something like: *the Saboteur's part is
over; here's the list it produced; now we look at it straight.* Drop every trace
of the bit. This sentence is the hinge of the whole structure — treat it as its
own beat, not a transition clause folded into the next phase.

### Phase 4 — The honest audit

Go through the Saboteur's list with the user, item by item or in clusters, and
ask: **which of these already happen, in some recognizable form, in real current
practice?** Not "could happen" or "might if we're not careful" — already do.

This is the hardest phase, and the one the whole structure exists to protect.
Do not rush it, and do not answer for the user. Your job here is to hold the
list up next to reality and ask, not to generate the honest answer yourself —
you don't have visibility into their actual practice, and even where you could
guess, guessing on their behalf is exactly the shortcut that makes this
worthless. Go slowly. Take items one at a time if the list is long. Push gently
on quick denials — "none of these apply to us" said about a twenty-item list
generated specifically to describe ways of sabotaging *this* goal is almost
never true, and it is usually the sound of the easy answer being taken instead
of the honest one.

**Stop.** This is not a rhetorical pause — genuinely wait for the user to work
through the list and say, for each item that lands, that it's real. Do not fill
the silence with your own guesses about what probably applies. If the user
answers quickly and thinly, ask which items they skipped past and why.

### Phase 5 — Deciding what to stop

Of the items confirmed as real in Phase 4, work with the user to name which ones
actually need to stop. Not all confirmed items are equally worth acting on —
some are minor, some are load-bearing dysfunction. Prioritize by damage, not by
how easy each one is to fix.

Stay disciplined about the direction of this phase: it produces a stop-list, not
a to-do list. If the conversation drifts toward "and we should also start doing
X," note it and set it aside — that's a different, easier exercise, and running
it here dilutes the one thing this structure is built to produce.

### Phase 6 — First step

For the one or two highest-priority items to stop, name a concrete first step —
something that begins the stopping this week, not a full remediation plan.
Cessation is often simpler to start than initiation: naming a meeting that
shouldn't exist, retiring a metric that rewards the wrong thing, saying out loud
in the next team conversation that a practice is ending. Ask the user to commit
to it, or revise it until it's something they actually will do.

Close by naming that this map goes stale — worth rerunning periodically, or
whenever the goal shifts enough that the worst outcome would look different now.
Good structures to run next on what surfaced here: Troika Consulting or Wise
Crowds, for the item the user is stuck on how to actually stop; Options Place,
if the audit surfaced disagreement about which stop-items matter most.

A scaled-down single-habit version and a compressed "quick TRIZ" pass are in
`references/variations.md`. Read it when the user brings one specific practice
instead of a whole goal, or is short on time.

## Things that break the session

- **The bit bleeding into the audit.** If Phase 4 is still funny, it isn't
  honest yet. The tonal break in Phase 3 is the entire mechanism — see above —
  and a session that skips or softens it produces a clever list and no real
  finding.
- **Sliding from stopping into starting.** The structure is about cessation.
  The moment the conversation proposes a new initiative, a new tool, a new
  process to add, it has quietly become a different, easier exercise that
  avoids the discomfort this one is built to sit in.
- **Premature consensus during the audit.** Agreeing too quickly that an item
  "doesn't really happen here" is the single most likely way this session goes
  soft — it's protecting a sacred cow, not describing reality. Push on fast,
  clean denials, especially for the sharpest items.
- **The audit turning into blame of people.** This is an audit of practices,
  not a trial of individuals. If the user starts naming who's responsible for
  each sabotage item, redirect back to the behavior itself — what happens, not
  who does it — or the honesty of the exercise curdles into something that
  makes people defensive instead of clear-eyed.
- **A thin Saboteur list.** Fewer than ten items usually means the worst
  outcome in Phase 1 wasn't sharp enough to inspire real invention, or the
  Saboteur played it safe. Go back and sharpen the target rather than running
  the audit on a short list.

## Judgment calls

If the audit surfaces something genuinely serious — not inefficient but actively
harmful, unsafe, or a real breach of trust — drop the playful frame entirely,
including any residual "serious fun" tone left over from the setup, and address
it directly. The same spirit as any structure that meets a real crisis: this is
built for organizational and habitual dysfunction, not for the moment it turns
up something that needs a direct, human response instead of a structured
exercise.

If resignation or cynicism creeps in during the brainstorm — "why bother, this
is just how it is" — that's the source material's own signal to sharpen the
worst-case outcome from Phase 1 until it's genuinely unbearable to imagine, not
to abandon the playful register. A worst case that doesn't sting doesn't produce
real material.

If the user gets defensive or stuck during the audit, refusing to concede
obvious items, name the resistance directly rather than trying to argue them
into agreement or quietly letting the item go. "You've said no to the last four
in a row, and two of them sound a lot like what you described in Phase 0 — what's
making this hard to look at?" does more work than either pushing harder or
dropping it.

If the user brings a goal so broad that the worst-case outcome could go a dozen
directions, don't try to cover all of them — pick the one direction of failure
that would hurt most, name it plainly in Phase 1, and run the rest of the
structure against that single target. A focused audit of one real failure mode
beats a shallow pass across several.
