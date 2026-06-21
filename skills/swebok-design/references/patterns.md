# Design Pattern Catalog

A design pattern is a named, reusable solution to a recurring design problem
in a specific context. It is not a finished design — it is a template that
must be adapted to the forces of your particular situation. Apply a pattern
because it resolves a specific set of forces, not because the name sounds
right.

For each pattern: **use when** is a concrete description of the forces that
make the pattern applicable. **Limitation** is what you pay.

---

## Creational Patterns

_(when object creation is the concern)_

These patterns decouple the code that uses objects from the code that creates
them. Reach for them when the type of object to create is variable, when
construction is complex, or when the lifetime and ownership of instances
need to be controlled.

- **Factory Method** — use when the type of object to create varies and should
  be determined by subclasses or configuration rather than by the caller.
  Limitation: introduces an extra layer of indirection; can proliferate
  subclasses.

- **Abstract Factory** — use when you need to create families of related
  objects that must be used together and the concrete types must be
  interchangeable as a group (e.g., a UI theme: button + dialog + scroll bar).
  Limitation: adding a new product type to the family requires changing the
  factory interface and every concrete factory.

- **Builder** — use when constructing a complex object requires many steps,
  has many optional configurations, or when the same construction process must
  produce different representations. Limitation: adds a Builder class for every
  complex object; overkill for simple construction.

- **Singleton** — use with caution when exactly one instance is required and
  shared across the system (e.g., a registry, a thread pool). Often a code
  smell indicating shared mutable state; prefer dependency injection so the
  single instance is injected rather than globally fetched. Limitation:
  introduces global state, makes testing difficult, and couples all consumers
  to the concrete type.

- **Prototype** — use when creating new objects by cloning existing ones is
  cheaper than instantiation from scratch, or when the classes to instantiate
  are specified at runtime. Limitation: cloning objects with circular
  references or complex internal state is error-prone.

---

## Structural Patterns

_(when composition and relationships between components are the concern)_

These patterns define how objects and modules are assembled into larger
structures. Use them when an interface mismatch, a layering concern, or the
need to add or proxy behavior drives the composition choice.

- **Adapter** — use when integrating components with incompatible interfaces
  that cannot be changed. The adapter wraps one interface to look like another
  so the rest of the system does not need to know the original interface exists.
  Limitation: can multiply adapters if many incompatible systems are integrated;
  hides the seam, which can make debugging harder.

- **Bridge** — use when you want to separate an abstraction from its
  implementation so that both can vary independently. Classic signal: you have
  an inheritance hierarchy that mixes abstraction variation with implementation
  variation. Limitation: introduces additional indirection; adds complexity for
  simple cases.

- **Composite** — use when clients need to treat individual objects and
  compositions of objects uniformly, typically for tree structures (file
  systems, UI hierarchies, organizational charts). Limitation: makes it harder
  to restrict which components can be children; type-checking at runtime may
  be needed.

- **Decorator** — use when you need to add behavior to individual objects at
  runtime without subclassing, and when extension through inheritance would
  produce a combinatorial explosion of subclasses. Limitation: produces many
  small objects; the order of decorators matters and may be non-obvious.

- **Facade** — use when simplifying a complex subsystem behind a single entry
  point for clients that don't need the full complexity. The facade does not
  prevent access to the subsystem; it provides a convenient default interface.
  Limitation: can become a "god object" if it accumulates too much
  responsibility; does not reduce coupling, only hides it.

- **Proxy** — use when controlling access to an object: caching (virtual
  proxy), lazy initialization (virtual proxy), authorization (protection
  proxy), or remote access (remote proxy). The proxy and the subject share
  an interface. Limitation: introduces indirection; can hide latency or
  failure modes from the caller.

---

## Behavioral Patterns

_(when algorithms and responsibility assignment between objects are the concern)_

These patterns define how objects communicate and assign responsibility. Use
them when the problem is about who does what, when, and how objects
collaborate across a sequence of operations.

- **Strategy** — use when an algorithm needs to be selected at runtime from a
  family of interchangeable algorithms, or when you want to eliminate
  conditionals that select behavior. Each algorithm is encapsulated behind a
  common interface. Limitation: clients must be aware of the different
  strategies in order to select one; overhead for simple cases.

- **Observer / Event Bus** — use when changes in one object (the subject /
  publisher) need to notify an open-ended set of dependents (observers /
  subscribers) without tight coupling; the publisher does not know its
  subscribers. Limitation: unexpected updates and update cascades can occur;
  subscribers must be unregistered to avoid memory leaks; debugging event
  chains is hard.

- **Command** — use when operations need to be queued, logged, undone,
  re-executed, or composed into macros. Encapsulates a request as an object.
  Limitation: can produce a large number of small Command classes; undo
  support requires storing sufficient state.

- **Template Method** — use when an algorithm's skeleton is fixed but
  individual steps should be overridable by subclasses. Defines the invariant
  part of the algorithm in a base class and defers the variant steps.
  Limitation: requires inheritance; the base class can become a bottleneck
  for change as the number of subclasses grows.

- **State** — use when an object's behavior depends on its internal state and
  transitions between states at runtime. Replaces large conditionals
  (if/switch on a state field) with per-state objects. Limitation: can
  increase the number of classes significantly; state transitions must be
  managed carefully to avoid invalid states.

- **Chain of Responsibility** — use when a request should be handled by one
  of several handlers in a sequence determined at runtime, and the sender
  should not be coupled to the specific handler. Limitation: no guarantee that
  the request will be handled; debugging which handler acted is harder.

- **Iterator** — use when providing sequential access to elements of a
  collection without exposing its underlying structure (array, tree, hash).
  Limitation: iterators can become stale if the underlying collection is
  modified during iteration; multiple simultaneous iterators over a mutable
  collection require care.

---

## Architectural / System-Level Patterns

_(when the structure of a whole system or subsystem is the concern)_

These patterns operate at a larger grain than object-level patterns. They
determine the fundamental topology of a subsystem or system and are harder
to reverse once established.

- **Layered / N-tier** — use when you need to separate concerns into
  horizontal layers (presentation, business logic, data access) so that changes
  in one layer do not propagate to non-adjacent layers. Each layer depends only
  on the layer immediately below it. Limitation: strict layering can require
  pass-through code; performance overhead from traversing layers; can become
  an excuse for putting everything in a "service layer."

- **MVC (Model-View-Controller)** — use when separating data (model),
  presentation (view), and user interaction handling (controller) in
  UI-intensive systems. The model knows nothing of the view; the controller
  mediates. Limitation: definition of "controller" varies widely across
  frameworks; can degenerate into a thin veneer over a fat model if discipline
  is not maintained.

- **MVVM (Model-View-ViewModel)** — use in data-binding frameworks (WPF,
  Angular, Vue) where the ViewModel exposes data streams the view binds to
  declaratively. The ViewModel holds no reference to the view.
  Limitation: data binding can be hard to debug; overkill for simple UIs;
  ViewModel can accumulate logic that belongs in the model.

- **Microkernel / Plug-in** — use when a core system needs to be extended
  through independently developed and deployed plug-in components without
  modifying the core. The core provides a minimal stable API; plug-ins
  register against it. Limitation: plug-in API design is critical and hard to
  change once plug-ins exist; versioning and compatibility are permanent
  concerns.

- **Event-Driven / Message Bus** — use when components need to communicate
  asynchronously with loose coupling, particularly for reactive systems,
  microservices, and systems with many concurrent actors or external triggers.
  Components publish events; others subscribe. Limitation: complex to debug
  and trace; eventual consistency must be explicitly handled; message ordering
  and delivery guarantees require careful design.

- **Pipeline / Filter** — use when data needs to flow through a sequence of
  processing stages where each stage has a single, composable responsibility
  (read, transform, validate, enrich, write). Each filter is independent and
  reusable. Limitation: shared data formats between filters create coupling;
  error handling across stages must be explicit; not suited to request-response
  interaction styles.

- **Repository** — use when abstracting data access behind a collection-like
  interface so that domain logic is decoupled from persistence technology.
  The repository exposes domain object operations (find, add, remove); the
  domain does not know about SQL, ORMs, or document stores. Limitation:
  complex queries can be hard to express cleanly through a repository
  interface; lazy loading and unit-of-work semantics must be designed
  explicitly.
