---
name: swebok-math-foundations
description: >-
  Apply mathematical reasoning to software engineering problems using the
  discipline from SWEBOK V4 Chapter 17. Use this whenever the work involves
  formal proof, mathematical modeling, or precise specification — e.g. "prove
  this property", "formal proof", "mathematical induction", "proof by
  contradiction", "propositional logic", "predicate logic", "set theory",
  "graph algorithm", "tree data structure mathematically", "discrete
  probability", "combinatorics", "permutations and combinations", "finite state
  machine", "FSM", "regular grammar", "context-free grammar", "BNF", "Chomsky
  hierarchy", "algebraic structure", "group theory in software", "numerical
  error", "floating point precision", "mathematical foundations", "formal
  reasoning", "invariant proof", "loop invariant". Trigger even when the user
  just says "is this correct for all inputs" or "prove this terminates" — the
  discipline of selecting the right mathematical structure and proof technique
  applies, not just an informal argument.
---

# Mathematical Foundations

Mathematical foundations give software engineers the tools to reason precisely
about programs, protocols, and systems. Where natural language is ambiguous and
testing is finite, mathematics establishes properties for all cases within
stated assumptions. The knowledge area covers logic, set and graph theory,
discrete probability, formal grammars, algebraic structures, proof techniques,
and numerical methods.

Three ideas drive everything below:

1. **Mathematics is the language of precision.** Natural language is
   ambiguous; mathematical notation is not. When a requirement, invariant, or
   protocol property must be unambiguous, mathematics — logic, set theory,
   formal grammars — is the only tool that achieves it. "The system should be
   fast" is not a requirement; "response time ≤ 200ms at the 99th percentile
   under 1000 concurrent users" is. Imprecise specification produces imprecise
   software; there is no shortcut through notation.

2. **Proof is the only way to establish correctness without testing every
   case.** Testing shows presence of defects in tested cases; proof establishes
   correctness for all cases within the stated assumptions. For safety-critical
   properties — no deadlock, no data race, correct cryptographic protocol —
   informal argument is not sufficient. Each proof technique applies to a
   specific problem class: know which one to reach for before you start.

3. **Discrete mathematics is the mathematics of computation.** Computers are
   discrete, finite, deterministic machines. Graphs model networks and
   dependencies; state machines model protocols and parsers; combinatorics
   governs algorithm complexity; probability governs reliability calculations.
   These are not theoretical extras — they are the tools for reasoning about
   what programs actually do at scale and under uncertainty.

## When NOT to over-apply this

For routine business logic with well-understood requirements, informal reasoning
and tests are sufficient. Reserve formal proof and mathematical modeling for
properties where exhaustive testing is impossible (all inputs), safety or
security is at stake, or ambiguity in an informal argument has already produced
a defect.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Identify the mathematical structure needed

Determine what kind of reasoning the problem requires before selecting any
technique:

- **Logic** — for preconditions, postconditions, invariants, protocol
  correctness, and any property that must hold for all program states.
- **Set theory and relations** — for type systems, data models, access control
  policies, and any relationship between collections of objects.
- **Graph theory** — for dependency analysis, network topology, reachability,
  shortest paths, cycle detection, and scheduling.
- **Formal grammars and finite-state machines** — for language definition,
  parser design, protocol modeling, and lexer specification.
- **Discrete probability** — for reliability models, expected complexity,
  randomized algorithm analysis, and fault probability estimation.
- **Combinatorics** — for counting states, worst-case complexity bounds, test
  input space characterization.
- **Numerical methods** — for floating-point arithmetic, error bounds,
  convergence, and any computation that involves real-valued approximation.

Do not select a technique before identifying the structure. Applying induction
to a problem that requires a graph argument, or propositional logic to a
problem that requires quantifiers, wastes time and produces incorrect results.

### 2. Define the mathematical objects precisely

State the sets, relations, functions, graphs, automata, or algebraic structures
involved. Use standard notation. Specify:

- The domain and codomain of every function.
- Whether relations are reflexive, symmetric, transitive, total, or partial.
- Whether graphs are directed, weighted, cyclic, or multigraphs.
- The alphabet, states, transitions, initial state, and accepting states for
  any FSM.
- The grammar rules in BNF or extended BNF for any language definition.

Imprecise object definition is the most common source of proof errors. A
"graph" without specifying whether cycles are permitted is not a precise object.

### 3. State the property to be proved or analyzed

Formulate the property precisely:

- As a logical formula using quantifiers and connectives.
- As a graph property (acyclicity, connectivity, minimum spanning tree, etc.).
- As a language membership or recognition property (L(G) = ...).
- As a probability bound (P(event) ≤ ε).
- As a numerical error bound (|computed − exact| ≤ δ).

State what the property means in the engineering context before proving it.
A proof of a precisely stated but wrongly chosen property is useless.

### 4. Select and apply the proof technique or analysis method

Choose based on the problem structure:

- **Direct proof** — derive the conclusion from premises using valid inference
  steps. Use when the logical path from hypothesis to conclusion is
  constructive.
- **Proof by contradiction** — assume the negation and derive a contradiction.
  Use when the negation is easier to work with than the positive statement.
- **Proof by induction** — establish a base case and an inductive step. Use
  for properties over natural numbers, lists, trees, or recursive structures.
  Mathematical induction: prove P(0), then ∀k. P(k) → P(k+1).
- **Proof by counterexample** — exhibit a single case that refutes a universal
  claim. Use to disprove, not to prove.
- **Graph algorithms** — apply BFS/DFS for reachability, topological sort for
  DAG ordering, Dijkstra/Bellman-Ford for shortest paths, union-find for
  connected components.
- **Combinatorial analysis** — apply permutations Pr(n,r) = n!/(n−r)! and
  combinations Cr(n,r) = n!/[r!(n−r)!] to count states and bound complexity.
- **Probability calculation** — apply discrete probability functions, expected
  value, and independence assumptions to compute reliability or error bounds.
- **FSM construction** — build the state table (current state / input / output
  / next state) and analyze reachability, acceptance, and equivalence.

Show each inference step. An argument that skips steps is not a proof; it is a
conjecture with a plausibility argument.

### 5. Interpret results in the engineering context

Translate the mathematical result back into a statement about the software:

- What does "this predicate is a loop invariant" mean for program correctness?
- What does "this graph is a DAG" mean for the build system?
- What does "P(failure within 1000 hours) ≤ 0.001" mean for the deployment
  decision?
- What does "this grammar is context-free" mean for parser complexity?

State the conditions under which the result holds and what would invalidate it.
A proof is only as strong as its assumptions.

## Output format

Unless the user asks for something else, use this structure.

```
# Mathematical Analysis: <property / system>

## 1. Mathematical structure
- Objects: <sets, graphs, functions, automata, etc.>
- Relations and operations
- Assumptions / domain constraints

## 2. Property to establish
- Formal statement: <logical formula / graph property / probability bound>
- Why this property matters for the software

## 3. Proof / analysis
<proof steps or calculation, each step labeled and justified>

## 4. Engineering interpretation
- What the result means for the system
- Conditions under which the result holds
- What would change the result
```

## Reviewing an existing proof or formal model (checklist mode)

When the task is to evaluate an existing proof or formal argument rather than
author one, run the workflow as a checklist:

1. Is the mathematical structure identified explicitly — or is the argument
   mixing structures informally?
2. Are all objects defined with sufficient precision (domains, ranges,
   constraints)?
3. Is the property to be established stated as a formal claim, not a vague
   assertion?
4. Is the proof technique appropriate for the structure and property?
5. Does each inference step follow from the previous by valid rules — or are
   there leaps that substitute intuition for proof?
6. Is the base case established for any inductive argument?
7. Are the engineering assumptions (input domain, concurrency model, arithmetic
   model) explicit, so the proof's scope is clear?
8. Does the conclusion actually follow from what was proved, or has the claim
   silently shifted?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Proposition** — a statement that is either true or false; the atomic unit
  of propositional logic.
- **Predicate** — a proposition parameterized by variables; the atomic unit of
  predicate (first-order) logic.
- **Universal quantifier (∀)** — "for all"; asserts that a predicate holds for
  every element of a domain.
- **Existential quantifier (∃)** — "there exists"; asserts that a predicate
  holds for at least one element.
- **Set / relation / function** — a collection of elements; a set of ordered
  pairs; a relation where each input maps to exactly one output.
- **Injective / surjective / bijective** — one-to-one; onto; both. Determines
  whether a function has an inverse.
- **Graph / tree / DAG** — a set of vertices and edges; a connected acyclic
  graph; a directed acyclic graph. Each has distinct algorithmic properties.
- **Finite-state machine (FSM)** — a 5-tuple (Q, Σ, δ, q₀, F): states,
  alphabet, transition function, initial state, accepting states.
- **Regular grammar** — Chomsky Type 3; recognized by FSMs; closed under union,
  concatenation, and Kleene star.
- **Context-free grammar (CFG)** — Chomsky Type 2; recognized by pushdown
  automata; the grammar class for most programming language syntax.
- **BNF (Backus-Naur Form)** — notation for specifying CFG rules: <symbol>
  ::= production | alternative.
- **Chomsky hierarchy** — Type 0 (unrestricted), Type 1 (context-sensitive),
  Type 2 (context-free), Type 3 (regular). Each class is strictly contained in
  the one above.
- **Permutation** — an ordered selection: Pr(n,r) = n!/(n−r)!
- **Combination** — an unordered selection: Cr(n,r) = n!/[r!(n−r)!]
- **Numerical precision vs. accuracy** — precision is the number of
  significant digits representable; accuracy is closeness to the true value.
  High-precision arithmetic can still be inaccurate if the algorithm amplifies
  rounding error.
- **Loop invariant** — a predicate that holds before and after every iteration
  of a loop; used to prove partial correctness.
- **Mathematical induction** — proof technique for universally quantified
  statements over naturals: base case P(0) plus inductive step ∀k. P(k) →
  P(k+1) yields ∀n. P(n).
