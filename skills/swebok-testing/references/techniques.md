# Test Technique Catalog

A technique determines how test cases are derived — from the code's internal
structure, from specifications, or from tester experience. The choice of
technique determines which defect classes the resulting test cases can find.
No technique finds everything; every strategy requires a mix.

Use this catalog when executing Step 3 of the workflow: match each risk area to
the technique(s) whose coverage model exposes the defect class you are
targeting.

---

## Family 1: Structural (White-Box) Techniques

These techniques derive test cases from the internal structure of the code.
Coverage is measured against code artifacts. They require access to the
implementation. They find defects in logic that is present; they cannot find
defects caused by missing logic (missing requirements) — for that, use
black-box techniques.

### Statement coverage

Execute every statement at least once.

| Attribute        | Detail                                                                               |
| ---------------- | ------------------------------------------------------------------------------------ |
| Use when         | Establishing a minimum baseline; auditing whether any code is completely untested    |
| Test level       | Unit                                                                                 |
| Coverage metric  | Statements executed / total statements (%)                                           |
| Defects found    | Dead code; statements that crash on any execution                                    |
| Limitation       | Does not distinguish branch outcomes; a single path through an if/else satisfies it; |
|                  | weak at catching logic errors in branching conditions                                |
| Tooling examples | JaCoCo (Java), coverage.py (Python), Istanbul/c8 (JS/TS), gcov (C/C++)               |

### Branch / decision coverage

Exercise every branch (true and false) of every decision at least once.

| Attribute        | Detail                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------- |
| Use when         | Standard minimum for unit testing; required by many quality standards                  |
| Test level       | Unit; sometimes integration                                                            |
| Coverage metric  | Branches executed / total branches (%)                                                 |
| Defects found    | Logic errors in conditionals; code executed only on one side of a branch               |
| Limitation       | Does not cover combinations of conditions within a compound decision                   |
| Tooling examples | Same as statement coverage tools above; branch coverage is typically a separate metric |

### Condition coverage

Each atomic condition within a compound decision takes each possible Boolean
outcome (true and false) at least once. Several variants exist:

- **Simple condition coverage** — each condition true and false at least once,
  independent of decision outcome.
- **Condition/decision coverage** — satisfies both branch coverage and simple
  condition coverage simultaneously.
- **Modified condition/decision coverage (MC/DC)** — each condition independently
  affects the decision outcome. Required by DO-178C Level A (avionics) and
  referenced in IEC 61508 / ISO 26262 for safety-critical software.

| Attribute        | Detail                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Use when         | Complex compound conditions; safety-critical systems requiring MC/DC                           |
| Test level       | Unit                                                                                           |
| Coverage metric  | Condition pairs covered / total condition pairs (%; MC/DC requires n+1 tests for n conditions) |
| Defects found    | Masking faults where one condition hides the effect of another in a compound expression        |
| Limitation       | MC/DC test suite size grows with number of conditions; not needed when conditions are simple   |
| Tooling examples | LDRA, VectorCAST, Cantata (safety-critical toolchains); some coverage.py plugins               |

### Data-flow coverage

Exercise paths from every point where a variable is defined (written) to every
point where that definition is used (read), and paths where a definition is
killed before being used.

| Attribute        | Detail                                                                           |
| ---------------- | -------------------------------------------------------------------------------- |
| Use when         | Complex data transformations; after branch coverage, for additional rigor        |
| Test level       | Unit                                                                             |
| Coverage metric  | def-use pairs covered / total def-use pairs (%)                                  |
| Defects found    | Variables used before initialization; values overwritten before use; stale reads |
| Limitation       | Expensive to compute in programs with many variables; tooling less common        |
| Tooling examples | Some static analysis tools expose def-use; research tools (Daikon)               |

### Mutation testing

Introduce small, systematic artificial faults (mutants) into the code —
changing a `+` to `-`, a `>` to `>=`, a `true` to `false`, etc. Run the test
suite against each mutant. A test suite "kills" a mutant if at least one test
fails on the mutated code. The mutation score is the primary coverage metric.

| Attribute        | Detail                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| Use when         | Assessing test suite effectiveness; validating that existing tests are sensitive to real faults |
| Test level       | Unit (most practical); can be applied at integration level                                      |
| Coverage metric  | Mutation score = mutants killed / total mutants generated (%; target typically > 80%)           |
| Defects found    | Weak assertions; tests that pass regardless of what the code does; untested logic branches      |
| Limitation       | Computationally expensive on large codebases; equivalent mutants (syntactically different code  |
|                  | with identical semantics) inflate denominator and require manual review                         |
| Tooling examples | PIT/Pitest (Java), Mutmut (Python), Stryker (JS/TS/C#), mutagen (Go)                            |

---

## Family 2: Behavioral (Black-Box) Techniques

These techniques derive test cases from specifications, requirements, or
observable behavior — with no knowledge of the internal structure. They find
defects caused by missing or incorrect requirements handling, including defects
that structural techniques cannot find (logic that is absent from the code
entirely).

### Equivalence partitioning

Partition the input domain into classes where the system is expected to behave
identically. Test one representative value from each class. Apply to both valid
and invalid (rejected) partitions.

| Attribute       | Detail                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------- |
| Use when        | Any input domain with clear valid/invalid regions; reducing the number of test cases      |
| Test level      | Unit, integration, system                                                                 |
| Coverage metric | Partitions covered / total identified partitions                                          |
| Defects found   | Missing validation; incorrect handling of an entire input class                           |
| Limitation      | Partitions must be correctly identified from the spec; missed partitions → missed defects |

### Boundary value analysis

Test at and immediately around the edges of equivalence partitions, where
defects cluster. For a range [min, max], test: min-1, min, min+1, max-1, max,
max+1.

| Attribute       | Detail                                                                              |
| --------------- | ----------------------------------------------------------------------------------- |
| Use when        | Any numeric, date, string-length, or ordered input; always combine with equivalence |
|                 | partitioning                                                                        |
| Test level      | Unit, integration, system                                                           |
| Coverage metric | Boundary points covered / total boundary points                                     |
| Defects found   | Off-by-one errors; fence-post errors; incorrect comparison operators (< vs <=)      |
| Limitation      | Does not cover internal logic errors unrelated to boundary conditions               |

### Decision table testing

Model complex business rules as a table of condition combinations and their
expected actions. Each column is a rule (combination of condition values →
action). Derive one test case per rule.

| Attribute       | Detail                                                                                  |
| --------------- | --------------------------------------------------------------------------------------- |
| Use when        | Complex multi-condition business logic; pricing rules; eligibility calculations;        |
|                 | authorization logic with multiple factors                                               |
| Test level      | Unit, system                                                                            |
| Coverage metric | Rules covered / total rules in table                                                    |
| Defects found   | Missing rules; incorrect actions for specific condition combinations; conflicting rules |
| Limitation      | Tables grow exponentially with conditions; use only when combinations are meaningful    |

### State transition testing

Model the system's behavior as a finite state machine: states, events that
trigger transitions, guards, and actions on transition. Derive tests for valid
transitions, invalid transitions (events in wrong state), and state sequences.

| Attribute       | Detail                                                                                |
| --------------- | ------------------------------------------------------------------------------------- |
| Use when        | Systems with explicit state (session management, protocol implementation, UI flows,   |
|                 | order lifecycle, device control)                                                      |
| Test level      | Unit (state machine per class), integration, system                                   |
| Coverage metric | States visited, transitions exercised, invalid transitions attempted                  |
| Defects found   | Missing transitions; incorrect state on event; actions executed in wrong state;       |
|                 | state machine reachability errors                                                     |
| Limitation      | Requires the state model to be correctly extracted from the spec; state explosion for |
|                 | concurrent systems                                                                    |

### Use case / scenario testing

Derive tests from end-to-end user scenarios or use cases, exercising the
system through complete flows as a user would experience them.

| Attribute       | Detail                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------- |
| Use when        | Validating end-to-end behavior; acceptance and system testing; checking that              |
|                 | individually correct components work together for real user goals                         |
| Test level      | System, acceptance                                                                        |
| Coverage metric | Use cases / scenarios covered; flow variants (main, alternate, exception flows) exercised |
| Defects found   | Integration defects that only appear in full workflows; missing end-to-end behavior;      |
|                 | mismatches between what individual components do and what users need                      |
| Limitation      | Scenario-level tests are expensive; do not substitute for lower-level defect detection    |

### Property-based / generative testing

Specify invariants and postconditions that must hold for all inputs; a
framework generates large volumes of diverse inputs to find violations.

| Attribute        | Detail                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------- |
| Use when         | Algorithmic code (parsers, serializers, data transformations, sorting, mathematical       |
|                  | functions) where invariants can be stated; finding inputs the developer did not imagine   |
| Test level       | Unit, integration                                                                         |
| Coverage metric  | Property satisfaction across generated input space; shrunk counterexample found/not found |
| Defects found    | Edge cases in input space not anticipated by the developer; invariant violations;         |
|                  | roundtrip failures (encode → decode → encode cycle)                                       |
| Limitation       | Requires stating correct properties (non-trivial); framework generates redundant cases;   |
|                  | failures must be shrunk to a minimal counterexample for diagnosis                         |
| Tooling examples | Hypothesis (Python), QuickCheck (Haskell/Erlang), fast-check (JS/TS), gopter (Go),        |
|                  | jqwik (Java)                                                                              |

### Acceptance criteria-based testing / BDD

Derive tests directly from Given/When/Then acceptance criteria. Each scenario
in the specification becomes an executable test case.

| Attribute        | Detail                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------- |
| Use when         | Agile development with user stories and acceptance criteria; when business stakeholders     |
|                  | need to read and validate the test specification; BDD workflows                             |
| Test level       | System, acceptance                                                                          |
| Coverage metric  | Acceptance scenarios covered / total specified scenarios                                    |
| Defects found    | Behavior that fails to meet stated acceptance criteria; missing acceptance scenarios        |
| Limitation       | Only as good as the acceptance criteria; does not replace structural or exploratory testing |
| Tooling examples | Cucumber (JVM/Ruby/JS), Behave (Python), SpecFlow (.NET), Gherkin syntax                    |

---

## Family 3: Experience-Based Techniques

These techniques rely on tester knowledge and creativity. They are not a
replacement for systematic techniques — they complement them by targeting the
defect classes that specifications do not capture and that code structure does
not reveal.

### Error guessing

Derive tests from domain knowledge about common defect types, typical
programmer errors, and known failure histories. Explicitly state the defect
hypothesis behind each test.

| Attribute     | Detail                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------- |
| Use when      | Supplement after systematic techniques; domain experts available; time-boxed sessions     |
| Test level    | Any                                                                                       |
| Defects found | Common coding errors (null handling, integer overflow, encoding issues, race conditions); |
|               | known failure patterns from similar systems; defects missed by systematic techniques      |
| Limitation    | Non-systematic; coverage depends entirely on tester experience; not repeatable            |

### Exploratory testing

Simultaneous test design and execution; the tester learns about the system and
designs the next test based on what they just observed. Run as time-boxed
sessions with a charter (scope and goal for the session).

| Attribute     | Detail                                                                                |
| ------------- | ------------------------------------------------------------------------------------- |
| Use when      | Poorly specified or unknown behavior; new system investigation; when systematic       |
|               | techniques have been applied and residual risk remains; regression discovery          |
| Test level    | System, acceptance                                                                    |
| Defects found | Unexpected interactions; behavior not covered by any specification; usability issues; |
|               | defects that only appear in realistic usage sequences                                 |
| Limitation    | Non-repeatable in its exact form; must be documented (session notes, charters) for    |
|               | traceability; not a substitute for systematic coverage                                |

### Checklist-based testing

Use a curated list of common defect types and known failure modes as a testing
guide. The checklist codifies accumulated organizational and domain knowledge.

| Attribute     | Detail                                                                                  |
| ------------- | --------------------------------------------------------------------------------------- |
| Use when      | Consistent coverage of recurring defect classes across releases or products; compliance |
|               | checklists (security hardening, accessibility, data validation)                         |
| Test level    | Any                                                                                     |
| Defects found | Recurring defect classes that experience shows are commonly missed                      |
| Limitation    | Only catches what is on the list; lists become stale without maintenance; does not      |
|               | discover novel defect classes                                                           |

---

## Technique Selection Guide

Use this table when choosing techniques for Step 3 of the workflow. Multiple
rows may apply; combine them.

| Situation / risk                                      | Recommended technique(s)                                              |
| ----------------------------------------------------- | --------------------------------------------------------------------- |
| High safety or regulatory requirement (DO-178C, etc.) | MC/DC condition coverage + state transition testing                   |
| Complex multi-condition business rules                | Decision table testing                                                |
| Any numeric, date, or bounded input                   | Equivalence partitioning + boundary value analysis                    |
| Protocol or stateful behavior (sessions, workflows)   | State transition testing + use case testing                           |
| Unknown or poorly specified behavior                  | Exploratory testing + error guessing                                  |
| Check whether the test suite finds real faults        | Mutation testing                                                      |
| Performance, load, or stress risk                     | Scenario-based testing at load scale + boundary values at limits      |
| New functionality with clear acceptance criteria      | Acceptance criteria-based / BDD + equivalence partitioning + boundary |
| Algorithmic code with stateable invariants            | Property-based / generative testing                                   |
| Legacy code with no existing tests                    | Branch coverage + exploratory testing (charter per module)            |
| Regression suite completeness check                   | Mutation testing to measure suite sensitivity                         |
| Security risk                                         | Checklist-based (OWASP) + error guessing + exploratory                |
