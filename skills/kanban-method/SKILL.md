---
name: kanban-method
description: >-
  Apply the Kanban Method's flow-based discipline to project management,
  prioritization, planning, and roadmaps — as opposed to phase-gated or
  purely capacity-based approaches. Use whenever the user asks to "prioritize
  this backlog", "build a roadmap", "design a workflow/board", "set WIP
  limits", "run a stand-up/planning meeting", "figure out why work keeps
  stalling", "decide what to work on next", or generally asks for help with
  project management, prioritization, planning, or roadmaps. Trigger even
  when the user doesn't say "Kanban" or "flow" explicitly — the underlying
  question ("what should we work on now", "why is everything late", "how do
  we sequence this") is what this skill answers, not a request to draw a
  literal board.
---

# The Kanban Method

Source: *Starting Kanban* (Brendan Wovchko / HUGE IO). The method's core claim
is counter-intuitive and worth stating up front:

> If you optimize for efficiency, you'll get gridlock. If you optimize for
> flow, you'll get efficiency. — Jon Terry

Most planning failures are not caused by working too slowly — they're caused
by starting too much at once. Kanban's answer to "how do we get more done" is
almost never "work harder"; it's "finish more before starting more." Every
section below is a different lens on that one idea.

Kanban is evolutionary, not a replacement system: it overlays whatever process
already exists rather than requiring a stop-and-restart. When advising on
process, prefer the smallest change that makes flow visible and constrained
over a wholesale re-platforming of how the team plans.

## When NOT to over-apply this

A single person's personal to-do list, or a one-off task with no recurring
workflow, doesn't need columns, WIP limits, or a Class of Service — just do
the task. This method earns its keep once there is a *recurring* flow of work
items past multiple people or stages, a backlog that needs ongoing
prioritization, or a roadmap that keeps getting reshuffled by urgency claims.
Scale the formality (how many columns, whether to run two meetings or one) to
the size of the team and the cost of the coordination failures it's currently
having — say what you're scaling and why.

## The framework

Work through these in order when designing or reviewing a process. When
answering a narrower question (just prioritization, just a roadmap), pull the
relevant section rather than forcing the whole framework.

### 1. Flow — pick the right metric before anything else

The single metric that matters is **flow**: how quickly and predictably work
moves from "requested" to "delivering value," not how busy anyone looks.
"Busy" is not a proxy for "productive" — a team can be 100% utilized and
still deliver almost nothing, because utilization and throughput trade off
against each other under variability.

Before proposing a plan, prioritization scheme, or roadmap, ask:

- Do we currently measure delay (time work spends waiting), or only effort
  (time spent actively working on it)? Most of the calendar time a work item
  spends "in progress" is actually waiting, not active work — that gap is
  where a plan should target improvement, not in squeezing active work
  faster.
- Is the goal to improve the *whole* system's throughput, or just to keep
  the parts you're closest to looking busy? Local efficiency improvements
  that don't relieve the actual constraint don't change delivery speed.

### 2. Clarity — visualize the workflow before you plan it [→ consult `references/board-design-catalog.md` for worked board designs by domain]

You cannot prioritize, sequence, or roadmap a process you haven't made
explicit. Before proposing a plan:

- Name the actual activities the work passes through (not org-chart
  departments) and give each a clear start and end condition.
- Distinguish column types: **Activity** (work is actively happening),
  **Queue** (work is ready and waiting for the next activity — this is where
  most invisible delay hides), **Buffer** (deliberately decouples one
  activity's pace from the next, or absorbs work that skips steps).
- Work moves forward only. If something can't proceed, mark it **blocked**
  in place rather than pretending it moved backward — a "blocked" card is
  more informative than a silently-stalled one.
- Naming columns: prefer plain, unique, present-tense-free labels
  ("Design," not "Designing" / "In Design Review"). Don't try to enumerate
  every possible state — an exhaustive board is an unreadable board.
- Treat workflow design as continuous discovery, not a one-time diagram —
  revisit it when it stops matching how work actually moves.

### 3. Focus — limit work in progress before adding more of it

This is the highest-leverage lever for a planning or prioritization request,
and the one most plans skip.

- **WIP limits are a cap, not a quota** — they bound how much can be
  "in progress" in a given stage; they don't obligate anyone to fill the
  cap. Apply limits to stages/columns of work, not to people (multiple
  people can collaborate on one item; one person should not be assigned
  many "in progress" items simultaneously).
- **Little's Law, applied practically**: whether the team is under-loaded
  or overloaded, the fix is the same direction of adjustment — an
  under-loaded team should take on more *concurrent* work only up to its
  limit; an overloaded team should actively reduce concurrent work. Either
  way, throughput goes up when WIP matches actual capacity instead of
  demand.
- **A decision to start is a decision to finish.** When prioritizing a
  backlog or roadmap, resist ranking by "most valuable first" alone — rank
  by what can be *finished* soonest without starving something already in
  flight. Half-finished high-value work delivers zero value.
- **Interruption and context-switching have a real, measurable cost** —
  every additional concurrent initiative doesn't just add its own time, it
  taxes every other initiative in flight. A roadmap with five workstreams
  "in progress" at once is usually slower end-to-end than the same work run
  two at a time.
- **The Zeigarnik effect**: unfinished work occupies attention even when
  no one is actively working on it. A long list of "in progress but
  stalled" initiatives has a real cognitive cost on the team, independent
  of the work itself.
- When setting a WIP limit or a "how many things should we run at once"
  number: ask the team what they can actually sustain, set the limit per
  stage (not globally), and treat the first number as a hypothesis to
  adjust from — not a permanent policy.

### 4. Ownership — pull work, don't push or pre-assign it

- **The bubble of no ownership**: work that is "everyone's responsibility"
  in a roadmap or plan is in practice owned by no one. Every item on a plan
  needs one accountable owner, even if multiple people execute it.
- Prefer a **pull system** to a push/pre-assignment model: people take on
  new work when they finish what they have and signal availability, rather
  than having work assigned to them in advance based on a schedule. This
  keeps WIP limits meaningful and surfaces capacity honestly.
- When reviewing a plan or roadmap, check it isn't just a pile of
  pre-assignments made under a need for certainty — a pull-based plan names
  the *next few* things to pull, not everyone's full quarter mapped in
  advance.
- A common, avoidable source of delay is work sitting **starved** —
  finished by one stage but not yet picked up by the next, with no one
  aware it's waiting. Build in an explicit "I'm available, pull from me"
  signal (a person, a channel, a board) rather than relying on someone
  noticing.

### 5. Collaboration — swarm to protect flow, not just to hit deadlines

- **Swarming** = deliberately pulling in extra help to move a specific
  stuck item, in service of overall flow — not an emergency-only action,
  and not the same as reassigning ownership.
- Valid reasons to swarm: the owner is unavailable; the item is **stale**
  (sitting too long in one stage), **at risk** (may miss its need-by date
  even though nominally on track), or **blocked** (missing a dependency,
  a decision, or a skill); the stage itself is starved or bottlenecked; or
  a WIP limit has been hit and something needs to clear before new work
  can start.
- **Everything moves at the speed of the bottleneck.** When prioritizing
  improvement work, find the actual constraint in the flow before
  optimizing any other stage — speeding up a non-bottleneck stage doesn't
  change overall delivery speed.
- **Slack time** (capacity below the WIP limit) should be spent on swarming
  starved/blocked/stale/risky items or on a pre-agreed backlog of
  improvement work — not on starting something brand new. Starting new
  work during slack defeats the purpose of having reserved capacity.

### 6. Unhide — surface the work and estimates that aren't visible

Before trusting a plan, roadmap, or prioritized backlog, check for the four
common ways real work goes missing:

- **Missing** — work happening that never made it onto the board or plan at
  all (interrupt work, "quick favors," maintenance).
- **Perfect** — treating an estimate or a plan as needing to be exactly
  right before it's usable. It doesn't; a plan is a model, not a
  commitment.
- **Vague** — inconsistent descriptions of what "done" or "ready" means for
  an item, so nobody can tell if it's actually progressing.
- **Big** — undecomposed work. Ideas can be big; individual work items on a
  plan should be small enough to finish and show progress on quickly. The
  value of estimating a big item isn't the number produced — it's the
  assumptions and unknowns that surface while doing it. Throw the estimate
  away once it's served that purpose; don't treat it as a commitment.

### 7. Illumination — prioritize by risk and cost of delay, not by uniform due dates

Treating all work the same and defaulting to due dates for everything is a
symptom of wanting certainty the work doesn't actually have. Prioritize
using **Classes of Service** instead — this is the direct answer to "how do
we prioritize the roadmap":

| Class | Definition | Roadmap treatment |
|---|---|---|
| **Standard** | Has business value, no specific delivery timeframe | Sequence by value and flow position |
| **Fixed Date** | Value drops sharply after a specific date (regulatory, contractual, seasonal) | Schedule backward from the date; protect its slot |
| **Intangible** | No obvious direct value or timeframe, but carries growing risk if deferred (tech debt, security hygiene) | Deliberately budget capacity for it — it never wins a head-to-head vs. visible value, so it needs a reserved allocation |
| **Expedite** | Immediate value; cost escalates every additional hour | Pull immediately, ahead of WIP limits, and give it the whole team's focus until delivered |

Practical guidance:

- Give Expedite its own visible lane and a written policy for when it may
  be invoked (e.g., revenue-impacting outage, security vulnerability,
  contractual/SLA breach) — without a policy, "urgent" becomes whatever the
  loudest stakeholder calls it, and everything degrades into expedite.
- An unbudgeted Intangible class is why "important but not urgent" work
  (tech debt, hardening, cleanup) never makes it onto a roadmap — it needs
  a standing allocation, not a promise to get to it later.

### 8. Coordination — run two meetings, not one blurred one [→ consult `references/facilitation-exercises.md` for facilitator scripts]

When asked to design or fix planning/status meetings, keep these distinct:

- **Daily sync (Kanban Meeting)** — ~15 minutes, whole team, standing at
  the board, no single leader (rotate who runs it). Purpose: "what can we
  finish today," and surfacing flow problems — not a round-robin status
  report. Anti-patterns: individual status updates instead of
  board-centered discussion, side conversations, deep problem-solving in
  the meeting itself (park it), starting late.
- **Replenishment meeting** — roughly once per planning cadence, ~1 hour,
  run by the person accountable for priorities plus key stakeholders.
  Purpose: decide what enters the system next. Agenda: recap since last
  time, current state and learnings, blockers, what's next, agreed
  priority and sequence. Anti-pattern: re-litigating work already in
  progress, or letting people absent from the meeting override its
  decisions after the fact.

Collapsing these into one meeting is a common cause of both: daily syncs
that drag into planning debates, and planning meetings that never happen
because "we cover that in stand-up."

## Instinct → practice (quick reference)

Old instinct often drives plans that feel productive but aren't. Substitute:

| Instinct | Kanban practice |
|---|---|
| Optimize for efficiency/busyness | Optimize for flow |
| Batch work together | Let items flow independently |
| Stay busy | Limit work in progress |
| Push/pre-assign work | Pull work when ready |
| Reward individual specialization | Swarm to unblock the team |
| Manage worry | Reserve slack, spend it on real risk |
| Demand a perfect estimate | Unhide the work, then move on |
| Demand certainty (due dates for everything) | Prioritize by risk/Class of Service |
| Optimize personal standing (narcissism) | Think in terms of the whole system |
| Report status | Report what's getting finished |

## Applying this to common requests

- **"Help me prioritize this backlog/roadmap"** → Don't just rank by value.
  Sort by Class of Service first (protect Fixed Date and Expedite,
  budget for Intangible), then within Standard, prefer what can finish
  soonest without exceeding WIP limits over what's merely most valuable.
- **"Build a project plan"** → Visualize the workflow (Clarity) before
  scheduling; set WIP limits per stage instead of assigning everyone
  everything up front (Focus); name one owner per item (Ownership); budget
  slack and an Intangible allocation, don't schedule at 100% capacity.
- **"Why does everything feel behind/stuck?"** → Look for unbounded WIP,
  starved hand-offs, an unbudgeted "everything is urgent" pattern, or too
  much concurrently-started work — in that order, before assuming the team
  needs to work faster.
- **"Design our stand-up/planning process"** → Apply Coordination: split
  daily sync from periodic replenishment; anchor the daily sync to the
  board and to "what finishes today," not to status reporting.
- **"Help our team actually learn/adopt this"** → Advice alone rarely
  changes instinctive behavior (see the table above). Run one or two of the
  exercises in `references/facilitation-exercises.md` — the Paper Airplane
  game in particular makes the pull-system/WIP-limit payoff felt rather
  than argued.

## Vocabulary (use precisely)

- **Flow** — the rate and predictability with which work moves from
  requested to delivered. The primary metric; efficiency/utilization is a
  side effect of good flow, not a target in itself.
- **WIP limit** — a cap on how many items may be in progress at a given
  stage at once. A constraint that *enables* faster delivery by preventing
  overload, not a productivity quota.
- **Pull system** — work is taken on by whoever has capacity, signaled by
  availability, rather than pushed onto people by a schedule or
  pre-assignment.
- **Class of Service** — a category (Standard, Fixed Date, Intangible,
  Expedite) used to prioritize by risk and cost of delay instead of by a
  uniform due date.
- **Swarm** — a deliberate, temporary reallocation of people to move a
  specific stuck item, in service of overall flow.
- **Bottleneck** — the stage that sets the throughput ceiling for the
  entire flow; improving any other stage does not increase overall speed.
- **Starvation** — a stage or person is idle because upstream work isn't
  arriving, or an underlying capability is missing.
- **Stale / at risk / blocked** — stale: sitting too long in a stage;
  at risk: may miss its need-by date despite appearing on track; blocked:
  cannot proceed due to a missing dependency, decision, or skill.
- **Slack** — reserved capacity below the WIP limit, intentionally spent on
  swarming or pre-agreed improvement work, not on starting new initiatives.
- **Replenishment** — the deliberate, periodic act of deciding what enters
  the system next; the only point where "pushing" new work in is
  appropriate.

## Reviewing an existing plan, board, or process (checklist mode)

1. Is there an explicit, visualized workflow, or is status tracked only in
   people's heads / a flat list?
2. Are there WIP limits anywhere, or can unlimited work be "in progress"
   simultaneously?
3. Is work pulled by available capacity, or pushed/pre-assigned by
   schedule?
4. Is prioritization done by Class of Service / cost of delay, or does
   everything have a due date and "priority 1"?
5. Is there a named owner per item, or is anything "everyone's job"?
6. Is there a standing allocation for Intangible (tech debt/risk) work, or
   does it only get done when nothing urgent is happening (i.e., never)?
7. Are daily coordination and periodic prioritization separate meetings
   with separate purposes, or blurred into one?
8. Is slack time reserved and spent on swarming/real risk, or immediately
   filled with new work?

Lead the review with the highest-leverage gap (usually: no WIP limit, or
prioritization done entirely by due date) rather than a top-to-bottom
recital.
