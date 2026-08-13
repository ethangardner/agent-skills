---
name: swebok-models-and-methods
description: >-
  Produce or review a software model using the modeling discipline from SWEBOK
  V4 Chapter 11. Use this whenever the work involves creating, evaluating, or
  transforming a model of a system or component — e.g. "UML model", "create a
  model", "structural model", "behavioral model", "state machine", "sequence
  diagram", "class diagram", "dataflow diagram", "formal methods", "model
  analysis", "preconditions and postconditions", "invariants", "model
  checking", "BNF grammar", "domain model", "entity relationship model",
  "model-driven development", "MDD", "FDD", "software model", "abstraction
  model", "systems model", "simulation model", "activity diagram", "component
  diagram", "ER model", "finite state machine", "FSM", "formal specification",
  "Z notation", "Alloy model", "feature-driven development", "syntax and
  semantics". Trigger even when the user just says "how should I model this"
  or "what diagram do I need" — the discipline of matching model type and
  notation to a specific question about the system applies, not just drawing a
  diagram.
---

# Software Engineering Models and Methods

A model is a deliberate simplification of a system made for a specific purpose.
Software engineering models span the full development lifecycle: from domain
models that capture requirements to structural models that define architecture,
behavioral models that specify dynamics, and formal models that support
mechanical verification. The model type, notation, and level of formality must
be chosen to fit the question being answered, not applied uniformly by habit.

Three ideas drive everything below:

1. **A model is a simplification of reality made for a purpose.** Every model
   omits things; the question is whether it omits the right things for its
   intended use. A model that tries to capture everything is not a model, it is
   a replica. State explicitly what each model includes and what it deliberately
   omits — undeclared omissions become hidden assumptions that mislead readers
   and cause downstream defects.

2. **Syntax, semantics, and pragmatics are all required for a model to
   communicate.** Syntax (what is written), semantics (what it means), and
   pragmatics (how it is used in context) must all be defined for a model to be
   unambiguous. Informal diagrams without semantic definitions look precise but
   are not. A box-and-arrow diagram whose arrows are unlabeled and undefined is
   decorative, not analytical.

3. **Models must be analyzed, not just drawn.** A model that is never checked
   against reality — simulated, formally analyzed, checked for consistency, or
   transformed into executable code — is decoration. The value of a model is
   in the reasoning it enables, not the artifact it produces. Trace scenarios,
   check invariants, and state what the model proves and what it does not.

## When NOT to over-apply this

For a simple two-class relationship or a single interaction you can describe in
a sentence, a sketch and a plain-language explanation outperform a formal model.
Apply the full discipline — notation selection, semantic definition, constraint
specification, analysis — when the system is complex enough that informal
description is ambiguous or when stakeholders need a shared, unambiguous
reference.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Establish modeling purpose and scope

Before choosing a notation or drawing anything, answer:

- What question does this model answer? (What behavior does it specify? What
  structure does it make explicit? What property does it prove?)
- Who is the audience — developers, domain experts, formal analysis tools,
  code generators?
- What is deliberately omitted and why? State this explicitly. Undeclared
  omissions are hidden assumptions.
- What level of formality is required — informal sketch, semi-formal UML,
  formal specification (Z, Alloy, TLA+)?

Purpose drives every subsequent choice. A model built to communicate intent to
domain experts needs different notation and detail than a model built to feed a
model checker.

### 2. Select model type

Choose structural modeling, behavioral modeling, or both based on the question
being answered:

- **Structural models** capture static relationships: classes, components,
  entities, interfaces, and their associations. Use when the question is "what
  are the parts and how do they relate?" Notations: UML class diagram, component
  diagram, ER model, package diagram.
- **Behavioral models** capture dynamics: how the system responds to events,
  the order of interactions, and state-dependent behavior. Use when the question
  is "what does the system do and in what order?" Notations: state machine
  (FSM/statechart), sequence diagram, activity diagram, dataflow diagram (DFD).
- **Formal models** use mathematically defined notations to enable mechanical
  analysis. Use when correctness is critical or when informal models leave
  ambiguity that informal review cannot resolve. Notations: Z, Alloy, TLA+,
  BNF grammars, pre/post specifications.

Do not default to a notation because it is familiar. Pick the type that exposes
the aspect of the system the question is about.

### 3. Define syntax and semantics

Specify what each symbol in the model means:

- For UML: state which UML subset is in use and whether any extensions or
  stereotypes are applied.
- For state machines: enumerate states, events, guards, and actions; define
  whether the model is Mealy or Moore.
- For formal notations (BNF, Z, Alloy): define every schema, type, and relation
  before use.
- For dataflow: define what each process, flow, and store represents and what
  data values they carry.

An unlabeled or undefined element in a model is an ambiguity waiting to become
a defect. If you cannot define what a symbol means, remove it.

### 4. Specify constraints

Make behavioral contracts explicit. For every significant operation or
state transition:

- **Preconditions** — what must hold before the operation executes. Violations
  are caller errors.
- **Postconditions** — what the operation guarantees when it completes under a
  satisfied precondition.
- **Invariants** — conditions that must hold in every stable state of the
  system; true before and after every operation.

Invariants are the most valuable constraints: they express the fundamental
integrity properties of the model and are the first thing to check when
something goes wrong.

### 5. Analyze the model

A model that is never analyzed is a draft, not an engineering artifact. Apply
at least one of:

- **Scenario tracing** — walk a concrete scenario through the model and verify
  it behaves as expected. Find scenarios that break the model.
- **Consistency checking** — verify that structural and behavioral models agree
  (e.g., that a sequence diagram only calls operations that exist in the class
  diagram).
- **Simulation** — execute the model to observe emergent behavior before
  implementing the system.
- **Formal analysis / model checking** — use a tool (Alloy Analyzer, TLA+
  model checker, NuSMV) to exhaustively verify properties against the state
  space.
- **Model transformation** — generate code, tests, or configuration from the
  model; transformation errors reveal model gaps.

State what was analyzed, what was found, and what the model's known limitations
are. A model with undeclared limitations misleads everyone who reads it.

## Output format

Unless the user asks for something else, use this structure. Adapt depth to
model complexity and formality requirements.

```
# Model Description: <system / component>

## 1. Purpose and scope
- Question this model answers
- What is deliberately omitted and why
- Audience
- Formality level (informal / semi-formal / formal)

## 2. Model type and notation
- Structural / behavioral / formal / combined
- Notation chosen and why (UML subset, FSM variant, BNF, Z, Alloy, etc.)

## 3. The model
<diagram, formal specification, or structured textual description>

## 4. Constraints
- Preconditions: <conditions that must hold before operations>
- Postconditions: <guaranteed outcomes after operations>
- Invariants: <conditions always true in every stable state>

## 5. Analysis results
- Scenarios traced and outcomes
- Consistency checks performed
- Formal properties verified (if applicable)
- Known limitations of this model
```

## Reviewing an existing model (checklist mode)

When the task is to critique or evaluate a model rather than author one, run
the workflow as a checklist against what exists:

1. Is the modeling purpose stated? Does the model's content match the stated
   purpose, or does it contain elements that serve no declared question?
2. Are omissions declared, or does the model silently exclude important aspects
   of the system?
3. Are syntax and semantics defined? Are there unlabeled elements, undefined
   arrows, or undefined states?
4. Are structural and behavioral models consistent with each other — do
   sequence diagrams call only operations that the class diagram defines?
5. Are preconditions, postconditions, and invariants specified for significant
   operations and states?
6. Has the model been analyzed — traced, simulated, or formally checked — or is
   it an unvalidated draft?
7. Is the level of formality appropriate for the stakes? Is a safety-critical
   state machine described informally when a formal model and model-checking
   would be warranted?
8. Are known limitations of the model declared?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Model** — a deliberate simplification of a system or phenomenon, created
  to answer a specific question. Every model has a purpose and a scope; elements
  outside the scope are intentionally omitted.
- **Structural model** — a model capturing static relationships between system
  elements (classes, components, entities). Answers "what are the parts and
  how do they relate?"
- **Behavioral model** — a model capturing dynamic behavior: state transitions,
  event responses, interaction sequences, or dataflow. Answers "what does the
  system do and in what order?"
- **Syntax** — the rules governing what combinations of symbols are
  well-formed in a notation.
- **Semantics** — the meaning assigned to each well-formed construct; what
  the syntax represents.
- **Pragmatics** — how a model or notation is used in a specific engineering
  context, by a specific audience, for a specific purpose.
- **Precondition** — a condition that must hold before an operation executes;
  its violation is a caller error, not an implementation error.
- **Postcondition** — a condition the operation guarantees to hold after it
  completes, given a satisfied precondition.
- **Invariant** — a condition that must hold in every stable state of the
  system; checked before and after every operation.
- **State machine (FSM)** — a behavioral model consisting of states, events,
  guards, and transitions. Mealy machines produce output on transitions; Moore
  machines produce output in states.
- **Model checking** — automated exhaustive verification of a formal model
  against a temporal-logic property; finds counterexamples if the property
  is violated.
- **BNF (Backus-Naur Form)** — a formal notation for defining the syntax of
  programming languages and protocols using production rules.
- **FDD (Feature-Driven Development)** — an iterative development method
  organized around a feature list derived from a domain object model, with
  short feature delivery cycles.
- **Model transformation** — the process of converting one model into another
  (e.g., a UML model into generated code), enabling verification of model
  completeness through the transformation output.
