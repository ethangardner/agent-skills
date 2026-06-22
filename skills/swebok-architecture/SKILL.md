---
name: swebok-architecture
description: >-
  Produce or review a software architecture description (AD) using the
  stakeholder/concern + views/viewpoints discipline from SWEBOK V4 Chapter 2.
  Use this whenever the work involves documenting, communicating, or evaluating
  the architecture of a software-intensive system — e.g. "document the
  architecture of X", "write an architecture description / arc42 / 4+1 style
  doc", "what views do I need for this system", "review/critique this
  architecture", "who are the stakeholders and what do they care about",
  "pick the right diagrams for this system", or onboarding/reverse-architecting
  an existing system before a change. Trigger even when the user just says
  "diagram the architecture", "review the architecture", or "explain the design
  of this service" — the discipline of separating concerns by view applies,
  not just one ad-hoc box diagram.
---

# Software Architecture

A software architecture description (AD) is the work product that captures the
_fundamental_ concepts and properties of a software system **in its
environment** — its elements, their relationships, and the principles guiding
its design and evolution. It is not a code dump and not a single box-and-arrow
picture. Its job is to give stakeholders a shared, tangible model they can use
to design, build, analyze, certify, operate, evolve, or reverse-engineer the
system.

Three ideas drive everything below:

1. **Architecture is the set of significant decisions — those costly to
   reverse.** Everything else is implementation detail. The test: if changing it
   would require renegotiating with multiple stakeholders or unwinding work
   across multiple teams, it is architectural. If one developer could change it
   in an afternoon without consulting anyone, it probably is not. This
   distinction matters because the purpose of an AD is to make those decisions
   explicit, justified, and traceable — not to catalog every design choice ever
   made.

2. **What is fundamental varies by stakeholder.** The architecture relevant to a
   tester is not the architecture relevant to an operator or a customer paying
   the bill. An AD that tries to serve all stakeholders with one picture serves
   none — it is simultaneously too detailed and incomplete for every audience.
   Multiple views are not overhead; they are the mechanism that makes the AD
   legible to each stakeholder class. An AD with one diagram is a symptom, not a
   style choice.

3. **Separation of concerns is the only scalable technique** (Dijkstra). You
   address one aspect at a time, in isolation, knowing the others exist —
   "one- and multiple-track-minded simultaneously." In an AD this is
   operationalized as **views**, each governed by a **viewpoint**. The single
   most important discipline is keeping the three viewtypes separate: mixing
   module structure (how the code is organized) with C&C structure (how the
   system runs) with allocation structure (where it deploys) in one diagram
   produces a picture that confuses everyone and hides the architectural
   decisions it was supposed to make visible.

## When NOT to over-apply this

If the user genuinely wants one quick diagram of a three-component toy system,
do not force a six-view formal AD on them. Scale the ceremony to the system's
size, team size, and lifespan. A mental model is fine for small systems built by
one person. The full discipline earns its keep on large, long-lived, multi-team
systems, or when an artifact must outlive the people who built it. State the
scaling decision rather than silently defaulting to maximal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Frame the system in its environment

Architecture is **outward-looking**. Before any internal structure, establish:

- The system-of-interest and its boundary — what is inside vs. outside.
- The external entities it interacts with: people, organizations, other
  software, hardware, devices, regulators. These shape the architecture as much
  as anything internal.
- The _uses_ this AD must serve. Pick the ones that apply, because they change
  what you emphasize:
  - **Guide construction** (primary audience: designers/engineers/programmers —
    the AD is their blueprint).
  - **Analyze/evaluate alternatives** (the AD as a preliminary conception to
    reason over before committing).
  - **Reverse-architect** an existing system before maintenance or enhancement.
  - Support testing, certification, deployment, operation, evolution.

> Conway's Law is worth a sanity check here: systems tend to mirror the
> communication structure of the organizations that build them. If the proposed
> architecture cuts across team boundaries in a way the org cannot actually
> communicate across, flag it — that is an architectural risk, not a detail.

### 2. Identify stakeholders and elicit their concerns

List the stakeholders and, for each, what they actually care about. Do not
guess generically — tie concerns to roles. Consult `references/concerns.md` for
the full stakeholder→concern starting map, the concern checklist (to catch
missed classes), and guidance on classification.

Classify each concern as **functional**, **non-functional / quality attribute**
("ility"), or **constraint** — same taxonomy as requirements. Also watch for:

- **Emergent properties** — properties of the whole that do not live in any
  single element, which may be _desired_ (resilience, adaptability) or
  _prohibited_ (deadlock states, data-leak paths). These are easy to miss
  because they cannot be assigned to an individual component.

Concerns are not static — they evolve as the system matures and as the world
changes (regulations, social expectations, energy efficiency requirements). Note
which concerns are likely to shift, so the AD's principles of evolution account
for them.

### 3. Select viewpoints to cover the concerns

A **view** shows one or more aspects of the architecture to address specific
concerns. The conventions, notations, and models a view must follow are its
**viewpoint**. Choose the _minimal set of viewpoints whose union covers the
concerns from step 2_ — every view should earn its place by answering a real
stakeholder concern.

Consult `references/viewpoints.md` for the full catalog with "use when"
guidance and the module / component-and-connector / allocation viewtype
categorization. Build a coverage table so the selection is defensible:

| Concern | Viewpoint(s) addressing it | View name |
| ------- | -------------------------- | --------- |

Every concern should map to a view; every view should trace to a concern. An
orphaned concern is a documentation gap. An orphaned view is wasted effort.

### 4. Produce each view

For each selected viewpoint, render a view using _well-defined conventions_,
not freehand. A viewpoint supplies a vocabulary and the mechanisms for
addressing its concerns; honor it. Notation choices (UML, C4, informal boxes,
a table, a formal ADL) should be driven by the audience's need, familiarity,
and the utility of the choice — not by what is fanciest.

Each view must state explicitly **which concerns it addresses and for whom.** A
view that cannot name its audience and concern is probably noise.

When using a general-purpose notation like UML, specialize it to the system,
domain, and organizations involved (profiles, stereotypes, conventions). Do not
mix viewtypes in a single diagram — a diagram that is simultaneously a module
view and a C&C view answers neither question clearly.

### 5. Assemble and reconcile the AD

Multiple views describe one system, so they must be made consistent. Choose a
construction approach and state which you used:

- **Synthetic** — build each view somewhat independently, then integrate them
  using explicit _correspondence rules_ that tie elements across views.
- **Projective** — derive every view by (possibly mechanical) extraction from a
  single unified model. Favors consistency-by-construction; requires the unified
  model to exist.

If model-based, note that each view can be machine-checked against its
viewpoint. Document known inconsistencies between views and their planned
resolution.

### 6. Surface the significant decisions

Architecture is _the set of significant decisions_. Make them explicit, each
tied to the concern(s) it serves and the alternatives it rules out. This is what
enables the AD to be used for _evaluation_, not just description. For each
decision:

- State the concern it addresses.
- State the alternatives that were considered and why they were rejected.
- State the assumptions the decision rests on.
- State the known limitations or trade-offs accepted.

Record these as Architecture Decision Records (ADRs) or in a decisions table.
An AD that only shows the chosen solution without ruling out alternatives is not
useful for reasoning about change.

## Output format

Unless the user asks for something else (e.g. arc42, 4+1, C4, an ADR set),
use this structure. Adapt depth to the system's scale.

```
# Architecture Description: <system>

## 1. System context and scope
- System-of-interest and boundary
- External entities (people, orgs, systems, hardware, regulators)
- Uses this AD serves (construct / analyze / reverse-architect / operate / ...)

## 2. Stakeholders and concerns
| Stakeholder | Role | Key concerns | Type (func/quality/constraint) |
Note which concerns are expected to evolve.

## 3. Viewpoint selection (coverage table)
| Concern | Viewpoint(s) addressing it | View |
(Every concern covered; every view justified.)

## 4. Views
For each selected view:
### <View name> (<viewpoint>, viewtype: module | C&C | allocation)
- Addresses: <concerns> for <stakeholders>
- Notation: <UML / C4 / table / ADL / informal + why>
- <the model / diagram / description>

## 5. Cross-view consistency
- Construction approach: synthetic (with correspondence rules) | projective
- Correspondence rules / known inconsistencies

## 6. Significant decisions, assumptions, limitations
| Decision | Concern served | Alternatives rejected | Assumptions | Known trade-offs |
```

If asked for a diagram inline rather than a full document, still apply the
discipline silently: name the viewpoint you are drawing, state whose concern it
serves, and do not conflate a module view with a runtime C&C view in one
picture.

## Reviewing an existing architecture (checklist mode)

When the task is to critique or evaluate rather than write, run the workflow as
a checklist against what exists:

1. Are stakeholders and their concerns identified — or assumed? Missing concern
   classes are the most common defect. Check against `references/concerns.md`.
2. Does each concern map to at least one view? Any orphan concerns?
3. Does any view mix viewtypes (module vs. C&C vs. allocation) and thereby
   confuse implementation structure with runtime structure? Separate them.
4. Are views internally consistent and consistent _with each other_
   (correspondence)?
5. Are the significant decisions stated and justified, or only the happy path
   shown? Are alternatives documented?
6. Is the notation appropriate to the audience, or rigorous-for-its-own-sake?
7. Conway's Law check: does the architecture fit the org's communication
   structure, or fight it?
8. Are emergent properties (desired and prohibited) addressed — or only
   component-level concerns?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Architecture** — the fundamental concepts and properties of a system in its
  environment: its elements, relationships, and the principles of its design and
  evolution. "Fundamental" is load-bearing: not every interface is architectural.
- **Concern** — any stakeholder interest in the system: functional, quality
  attribute, or constraint. Emergent properties (desired or prohibited) are also
  concerns.
- **View** — a representation of one or more aspects of the architecture that
  addresses one or more concerns for a specific stakeholder audience.
- **Viewpoint** — the conventions, notations, and models governing a view; links
  a stakeholder audience's concerns to a way of expressing them. Reusable across
  systems.
- **Viewtype** — the three-way categorization (Clements et al.): **module**
  (implementation units, static), **component-and-connector** (runtime elements
  and interactions, dynamic), **allocation** (mapping of software to
  non-software structures — hardware, teams, filesystems).
- **AD** — architecture description; the work product comprising the views and
  the material binding them (stakeholders, concerns, viewpoints, decisions).
- **Correspondence rule** — an explicit mapping between elements in different
  views that maintains consistency across the AD.
- **ADR (Architecture Decision Record)** — a structured record of one
  significant decision: context, options considered, decision made, rationale,
  and consequences.
- **Emergent property** — a property of the whole system that cannot be
  attributed to any single element, either desired (resilience) or prohibited
  (deadlock, data-leak path).
