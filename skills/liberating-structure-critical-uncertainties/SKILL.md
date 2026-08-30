---
name: liberating-structure-critical-uncertainties
description: Run a Critical Uncertainties session (from Liberating Structures) solo with the user, selecting two genuinely uncertain and independent factors as the axes of a 2x2 matrix, projecting four plausible future scenarios from them, and stress-testing the user's actual current strategy against all four to find ways to make it more adaptable. Use whenever someone wants to pressure-test a plan or strategy against an unpredictable future, is building scenarios for planning, mentions Critical Uncertainties, Liberating Structures, scenario planning, "what if things don't go the way I expect," or asks whether their strategy holds up under different futures. This is also a 2x2-matrix structure like liberating-structure-agreement-and-certainty, but the two solve different problems: Agreement & Certainty classifies a CURRENT challenge (how much do we agree, how much do we know) to pick a problem-solving approach for it now; Critical Uncertainties projects two unpredictable factors about the FUTURE into four scenarios to test whether a strategy survives what hasn't happened yet. Prefer Agreement & Certainty when the question is "what kind of problem is this and how should we tackle it"; prefer this one when the question is "will my plan hold up if the future surprises me." Also distinct from liberating-structure-ecocycle-planning, which maps an existing portfolio of activities across their current lifecycle stages rather than projecting forward into hypothetical futures.
---

# Critical Uncertainties

A scenario-planning structure, adapted so one language model can run it alone.
The original seats four people at a table who brainstorm uncertainties together,
argue their way to two that matter, and build a shared 2x2 of possible futures.
Here the LLM plays host and does the brainstorming and challenging that would
normally come from three other people at the table, and the user supplies the
real decision and the real current strategy being tested.

The structure exists to produce adaptive strategies for a future nobody can
see, rather than a single confident plan — it embodies the Liberating
Structures principle "Emphasize Possibilities: Believe Before You See." Collapse
it into ordinary scenario-brainstorming and you get a list of hypotheticals with
no teeth; what makes it work is that the two axes are forced to be *real*
uncertainties, and the resulting four futures are used to interrogate a plan
the user actually holds, not a hypothetical one.

## The core translation

In the room, four people brainstorming together catch each other's mistakes for
free — if one person proposes a "critical uncertainty" that's actually already
decided, or that's secretly the same thing as another candidate on the wall,
someone else at the table usually says so before it gets promoted to an axis.
Solo, that check doesn't happen unless you do it deliberately.

**This is the one non-negotiable mechanism: the two axes must each be genuinely
uncertain, and they must be genuinely independent of each other.** Almost every
failure of this structure traces back to one of these two things going wrong,
not to a skipped procedural step:

1. **Fake uncertainty.** An axis that isn't actually unknown — something the
   user, or their organization, has effectively already decided, already
   committed to, or can predict with real confidence. "Will interest rates be
   below 3% or above 8%" is not a live uncertainty for most planning horizons;
   it just feels like one because nobody's bothered to check. An axis like this
   produces a matrix where two quadrants are theater — everyone already knows
   which side of that line reality is going to land on, so the "scenario" is
   just the present tense wearing a costume.

2. **Non-orthogonal axes.** Two candidates that are the same underlying
   variable phrased two different ways. "High growth" and "high funding"
   often aren't two uncertainties — funding usually follows growth, so crossing
   them produces two quadrants that are basically impossible ("low growth, high
   funding") and two that are basically redundant ("high growth, high funding"
   and "high growth, low funding" collapse into "did growth happen or not").
   A matrix built on collapsed axes only *looks* like four futures; it's
   really one uncertainty drawn twice.

Run both checks explicitly before locking in the axes, in Phase 2. Don't let a
weak axis through because it's the first plausible-sounding pair the
conversation produced — go back to the candidate list and find a better one.

## No casting

Unlike Troika Consulting or Wise Crowds, this session runs with no invented
personas by default. There's no dialogue to perform here — the work is
picking honest axes and reasoning through four futures, not multiple people
disagreeing about the user's problem, so inventing voices would dress up
opinions rather than supply the actual missing constraint (which is analytic
rigor, not perspective). If you want a lightweight way to dramatize the
stress-test step later in the session, see the optional persona in
`references/variations.md` — it's an add-on, not part of the default run.

## Phases

Run these in order. Stop where marked and wait for the user. Don't merge the
brainstorm-and-select work into one message with no pause — the axis choice is
the load-bearing decision in the whole structure, and rushing past it to get
to the "fun part" (imagining futures) is the most common way this goes wrong.

### Phase 0 — Intake

Give the structuring invitation in your own words, close to this spirit: *"Let's
develop four plausible future scenarios for what you're facing, and find a
strategy flexible enough to hold up across all of them. The future is
uncertain, but we can prepare for it."* Then ask:

1. What decision or strategy do you want to pressure-test — and what's actually
   at stake if it turns out to be wrong?
2. What's your current plan or default direction, in a sentence or two? (This
   is the thing Phase 5 will stress-test, so get it concretely, not vaguely.)

**Stop.** Wait.

### Phase 1 — Brainstorm candidate uncertainties

Generate a working list of candidate critical uncertainties — major, genuinely
unpredictable factors that could significantly swing the outcome one way or
another. Aim for five to eight. For each, note in one line why it would matter
if it broke either way. Push past the first easy ones (those are often the
fake-uncertainty trap above) toward factors that are harder to name but more
consequential — regulatory shifts, a competitor's unknown move, whether a key
relationship holds, whether demand is durable or a spike.

Invite the user to add their own or cut ones that don't feel live.

**Stop.** Wait.

### Phase 2 — Select two axes, with both checks

Propose a pair from the candidate list. Before locking them in, run both checks
out loud:

- **Uncertainty check** — for each axis: "Is this genuinely unknown, or do you
  already know how this resolves?" If the honest answer is that the user (or
  their organization) has effectively already decided or can predict it, it
  doesn't belong on this matrix.
- **Orthogonality check** — "If I told you the answer to axis A, would that
  tell you anything about axis B?" If yes, they're not independent — they're
  one uncertainty wearing two labels, and you need to dig for what the real,
  separate second factor is.

**Stop here if either check fails.** Don't let a weak or duplicate axis
through to save time — go back to the candidate list with the user and find a
better one. This is worth spending real effort on; a matrix built on a bad
axis produces four scenarios that don't actually stress-test anything.

Once both axes pass, state them plainly as the two poles of the matrix (e.g.
"Regulatory environment: tightens ↔ loosens" and "Customer behavior: consolidates
around few big buyers ↔ stays fragmented").

**Stop.** Confirm with the user before building the matrix.

### Phase 3 — Build the matrix and name the four futures

Cross the two axes into a 2x2. For each of the four quadrants, give the
resulting future a short memorable name and a vivid paragraph describing what
that world actually looks like — concrete enough that the user can picture
being in it, not just a label like "high/high."

Make a deliberate effort to render all four with equal conviction. The
original's tip here is explicit: don't let any quadrant get dismissed as
obviously-won't-happen, even the uncomfortable or boring one — a scenario
someone waves off before engaging with it defeats the stress-test before it
starts.

### Phase 4 — Develop a strategy per quadrant

For each of the four scenarios, articulate a specific strategy for succeeding
in that particular future — what the user would actually do if that world came
to pass. Keep these concrete and distinct from each other; four strategies that
all amount to "stay flexible and monitor the situation" haven't done the work.

### Phase 5 — Stress-test the current strategy

Take the current plan or default direction from Phase 0 and run it against all
four futures in turn, not just the one that seems most likely. For each
quadrant, say plainly whether the current strategy holds up, degrades, or
breaks outright — and if it breaks, name the specific mechanism (what
assumption it was relying on that this future violates).

Resist the pull to only take this seriously for the expected scenario and wave
the other three through. The scenario that seems least likely is usually where
the current strategy's real fragility shows up.

### Phase 6 — Enhance adaptability

Identify concrete modifications to the current strategy that would make it
hold up better across more of the four futures — hedges, triggers ("if X
happens, switch to Y"), early-warning signals worth watching, or places where
the plan should stay deliberately unresolved rather than betting on one
future. The point of this phase isn't to pick the "right" scenario and plan
for it; it's to make the one real strategy the user is actually going to run
more resilient to whichever future actually shows up.

Close by naming which of the candidate uncertainties from Phase 1 are worth
revisiting later — the original's guidance is to treat these scenarios as
living, updated as new information arrives, not a one-time forecast filed away.

Further variations — including an optional persona for dramatizing the
stress-test in Phase 5, and a fallback for when a second genuine axis won't
surface — are in `references/variations.md`. Read it when the user asks for
one of those, or when Phase 2's checks keep failing and you need a different
way forward.

## Things that break the session

- **Locking in a fake or duplicate axis.** Covered above — this is the
  structure's central failure mode, more than any procedural misstep.
- **Treating one quadrant as the "real" prediction.** The whole point is
  strategy that holds up across futures, not betting everything on the one
  that feels most likely. If the user starts talking about "the scenario
  that's actually going to happen," name that and redirect.
- **Skipping straight to strategy without making the futures vivid.** A
  scenario that's just a label ("high/high") doesn't stress-test anything —
  the strategy work in Phase 4 needs something concrete to react to.
- **Only stress-testing against the expected future.** Phase 5 has to run
  against all four, including the ones the user would rather not think about.
- **Using the scenarios to predict rather than to prepare.** These four
  futures are inputs to near-term decisions and hedges, not a forecast to file
  away and check back on in a year. Say so if the user starts treating one
  quadrant as a prophecy.
- **Four strategies that are secretly the same strategy.** If Phase 4's output
  is "stay flexible and monitor" repeated four times with different nouns, the
  scenarios weren't taken seriously — go back and make them fight for
  distinct responses.

## Judgment calls

If the user can only genuinely find one uncertainty that matters — every other
candidate keeps failing the checks — don't force a fake second axis just to
fill out a matrix. See the single-axis fallback in `references/variations.md`.

If what the user actually wants is help classifying a challenge they're facing
right now, rather than projecting it into future scenarios, this is the wrong
structure — point them to Agreement & Certainty instead, which is built for
that.

If what the user wants is to map or triage a portfolio of things they're
already doing, rather than project a decision forward into hypothetical
futures, that's Ecocycle Planning's job, not this one.

If the "current strategy" from Phase 0 turns out not to exist yet — the user
is choosing between options rather than stress-testing a plan already in
motion — run the structure the same way, but treat each option as its own
strategy to test in Phase 5, one at a time.
