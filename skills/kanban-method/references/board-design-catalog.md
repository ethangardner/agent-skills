# Board Design Catalog

Worked board designs across domains. None of these are prescriptive
templates — copy the reasoning, not the exact columns. For each: **columns**
(with type — Activity / Queue / Buffer), **WIP limits** (and why), **Classes
of Service in practice**, and **limitation** (what this design doesn't solve,
or gets wrong if copied verbatim).

---

## Software delivery (feature team)

**Columns:** Backlog (no limit — Queue) → Ready for Dev (limit 3 — Queue) →
In Dev (limit per-developer count, not team count — Activity) → Code Review
(limit 2 — Activity) → Ready for QA (limit 3 — Queue) → In QA (limit 2 —
Activity) → Done.

**WIP limits:** "Ready for Dev" and "Ready for QA" are deliberately small
queues, not staging areas for a week's worth of work — a queue that fills up
faster than it drains is telling you the downstream stage is the bottleneck,
not that you need a bigger queue.

**Classes of Service:** Add an Expedite swim lane above the board, visually
distinct (a different row, not a different color chip in the same row).
Fixed Date items get a due-date badge and are sequenced backward from that
date in Ready for Dev. Intangible (tech debt, security patches) gets a
reserved slot — e.g., 1 of the 3 "Ready for Dev" slots is always Intangible
unless explicitly and visibly traded away for a sprint.

**Limitation:** Per-stage WIP limits this granular only work if the team is
large enough that Code Review and QA are genuinely separate capacity from
Dev. On a 3-person team, this design creates false bottlenecks — collapse
Code Review into In Dev instead.

---

## IT support / ticketing

**Columns:** New (Queue) → Triage (Activity, limit 1 concurrent triage) →
In Progress (Activity, limit = number of on-shift agents) → Waiting on
Customer (Buffer — explicitly does not count against WIP limit, because the
team isn't the one holding up progress) → Resolved.

**WIP limits:** "In Progress" limit tracks headcount on shift, not headcount
on the team — this is the one board type where WIP limit changes routinely
throughout the day as shifts change, and that's correct, not a violation of
"don't change limits casually."

**Classes of Service:** This is the canonical home of Expedite — a
customer-down ticket pulls immediately regardless of WIP limit, and the
Standard/Fixed-Date split usually maps to SLA tiers (Fixed Date = ticket has
a contractual response-time SLA; Standard = no SLA commitment).

**Limitation:** "Waiting on Customer" as a no-WIP-limit buffer is easy to
abuse as a place to park tickets nobody wants to close out. Cap how long a
ticket may sit there before someone is required to re-engage the customer,
or it becomes invisible backlog.

---

## Hiring pipeline

**Columns:** Sourced (Queue) → Screen (Activity, limit 5 — a recruiter can
realistically evaluate) → Interview Loop (Activity, limit = number of
open interview slots this week, not number of candidates you'd like to move
forward) → Debrief/Decision (Activity, limit 2 — decisions degrade in
quality past this) → Offer (Activity) → Closed.

**WIP limits:** The Interview Loop limit is the one that actually matters —
it's usually set by interviewer calendar capacity, which most hiring plans
ignore and then wonder why candidates go stale between rounds. Every stale
candidate in this pipeline is a candidate another company is currently
interviewing.

**Classes of Service:** Fixed Date is rare here except for cohort-based
hiring (a bootcamp class, a specific start-date requirement). Expedite maps
to a candidate with a competing offer deadline — everyone recognizes this
instinctively but rarely gives it an actual visible lane, so it competes
informally and inconsistently against every other req.

**Limitation:** This board hides the real constraint if you don't also track
interviewer availability outside the board — the bottleneck is frequently
"interviewer calendars," which doesn't show up as a column at all.

---

## Content / editorial calendar

**Columns:** Idea (no limit — Queue) → Outline Approved (limit 3 — Queue) →
Drafting (Activity, limit = number of active writers) → Editing (Activity,
limit 2) → Ready to Publish (Queue, limit 3) → Published.

**WIP limits:** "Outline Approved" and "Ready to Publish" queues existing at
all is itself a design choice — they exist because Drafting and the
publishing calendar run on different cadences, and the queue absorbs that
mismatch instead of forcing them to sync.

**Classes of Service:** Fixed Date dominates here (launch-tied content,
seasonal content, embargo dates) — treat it the same as a software Fixed
Date item: schedule backward, protect the slot. News-hook content is
Expedite: value decays by the hour, pull immediately.

**Limitation:** A shared "Editing" limit across writers with very different
speeds creates artificial starvation for fast writers waiting on a shared
editor — if editing is consistently the bottleneck, that's the actual
constraint to address (see Collaboration §5 in the main skill), not a
reason to raise every other limit.

---

## Sales pipeline (adapted from a stage-gate CRM view)

**Columns:** Qualified (Queue) → Discovery (Activity, limit per rep) →
Proposal (Activity, limit 2 per rep — proposals in flight past this rarely
get real attention) → Negotiation (Activity) → Closed Won/Lost.

**WIP limits:** This is the domain most resistant to WIP limits because
"more deals in the pipeline" looks like more revenue potential — but a rep
juggling 8 live proposals is usually worse at closing any single one than a
rep focused on 2. The limit forces prioritization the rep would otherwise
avoid making explicit.

**Classes of Service:** Fixed Date maps directly to end-of-quarter or
contract-renewal deadlines. There is no legitimate Expedite class in most
sales pipelines — a "deal needs to close today" claim is almost always a
prioritization failure upstream (see Illumination §7), not a genuine
Expedite case, and treating it as one every time trains the team to inflate
urgency claims.

**Limitation:** Sales boards conflate "stage" (where the deal is in the
buyer's process) with "activity" (what the rep is doing right now) more
than any other domain here — a deal can sit in "Negotiation" for months
with the rep doing nothing, which a stage-only board won't surface as
stale. Add an explicit staleness flag independent of stage.
