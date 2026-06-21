---
name: swebok-design
description: >-
  Produce or review a software design description using the discipline of
  abstraction, decomposition, coupling, and cohesion from SWEBOK V4 Chapter 3.
  Use this whenever the work involves designing or evaluating a module,
  component, class, or service — e.g. "design a module/component/class",
  "design an API", "design pattern", "refactor the design", "coupling and
  cohesion", "OO design", "domain model", "design for testability",
  "design for maintainability", "design review", "detailed design",
  "UML class diagram", "design decisions", "software design",
  "data-centered design", "event-driven design", "domain-driven design",
  "DDD", "design the data layer", "interface design", "component design".
  Trigger even when the user just says "how should I structure this module"
  or "is this a good design" — the discipline of managing complexity through
  abstraction and measuring quality through coupling and cohesion applies.
---

# Software Design Description

A software design description captures the _internal structure and behavior_
of a software system — its modules, their responsibilities, the interfaces
between them, and the rationale for the decisions made. It is not the code
and not the architecture (which fixes the decisions most costly to reverse);
it is the translation of requirements and architectural constraints into a
concrete plan for construction.

Two ideas drive everything below:

1. **The purpose of design is to manage complexity.** Every design decision
   is a choice about what complexity to expose and what to hide. The test of
   an abstraction is not aesthetic; it is whether it lets you reason about one
   concern at a time.
2. **Coupling and cohesion are proxies for change cost, not style
   preferences.** High coupling means a change in one module forces changes
   in others. Low cohesion means a single change must touch multiple places
   in one module. Both inflate maintenance cost. Measuring them is the
   primary quality signal.

## When NOT to over-apply this

A three-function utility script does not need a formal design description.
Scale the ceremony to the system: full design documentation earns its keep
on multi-team, long-lived systems, or where the design artifact is itself a
contractual deliverable. For small additions to existing systems, a clear
decision log may suffice. State the scaling decision rather than silently
defaulting to maximal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not
by accident, and say when you do.

### 1. Establish scope and constraints

Determine what is fixed by architecture (technology stack, key patterns, team
boundaries) and what is open for this design. Identify the requirements the
design must satisfy — functional, quality attribute, and constraint. Note any
explicitly out-of-scope assumptions that would change the design if they
were wrong.

Architecture fixes the decisions most costly to reverse; design fills in the
rest within those constraints. The dividing line is not a level of detail but
a reversibility cost. Be explicit about which decisions you are inheriting and
which you are making.

### 2. Identify key design issues

For this module, component, or service, identify which of the following issues
are relevant and require a design decision. Not every issue applies to every
design; include only those that forced a non-trivial choice:

- **Concurrency** — shared state, synchronization, potential for deadlock or
  race conditions.
- **Control flow and event handling** — whether the design is driven by
  sequential calls, events, callbacks, or reactive streams.
- **Error and exception handling** — which layer catches which exceptions,
  what the recovery strategy is, and whether errors propagate or are
  converted at boundaries.
- **Fault tolerance** — how the design remains correct or degrades gracefully
  when dependencies fail.
- **Integration and interoperability** — how this module communicates with
  other components, services, or external systems; what the contract is and
  who owns it.
- **Assurance and security** — how the design enforces authorization, protects
  data, and satisfies assurance requirements without embedding security
  checks ad hoc throughout the code.
- **Performance constraints** — latency budgets, throughput requirements, or
  resource limits that shape the design choices.
- **Persistence and data access** — how the module reads and writes data,
  whether it owns the data model, and how it is decoupled from the storage
  technology.

### 3. Select a design strategy

Choose the design method or methods appropriate to the domain, team skills,
and requirements. The choice is consequential: a structured / function-oriented
approach and a domain-driven approach produce fundamentally different
decompositions for the same requirements. Consult `references/strategies.md`
for a comparison of structured design, object-oriented design, user-centered
design, component-based design, event-driven design, aspect-oriented design,
domain-driven design, and constraint-based design, with guidance on when each
fits and what its pitfalls are.

Record the rationale for your choice: why this strategy for this context, and
what alternatives were rejected.

### 4. Apply design patterns

For each concern identified in step 2, apply established patterns where they
fit. A pattern is not a goal in itself — apply it because it resolves a
specific set of forces in your context. Consult `references/patterns.md` for
the full catalog organized by concern: creational, structural, behavioral, and
architectural / system-level patterns.

For each pattern applied, record:

- What concern it addresses.
- What forces it resolved.
- What alternatives were considered and why they were rejected.

Avoid applying patterns as decoration. If you cannot state the forces that
make a pattern applicable here, it probably should not be here.

### 5. Record the design

Produce models at the level of detail appropriate to the audience:

- **Structural models** — class, component, or module diagrams showing
  entities, their responsibilities, and the relationships (dependencies,
  associations, compositions) between them. Define the public interface of
  each module explicitly.
- **Behavioral models** — sequence diagrams, state machines, or activity
  diagrams showing how the design behaves at runtime for the scenarios that
  matter. Behavioral models are not optional decoration; they reveal design
  problems that structural models hide.

Each model must state which concern it addresses and for whom. A model that
cannot name its audience and concern is noise.

### 6. Evaluate design quality

Assess the design against the following criteria before declaring it done:

- **Coupling analysis** — identify which modules are coupled and why. Flag
  every coupling that cannot be explained by a functional dependency or that
  could be inverted (dependency injection) or removed (facade, adapter).
- **Cohesion assessment** — for each module, state its cohesion level. The
  ideal is functional cohesion (everything in the module serves one purpose).
  Logical cohesion (grouped only by type, not purpose) and coincidental
  cohesion (grouped arbitrarily) are design smells.
- **Design principles checklist** — for object-oriented designs: SRP, OCP,
  LSP, ISP, DIP. For other paradigms, apply the equivalent coupling/cohesion
  principles of the chosen strategy.
- **Testability** — can each unit be tested without instantiating the whole
  system? If not, identify what would need to change.
- **Walkthrough** — conduct a walkthrough with at least one reviewer. Document
  significant decisions, assumptions, and known limitations as outputs of the
  walkthrough.

## Output format

Unless the user asks for a different format, use this structure. Adapt depth
to the system's scale.

```
# Design Description: <Module / Component / Feature>

## 1. Scope and constraints
- What this design covers
- Architecture constraints: fixed technology, patterns, interfaces
- Requirements to satisfy (IDs from requirements spec)
- Out-of-scope assumptions

## 2. Design issues addressed
| Issue | Decision | Rationale | Alternatives rejected |
(List only issues that required a non-trivial decision.)

## 3. Design strategy
- Selected strategy: [structured / OO / event-driven / DDD / CBD / etc.]
- Rationale for this strategy in this context

## 4. Structural model
[Class diagram / component diagram / module dependency diagram]
- Key entities and their responsibilities
- Interface definitions (public API surface)

## 5. Behavioral model (where needed)
[Sequence diagram / state machine / activity diagram]
- Addresses: [which concern or scenario]

## 6. Design quality assessment
- Coupling analysis: [which modules are coupled and why / flagged couplings]
- Cohesion assessment: [each module's cohesion level]
- Design principles checklist: [SOLID / cohesion-coupling / equivalent for chosen strategy]
- Known limitations and assumptions
```

## Reviewing an existing design (instead of authoring)

When the task is to critique or evaluate rather than write, run the workflow
as a checklist against what exists:

1. Are the modules' responsibilities clearly stated, or are they
   emergent / implicit?
2. Is coupling justified? For each dependency between modules, is there a
   stated reason it cannot be inverted or removed?
3. Is each module cohesive — does everything in it belong to the same concern?
4. Are interfaces minimal and stable, or do they expose implementation details?
5. Are design decisions recorded with rationale, or only the chosen solution
   (with no trace of alternatives)?
6. Are the chosen design patterns applied correctly to the forces they're meant
   to resolve?
7. Is the design testable in isolation — can each unit be tested without
   instantiating the whole system?
8. Are there any design smells: God objects, deep inheritance hierarchies,
   tight coupling through global state, circular dependencies?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Module** — a design unit with a name, a defined interface, and a set of
  responsibilities; the basic unit of design decomposition.
- **Coupling** — the degree of interdependence between modules. High coupling
  means a change in one module is likely to require changes in others.
- **Cohesion** — the degree to which the elements within a module belong
  together. High cohesion means everything in the module serves a single,
  well-defined purpose.
- **Abstraction** — the suppression of irrelevant detail to allow focus on
  essential properties.
- **Encapsulation** — hiding implementation details behind a defined interface;
  a mechanism for achieving abstraction.
- **Interface** — the boundary between two modules, defining what one exposes
  to the other without revealing how.
- **Design pattern** — a named, reusable solution to a recurring design problem
  in a specific context; not a finished design, but a template.
- **Design decision** — a choice that has significant consequences for the
  design structure, which would be costly or difficult to reverse.
- **Separation of concerns** — the principle that each module or layer should
  address one distinct aspect of the system.
