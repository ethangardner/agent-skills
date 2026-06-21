---
name: swebok-construction
description: >-
  Plan, execute, or review software construction using the minimizing-complexity
  and verification-during-construction discipline from SWEBOK V4 Chapter 4. Use
  this whenever the work involves coding standards, construction quality, or the
  mechanics of turning a design into verified, integrated code — e.g. "coding
  standards", "code review for construction quality", "Design by Contract",
  "DbC", "assertions in code", "error handling strategy", "exception handling
  design", "minimize complexity", "API design", "integration strategy",
  "build planning", "reuse in code", "construction planning", "coding
  guidelines", "code complexity", "technical debt in code", "naming
  conventions", "code organization". Trigger even when the user just says
  "how should I structure this function", "is this code too complex", or
  "review my error handling" — the discipline of controlling complexity during
  coding applies, not just at design time.
---

# Software Construction

Construction is the software engineering activity of transforming a detailed
design into executable code. It is neither mechanical translation nor purely
creative: it involves continuous micro-design decisions, and every decision
either adds or removes future complexity. The dominant construction quality
defect is not logical error — it is unnecessary complexity: control flow
branches that didn't need to exist, mutable state that didn't need to be
shared, dependencies that didn't need to be direct.

Three ideas drive everything below:

1. **The primary enemy of construction quality is complexity.** Minimize every
   control flow branch, every mutable shared state, every implicit dependency.
   Complexity that exists only because it was easy to write is technical debt.
   The key question for every construct is: "Can this be simpler without losing
   required capability?"
2. **Construction is continuous micro-design.** The design document specifies
   _what_ to build; construction is where the remaining design decisions
   actually get made. Variable names, function boundaries, error propagation
   strategies, abstraction choices — these are design decisions made during
   construction. They must be consistent with the larger design intent.
3. **Verification is cheapest during construction.** An assertion catches a
   programming error the moment it manifests. A unit test catches it the moment
   the function is written. A system test catches it after integration. Every
   defect is cheapest to fix at the moment of introduction.

## When NOT to over-apply this

A quick throwaway script doesn't need a formal construction plan. The
discipline earns its keep on code that others will read, modify, or rely on
for more than a sprint. State the scaling decision rather than silently
defaulting to maximal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Establish construction context

Identify the applicable coding standards, target languages and environments,
build system, dependency management approach, and the CI pipeline that will
verify the code. If these don't exist for the project, establish minimal
versions before writing substantive code.

The construction context constrains every subsequent decision. A language that
makes immutability easy changes the state management approach. A build system
with no incremental compilation changes the integration strategy. Know the
tools before planning the work.

### 2. Apply minimizing-complexity principles

Before and during coding: decompose functions so each does one thing; choose
names that make the code read like a specification; minimize state (prefer
immutable data and pure functions where possible); make dependencies explicit
(constructor injection, not global state); keep function length and nesting
depth bounded.

Complexity is not a single metric — it is a composite: cyclomatic complexity
(branches), coupling (inter-module dependencies), depth of nesting, and
cognitive load (the number of distinct things a reader must simultaneously
hold in mind). Attack all four.

### 3. Apply construction technologies

For non-trivial code: use assertions and Design by Contract (preconditions,
postconditions, invariants) to make assumptions explicit and catchable; design
error and exception handling as a first-class concern (what can fail, who
handles it, how errors propagate); design APIs with minimal surface, clear
semantics, and stable interfaces; use parameterization, generics, and templates
to eliminate duplication.

Reuse is a construction decision, not only an architecture decision. At the
construction level, reuse means: use existing libraries before writing
equivalent code; write new code at the appropriate abstraction level so it can
be reused; parameterize rather than duplicate. Each decision to duplicate rather
than parameterize is a future maintenance cost.

### 4. Plan and execute integration

Define the integration order (bottom-up, top-down, or feature-based); use
stubs and drivers as needed; configure CI to run tests on every merge; address
cross-platform concerns (encoding, path separators, timezone, floating-point
behavior) explicitly.

Integration order is a construction decision with significant quality
consequences. Bottom-up integration tests real components but requires a
harness to drive them. Top-down integration produces visible user-facing
behavior early but requires stubs. Feature-based integration (vertical slices)
reduces integration risk by delivering small working increments. State the
rationale for the chosen order.

### 5. Verify during construction

Write unit tests alongside or before code (TDD where appropriate); run static
analysis in the editor and CI; conduct peer code review at the pull-request
level (not post-hoc audit); address findings before merging, not "later."

The cost of defect correction rises sharply with time elapsed since
introduction. Verification during construction is not overhead — it is the
cheapest form of quality assurance available.

## Output format

Unless the user asks for something else, use this structure. Adapt depth to
the module's size and risk.

```
# Construction Plan: <Feature / Module>

## Context
- Language, runtime, and framework
- Coding standards applied (link or name)
- Build system and CI pipeline
- Dependency management approach

## Complexity management strategy
- Decomposition approach (how modules are divided)
- Naming conventions
- State management approach (immutability, explicit state containers)
- Dependency injection approach

## Construction technologies applied
| Concern | Approach | Rationale |
(assertions/DbC, error handling, API design, parameterization, reuse)

## Integration plan
- Integration order and rationale
- Stubs/drivers needed
- CI gate criteria

## Verification
- Unit test coverage target
- Static analysis tools and pass criteria
- Code review checklist (link or inline)
```

## Reviewing existing code for construction quality (instead of planning)

When the task is to critique or evaluate code rather than plan new
construction, apply this checklist against what exists:

1. Can you understand the intent of each function from its name and signature
   alone? If not, the naming is a construction defect.
2. Does each function do one thing? Is any function doing both computation and
   I/O without separation? Mixed concerns inflate coupling and reduce testability.
3. Is all shared mutable state justified? Could it be made immutable or local?
   Every instance of shared mutable state is a potential concurrency defect and
   a mandatory cognitive load for every future reader.
4. Are all errors handled explicitly — not swallowed, not leaked, not converted
   silently? Unhandled errors are latent defects.
5. Are assertions present for non-obvious preconditions and invariants? Their
   absence means assumptions that cannot be verified are being trusted silently.
6. Are there magic numbers, implicit assumptions, or non-obvious constants
   without explanatory names?
7. Are there circular dependencies between modules?
8. Is the code testable in isolation, or are dependencies baked in?

Lead the review with the highest-leverage finding, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Construction** — the software engineering activity that produces working,
  verified, integrated code from a design; includes coding, unit testing,
  integration, and code review.
- **Complexity (in code)** — the number of distinct things a reader must
  simultaneously understand to reason about the code correctly; the primary
  metric for construction quality.
- **Design by Contract (DbC)** — a technique where functions explicitly specify
  preconditions (what callers must ensure), postconditions (what the function
  guarantees), and invariants (what is always true).
- **Assertion** — a statement that a condition must be true at that point in
  execution; an executable specification of assumptions.
- **Coupling (in construction)** — the degree to which a code unit depends on
  other units; minimized by explicit dependency injection and stable interfaces.
- **Cohesion (in construction)** — the degree to which the code within a unit
  serves one purpose; maximized by single-responsibility decomposition.
- **Integration** — the activity of combining separately constructed units into
  a working composite system.
- **Stub** — a simplified replacement for a dependency used during integration,
  providing controlled, predictable responses without the real component.
- **Driver** — a test harness that calls the unit under test, used in bottom-up
  integration when the calling layer does not yet exist.
