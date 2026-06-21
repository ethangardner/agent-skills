# Design Strategy Reference

A design strategy is a method of decomposing a system into modules and
assigning responsibilities to them. The choice of strategy is consequential:
different strategies applied to the same requirements produce fundamentally
different structures with different coupling profiles, different testability
characteristics, and different change cost distributions.

Choose the strategy that fits the domain, the team's skills, and the
dominant quality concerns. Mixed-strategy designs are common and legitimate —
use a domain-driven strategy for the core business logic, a component-based
strategy for integration boundaries, and event-driven patterns for reactive
subsystems. When mixing strategies, define the seams explicitly.

---

## Comparison Table

| Strategy                       | Primary decomposition unit         | Best-fit context                               | Key notations                         |
| ------------------------------ | ---------------------------------- | ---------------------------------------------- | ------------------------------------- |
| Structured / Function-Oriented | Function / procedure               | Batch, algorithmic, sequential workflows       | DFD, structure charts                 |
| Object-Oriented (OOD)          | Object (data + behavior)           | General-purpose; domain has clear entities     | UML class, sequence, state            |
| User-Centered (UCD)            | User task / interaction            | UI-dominant; UX drives product value           | Personas, wireframes, task flows      |
| Component-Based (CBD)          | Independently deployable component | Enterprise integration; replaceable parts      | Component diagrams, interface specs   |
| Event-Driven                   | Event and handler                  | Reactive, real-time, concurrent actors         | Event storming, message flow diagrams |
| Domain-Driven (DDD)            | Aggregate / bounded context        | Complex domains with rich business rules       | Context maps, aggregate diagrams      |
| Aspect-Oriented (AOD)          | Aspect / cross-cutting concern     | Concerns scattered uniformly across components | Aspect weaving diagrams               |
| Constraint-Based               | Constraint and decision variable   | Embedded, real-time, resource-limited systems  | Constraint graphs, timing diagrams    |

---

## Strategy Details

### 1. Structured / Function-Oriented Design

**Primary concepts:** Decompose the system into functions (procedures,
subroutines) using top-down functional decomposition. Data flows between
functions are explicit; behavior is the organizing principle.

**Best fit:**

- Batch processing and algorithmic systems where the workflow is
  well-understood and sequential.
- Scientific computation, data transformation pipelines, and compiler-style
  processing stages.
- Teams with a procedural background and requirements that are stable.

**Typical notations / tools:** Data flow diagrams (DFDs), structure charts,
pseudocode.

**Key strengths:**

- Straightforward to map requirements to functions.
- Easy to trace data flow through the system.
- Simple concurrency model (typically none, or explicit).

**Limitations / pitfalls:**

- Data and behavior are separate: the same data structure is accessed by many
  functions, creating high coupling through shared data. Any change to the data
  structure ripples across all functions that touch it.
- Modules defined purely by function tend toward low cohesion as requirements
  grow.
- Does not scale well to systems with complex domain models or significant
  state.

---

### 2. Object-Oriented Design (OOD)

**Primary concepts:** Organize the design around objects that combine data and
behavior. Key mechanisms are encapsulation (hiding data behind a defined
interface), inheritance (reusing and specializing structure and behavior), and
polymorphism (treating objects of different types uniformly through a shared
interface). Responsibility assignment is guided by GRASP (General
Responsibility Assignment Software Patterns) and measured against the SOLID
principles.

**Best fit:**

- Most general-purpose systems, especially where the problem domain has clear
  entities with rich behavior (accounts, orders, users, documents).
- Systems where the team has OO experience and the language supports OO idioms.
- Long-lived systems where the domain model is expected to evolve.

**Typical notations / tools:** UML class diagrams (static structure), sequence
diagrams (collaboration and interaction), state diagrams (object lifecycle),
CRC cards (responsibility brainstorming).

**Key strengths:**

- High cohesion when responsibilities are assigned well: each class does one
  thing.
- Encapsulation limits the surface area for change: a module's internals can
  change without affecting callers.
- Polymorphism supports the Open-Closed Principle: new behavior through new
  types, not modified code.

**Limitations / pitfalls:**

- Inheritance hierarchies can become rigid and fragile; prefer composition
  over inheritance unless a genuine is-a relationship exists.
- Overuse of OO structuring can make naturally functional or pipeline-style
  processing awkward.
- Without discipline (SOLID, GRASP), classes accumulate responsibilities and
  cohesion degrades.

**SOLID checklist (for OO designs):**

- **S**ingle Responsibility Principle — each class has one reason to change.
- **O**pen-Closed Principle — open for extension, closed for modification.
- **L**iskov Substitution Principle — subtypes are substitutable for their
  base types without altering program correctness.
- **I**nterface Segregation Principle — clients should not depend on methods
  they don't use; prefer narrow interfaces.
- **D**ependency Inversion Principle — depend on abstractions, not
  concretions; inject dependencies rather than constructing them.

---

### 3. User-Centered Design (UCD)

**Primary concepts:** Drive the design from user tasks, mental models, and
usability goals. The design is validated iteratively against real users.
Personas capture user types; task analysis deconstructs what users need to
accomplish; wireframes and prototypes test interaction before implementation.

**Best fit:**

- Systems where user experience is a primary quality driver and poor usability
  would make the product fail regardless of technical correctness.
- Consumer-facing applications, productivity tools, and any system where the
  user's mental model of the domain differs significantly from the
  implementation model.

**Typical notations / tools:** Personas, task flows, wireframes, paper
prototypes, usability test scripts and findings, journey maps.

**Key strengths:**

- Discovers requirements that are implicit in user behavior, not stated in
  documents.
- Reduces the cost of usability fixes by identifying them early.
- Creates shared vocabulary between product, design, and engineering teams.

**Limitations / pitfalls:**

- UCD addresses the user-facing layer; the downstream impact on technical
  design (data model, API surface, backend structure) must still be addressed
  explicitly using complementary strategies.
- Can be treated as a phase that ends at wireframes, leaving the connection
  to backend design un-made.
- User preferences are not always compatible with system constraints;
  resolution requires explicit negotiation.

---

### 4. Component-Based Design (CBD)

**Primary concepts:** Build systems by composing pre-built, independently
deployable components whose interactions are defined by interfaces (contracts).
Composition is preferred over inheritance. Components may be first-party,
third-party, or open-source. The design is essentially an integration
specification.

**Best fit:**

- Enterprise systems where many independent teams contribute components that
  must interoperate.
- Systems requiring replaceable parts — where one implementation of a component
  should be swappable for another without affecting the rest of the system.
- Microservices architectures fit here: each service is a component with a
  published interface (API contract).

**Typical notations / tools:** Component diagrams (UML), interface definition
languages (IDL, OpenAPI, Protobuf), dependency manifests, contract tests.

**Key strengths:**

- Encourages explicit interface design, which improves substitutability and
  testability.
- Reuse is a first-class concern; components can be shared across projects.
- Independent deployment of components reduces coordination overhead when
  components are owned by separate teams.

**Limitations / pitfalls:**

- Interface design is critical and hard to change once components are deployed
  and depended upon; versioning becomes a permanent engineering concern.
- Composing many components can introduce significant integration complexity
  (distributed tracing, contract compatibility, API versioning, deployment
  ordering).
- Component boundaries that are drawn incorrectly (too fine, too coarse, or
  misaligned with domain boundaries) are expensive to fix later.

---

### 5. Event-Driven Design

**Primary concepts:** System behavior is driven by events. Components (event
producers) emit events without knowing who will handle them. Other components
(consumers) subscribe to events and react. Communication is typically
asynchronous through a message bus or event queue. Loose coupling between
producer and consumer is the defining property.

**Best fit:**

- Reactive systems and real-time processing where responses to external stimuli
  must be immediate and concurrent.
- Systems with many independent actors or external triggers (IoT, financial
  trading, monitoring systems, workflow engines).
- Microservices where synchronous call chains would create tight temporal
  coupling.

**Typical notations / tools:** Event storming (collaborative modeling),
message flow diagrams, sequence diagrams showing asynchronous interactions,
consumer group and topic topology diagrams (for Kafka-style systems).

**Key concepts:**

- **Event sourcing** — the state of the system is derived from a log of events
  rather than stored directly; enables replay and audit.
- **CQRS (Command Query Responsibility Segregation)** — separate the write
  model (commands that change state) from the read model (queries that return
  state); pairs naturally with event sourcing.

**Key strengths:**

- Very low coupling between producers and consumers; either can evolve
  independently.
- Natural fit for parallelism and scalability: consumers can scale
  independently.
- Event logs provide an audit trail and support temporal decoupling.

**Limitations / pitfalls:**

- Complex to debug and trace: a symptom may be far removed in time and
  component-space from its cause.
- Eventual consistency is the default; any scenario requiring strong
  consistency requires explicit and costly design.
- Message ordering, exactly-once delivery, and idempotency must be
  addressed explicitly — they do not come for free.

---

### 6. Domain-Driven Design (DDD)

**Primary concepts:** Center the design on the problem domain. The code
should mirror the business model closely; the same vocabulary that
domain experts use should appear in the code. Key structural concepts:
bounded context (an explicit boundary within which a domain model is
consistent), aggregate (a cluster of entities and value objects treated as a
unit for data changes, with one aggregate root), entity (an object with a
distinct identity), value object (an object defined only by its attributes,
with no identity), domain event (a record of something that happened in the
domain), and anti-corruption layer (a translation boundary that protects a
bounded context from a foreign model).

**Best fit:**

- Complex domains with intricate business rules where the business logic is
  the primary source of value and complexity (finance, healthcare, insurance,
  logistics).
- Systems where misalignment between the code model and the business model is
  causing maintenance problems.
- Teams that can work closely with domain experts to develop a shared ubiquitous
  language.

**Typical notations / tools:** Context maps (showing bounded contexts and their
relationships), aggregate diagrams, event storming (for discovering domain
events and aggregates), ubiquitous language glossaries.

**Key strengths:**

- When done well, the code is comprehensible to domain experts, reducing the
  translation cost between business and engineering.
- Bounded contexts give teams explicit ownership boundaries and reduce
  coordination overhead.
- Aggregates enforce domain invariants at a well-defined boundary, reducing
  the risk of invalid state.

**Limitations / pitfalls:**

- Steep learning curve; DDD vocabulary (bounded context, aggregate,
  anti-corruption layer) is often misapplied by teams new to it.
- Significant over-engineering risk in simple domains; the full DDD toolkit
  is only justified by domain complexity.
- Identifying bounded context boundaries is a hard, collaborative process;
  getting them wrong is expensive to fix.

---

### 7. Aspect-Oriented Design (AOD)

**Primary concepts:** Separate cross-cutting concerns — those that affect many
modules (logging, security, transactions, caching, auditing) — from the core
logic. Cross-cutting behavior is encapsulated in _aspects_, which are woven
into the base code at defined _join points_ via _advice_ (before, after, or
around a method call). The base code knows nothing of the aspect.

**Best fit:**

- When the same concern (e.g., authorization, logging, retry) is scattered
  uniformly across many components and can be cleanly separated from the core
  logic without conditional logic in each component.
- Enterprise frameworks (Spring AOP, AspectJ) where AOP tooling is mature
  and understood.

**Typical notations / tools:** Aspect weaving diagrams, pointcut expressions,
AOP framework documentation.

**Key strengths:**

- Eliminates boilerplate: cross-cutting code lives in one place.
- Core modules are cleaner and focused on a single concern.
- Aspects can be switched on or off (e.g., for testing or profiling).

**Limitations / pitfalls:**

- Implicit behavior: the execution of advice is not visible at the call site,
  making the code harder to reason about for unfamiliar readers.
- Debugging is harder: stack traces cross aspect boundaries; the relationship
  between aspect and affected code is indirect.
- Execution order of multiple aspects applied to the same join point requires
  explicit management.
- Tooling-dependent: AOP is well-supported in some ecosystems (Java/Spring)
  and poorly supported in others.

---

### 8. Constraint-Based Design

**Primary concepts:** Drive design from explicit, formally stated constraints:
performance bounds, timing deadlines, memory limits, power budgets, safety
margins. Design choices are made by constraint propagation and optimization
rather than by decomposition into conceptual entities. The constraints are the
primary specification; the design is the solution to a constraint satisfaction
problem.

**Best fit:**

- Embedded systems and real-time systems where hard resource limits (CPU,
  memory, power) and timing deadlines (response time, interrupt latency) are
  inviolable.
- Scheduling problems and resource allocation systems.
- Safety-critical systems where safety requirements are expressed as
  constraints that the design must provably satisfy.

**Typical notations / tools:** Constraint graphs, timing diagrams, rate
monotonic analysis, formal specification languages (Z, TLA+), constraint
solvers (SMT solvers, scheduling tools).

**Key strengths:**

- Makes resource and timing requirements explicit and traceable.
- Supports formal analysis: constraints can be checked against the design
  before implementation.
- Forces early identification of infeasible requirements.

**Limitations / pitfalls:**

- Requires domain expertise in real-time systems analysis, formal methods, or
  constraint programming; not widely held in general software teams.
- Formal constraint specification can be time-consuming and requires tooling
  investment.
- Over-constraining the design limits the solution space unnecessarily; only
  hard constraints should be encoded as constraints.
