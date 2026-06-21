---
name: swebok-architecture
description: >-
  Produce or review a software architecture description (AD) using the
  stakeholder/concern + views/viewpoints discipline from SWEBOK. Use this
  whenever the work involves documenting, communicating, or evaluating the
  architecture of a software-intensive system — e.g. "document the
  architecture of X", "write an architecture description / arc42 / 4+1 style
  doc", "what views do I need for this system", "review/critique this
  architecture", "who are the stakeholders and what do they care about",
  "pick the right diagrams for this system", or onboarding/reverse-architecting
  an existing system before a change. Trigger even when the user just says
  "diagram the architecture", "review the architecture", or "explain the design 
  of this service" — the discipline of separating concerns by view applies, 
  not just one ad-hoc box diagram.
---

# Architecture Description

An architecture description (AD) is the work product that captures the
_fundamental_ concepts and properties of a software system **in its
environment** — its elements, their relationships, and the principles guiding
its design and evolution. It is not a code dump and not a single box-and-arrow
picture. Its job is to give stakeholders a shared, tangible model they can use
to design, build, analyze, certify, operate, evolve, or reverse-engineer the
system.

Two ideas drive everything below:

1. **What is fundamental varies by stakeholder.** A system has many
   stakeholders whose interests (their _concerns_) differ. The architecture
   relevant to a tester is not the architecture relevant to a customer paying
   the bill. So the AD must be _multi-perspective_.
2. **Separation of concerns is the only scalable technique** (Dijkstra). You
   address one aspect of the system at a time, in isolation, knowing the others
   exist — "one- and multiple-track-minded simultaneously." In an AD this is
   operationalized as **views**, each governed by a **viewpoint**.

## When NOT to over-apply this

If the user genuinely wants one quick diagram of a three-component toy system,
don't force a six-view formal AD on them. Scale the ceremony to the system's
size, team size, and lifespan. A mental model is fine for small systems built
by one person. The full discipline earns its keep on large, long-lived,
multi-team systems, or when an artifact must outlive the people who built it.
State the scaling decision rather than silently defaulting to maximal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Frame the system in its environment

Architecture is **outward-looking**. Before any internal structure, establish:

- The system-of-interest and its boundary — what's inside vs. outside.
- The external entities it interacts with: people, organizations, other
  software, hardware, devices, regulators. These shape the architecture as much
  as anything internal.
- The _uses_ this AD must serve. Pick the ones that apply, because they change
  what you emphasize:
  - **Guide construction** (primary audience: designers/engineers/programmers —
    the AD is their blueprint).
  - **Analyze/evaluate alternatives** (the AD as a preliminary conception to
    reason over before committing).
  - **Reverse-architect** an existing system before maintenance/enhancement.
  - Support testing, certification, deployment, operation, evolution.

> Conway's Law is worth a sanity check here: systems tend to mirror the
> communication structure of the organizations that build them. If the proposed
> architecture cuts across team boundaries in a way the org can't actually
> communicate across, flag it — that's an architectural risk, not a detail.

### 2. Identify stakeholders and elicit their concerns

List the stakeholders and, for each, what they actually care about. Don't
guess generically — tie concerns to roles:

- Customer → cost, schedule, when it ships, operating cost.
- Users → what it does, how to use it (user experience).
- Designers/programmers → whether the design meets requirements, feasibility.
- Safety/security/compliance owners → assurance, regulatory fit.
- Operators → deployability, observability, resource use.

Classify each concern as **functional**, **non-functional / quality
attribute** ("ility"), or **constraint** — same taxonomy as requirements.
Concerns also include emergent properties (desired _or_ prohibited) and
contextual influences (business, legal, ecological, political, economic).

Concerns are not static — they evolve with the system and with the world
(e.g. energy efficiency and sustainability rising in importance). Note which
concerns are likely to shift.

See `references/concerns.md` for a concern checklist and the stakeholder→
concern mapping to work against so you don't miss a class of concern.

### 3. Select viewpoints to cover the concerns

A **view** shows one or more aspects of the architecture to address specific
concerns. The conventions, notations, and models a view must follow are its
**viewpoint**. Choose the _minimal set of viewpoints whose union covers the
concerns from step 2_ — every view should earn its place by answering a real
stakeholder concern. Don't produce a view nobody needs; don't leave a live
concern unaddressed.

Common viewpoints (full catalog with "use when" guidance and the module /
component-and-connector / allocation viewtype categorization in
`references/viewpoints.md`):

- **Module** — implementation units and their organization.
- **Component & connector (C&C)** — large-scale runtime organization and
  interactions.
- **Logical** — fundamental domain concepts and capabilities.
- **Scenarios / use cases** — how users interact with the system.
- **Information** — key information elements, how they're accessed and stored.
- **Deployment** — how the system is configured and deployed to operate.
- **Quality viewpoints** — availability, behavior, communications, exception
  handling, performance, reliability, safety, security: each captures an
  established community's way of identifying, analyzing, and representing that
  concern.

Build a quick **concern→viewpoint coverage table** so the selection is
defensible. (Template in the output format below.)

### 4. Produce each view

For each selected viewpoint, render a view using _well-defined conventions_,
not freehand. A viewpoint supplies a vocabulary and the mechanisms for
addressing its concerns; honor it. Notation choices (UML, C4, informal boxes,
a table, a formal ADL) should be driven by the audience's need, familiarity,
and the utility of the choice — not by what's fanciest. When using a
general-purpose notation like UML, specialize it to the system, domain, and
organizations involved.

Each view must say, explicitly, **which concerns it addresses and for whom.**
A view that can't name its audience and concern is probably noise.

### 5. Assemble and reconcile the AD

Multiple views describe one system, so they must be made consistent. Pick a
construction approach and say which you used:

- **Synthetic** — build each view somewhat independently, then integrate them
  using explicit _correspondence rules_ that tie elements across views.
- **Projective** — derive every view by (possibly mechanical) extraction from a
  single unified "über-model." Favors consistency-by-construction; needs the
  unified model to exist.

If model-based, note that each view can be machine-checked against its
viewpoint.

### 6. Surface the significant decisions

Architecture is _the set of significant decisions_ — those that are costly to
reverse and that shape elements, relationships, and the principles of design
and evolution. Make them explicit, each tied to the concern(s) it serves and
the alternatives it rules out. This is what lets the AD be used to _evaluate
alternatives_, not just describe the chosen one. Record assumptions and known
limitations alongside.

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

## 3. Viewpoint selection (coverage)
| Concern | Viewpoint(s) addressing it | View |
(Every concern covered; every view justified.)

## 4. Views
For each selected view:
### <View name> (<viewpoint>, viewtype: module|C&C|allocation)
- Addresses: <concerns> for <stakeholders>
- Notation: <UML / C4 / table / ADL / informal + why>
- <the model / diagram / description>

## 5. Cross-view consistency
- Construction approach: synthetic (with correspondence rules) | projective
- Correspondences / known inconsistencies

## 6. Significant decisions, assumptions, limitations
- Decision → concern served → alternatives rejected
- Assumptions
- Known limitations
```

If asked for a diagram inline rather than a full document, still apply the
discipline silently: name the viewpoint you're drawing, state whose concern it
serves, and don't conflate a module view with a runtime C&C view in one
picture.

## Reviewing an existing architecture (instead of authoring)

When the task is to critique or evaluate rather than write, run the workflow as
a checklist against what exists:

1. Are stakeholders and their concerns identified — or assumed? Missing concern
   classes are the most common defect.
2. Does each concern map to at least one view? Any orphan concerns?
3. Does any view mix viewtypes (module vs. C&C vs. allocation) and thereby
   confuse implementation structure with runtime structure? Separate them.
4. Are views internally consistent and consistent _with each other_
   (correspondence)?
5. Are the significant decisions stated and justified, or only the happy path
   shown?
6. Is the notation appropriate to the audience, or rigorous-for-its-own-sake?
7. Conway's Law check: does the architecture fit the org's communication
   structure, or fight it?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Architecture** — fundamental concepts/properties of a system in its
  environment: its elements, relationships, and the principles of its design
  and evolution. "Fundamental" is load-bearing; not every interface is
  architectural.
- **Concern** — any stakeholder interest in the system (functional, quality, or
  constraint).
- **View** — representation of one or more aspects addressing one or more
  concerns.
- **Viewpoint** — the conventions/notations/models governing a view; links a
  stakeholder audience's concerns to a way of expressing them. Reusable across
  systems.
- **Viewtype** — the 3-way categorization of viewpoints (Clements et al.):
  **module**, **component-and-connector**, **allocation**.
- **AD** — architecture description; the work product comprising the views and
  the material binding them.
