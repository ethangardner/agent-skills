# Viewpoint Catalog

A viewpoint packages the conventions, notations, and models for a view, and
links a stakeholder audience's concerns to a way of expressing them. Viewpoints
are **reusable** across similar systems and across an organization — treat them
like engineering handbooks for recurring problems, not one-offs.

Pick the **minimal set whose union covers the concerns** you elicited. Each
chosen viewpoint should trace to a concern; each concern should trace to a
viewpoint.

## The three viewtypes (Clements et al.)

Every viewpoint falls into one of three categories. Keeping them separate is
the single most important discipline — mixing them produces diagrams that
confuse _how the code is organized_ with _how the system runs_ with _where it
is deployed_.

| Viewtype                        | Shows                                                             | Answers                                                     |
| ------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| **Module**                      | Implementation units and their organization (static, design-time) | How is the code/work broken down? Dependencies among units? |
| **Component & connector (C&C)** | Runtime elements and their interactions (dynamic)                 | What runs, what talks to what, and how, at execution time?  |
| **Allocation**                  | Mapping of software to non-software structures (environment)      | Where does it run / deploy? Who owns/builds which part?     |

If a single diagram is trying to be two of these at once, split it.

## Common viewpoints

### Module viewpoint — _viewtype: module_

Expresses the system's implementation in terms of modules and their
organization (layers, packages, subsystems, dependencies).
**Use when** concerns involve buildability, modifiability, modularity,
team/work allocation, dependency management, or reuse/product-line structure.

### Component & connector viewpoint — _viewtype: C&C_

Expresses large-scale runtime organization: components, connectors, and their
interactions (processes, services, message paths).
**Use when** concerns involve runtime behavior, concurrency, performance,
availability, data flow at execution time, or integration of running parts.

### Logical viewpoint — _viewtype: module (conceptual)_

Expresses the fundamental concepts of the software's domain and its
capabilities — how the system satisfies functional requirements.
**Use when** stakeholders need to understand _what the system is about_
conceptually and how functionality maps to structure.

### Process viewpoint — _viewtype: C&C_

Expresses how the system uses concurrency — processes, threads, and their
coordination.
**Use when** concerns involve concurrency, synchronization, throughput, or
responsiveness under load.

### Development viewpoint — _viewtype: module/allocation_

Expresses how the top-level design is broken into implementation units, the
dependencies among them, and how implementation is to be constructed.
**Use when** concerns involve the build, team ownership, and how the codebase
is organized for construction.

### Physical / Deployment viewpoint — _viewtype: allocation_

Expresses how the system is configured, deployed, and distributed onto
hardware/infrastructure for operation.
**Use when** concerns involve deployment topology, distribution, scaling,
resource utilization, or operational configuration.

### Scenarios / use-cases viewpoint — _viewtype: cross-cutting_

Expresses how users (and external systems) interact with the system; often used
to validate and tie the other views together.
**Use when** you need to ground or sanity-check the other views against real
usage, or to communicate behavior to non-technical stakeholders.

### Information viewpoint — _viewtype: typically module + allocation_

Expresses the system's key information elements: what data exists, how it is
accessed, and how it is stored.
**Use when** concerns involve data modeling, persistence, data accessibility,
ownership, retention, privacy, or information assurance.

## Quality-attribute viewpoints

Beyond structure, a viewpoint can capture an established community's _way of
working_ on a quality attribute — how that community identifies issues,
analyzes alternatives, and represents solutions. Reach for these when the
corresponding concern is significant:

- **Availability** — failure modes, redundancy, recovery.
- **Behavior** — state/interaction semantics over time.
- **Communications** — distribution, protocols, network structure.
- **Exception handling** — error detection, propagation, recovery paths.
- **Performance** — latency/throughput budgets, resource flow, bottlenecks.
- **Reliability** — fault identification and analysis (mirrors the reliability
  community's practices).
- **Safety** — hazard analysis and mitigation structure.
- **Security** — trust boundaries, threats, controls, assurance.

These are not separate from the structural views — they're lenses applied to
them. A security viewpoint, for example, reads the C&C and deployment views
through trust boundaries.

## The "4+1" mapping (familiar shorthand)

If the user references Kruchten's 4+1, it maps cleanly:

| 4+1 view     | Viewpoint here      | Viewtype            |
| ------------ | ------------------- | ------------------- |
| Logical      | Logical             | module (conceptual) |
| Process      | Process             | C&C                 |
| Physical     | Deployment/Physical | allocation          |
| Development  | Development         | module              |
| +1 Scenarios | Scenarios/use-cases | cross-cutting       |

## Choosing notation within a viewpoint

The viewpoint constrains _what_ a view must express; you still choose _how_:

- Drive the choice by audience need, familiarity, and utility — not novelty.
- UML, C4, SysML, an ADL, or even a well-structured table are all legitimate.
- When using a general-purpose notation (UML), **specialize** it to the system,
  domain, and organizations involved (profiles, stereotypes, conventions).
- In model-based architecting, a view can be machine-checked against its
  viewpoint — prefer this when consistency across a large AD matters.
