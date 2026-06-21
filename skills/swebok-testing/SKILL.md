---
name: swebok-testing
description: >-
  Produce or review a test plan and test case designs using the technique/level
  discipline from SWEBOK V4 Chapter 5. Use this whenever the work involves
  designing, documenting, or evaluating a testing strategy — e.g. "test
  strategy", "test plan", "write unit tests", "integration testing", "system
  testing", "acceptance testing", "choose testing technique", "test coverage",
  "mutation testing", "regression testing", "TDD", "BDD", "test case design",
  "what to test and how", "testing approach", "test suite",
  "test-driven development", "automated testing", "functional testing",
  "non-functional testing", "load testing", or "security testing". Trigger even
  when the user just says "how should I test this" or "what tests do I need" —
  the discipline of matching techniques to defect hypotheses and levels to defect
  classes applies, not just a list of assertions to write.
---

# Software Testing

Software testing is the activity of evaluating a system or its components with
the intent of finding whether it satisfies specified requirements and of
identifying defects. It is not a phase that happens at the end — it is a
_discipline_ that spans the lifecycle: from unit tests written alongside code,
through integration and system verification, to acceptance by the stakeholders
who will operate or fund the system.

Three ideas drive everything below:

1. **Testing shows presence of defects, not their absence.** A passing test
   suite is not proof of correctness; it is evidence that the tested scenarios
   work as specified. Design tests to _find_ defects, not to achieve a passing
   run. A suite that only validates the happy path is demonstrating the system
   works when nothing goes wrong — which is rarely the interesting case.

2. **Technique selection is context-dependent.** No single technique covers all
   defect classes. White-box techniques find logic errors; black-box techniques
   find missing requirements; experience-based techniques find the unexpected. A
   testing strategy must match techniques to defect hypotheses, not apply one
   method uniformly because it is familiar.

3. **Test levels are not redundant.** Each level catches a distinct class of
   defect most efficiently. Collapsing levels (e.g., only doing system testing)
   moves defect detection to the most expensive phase and hides integration
   errors until they are expensive to fix. A unit test that catches an off-by-one
   error costs minutes to fix; the same error found during system testing costs
   days.

## When NOT to over-apply this

For a small throwaway script, a few smoke tests suffice. The full discipline
earns its keep on systems where defects have cost (financial, safety,
reputational). Scale the process — test planning, technique selection, formal
test case design — to the stakes and the defect risk. State the scaling
decision rather than silently defaulting to minimal or maximal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Establish test context

Identify the system under test (SUT), its quality risks, applicable standards
(safety, compliance), resource constraints, and who owns each test level.
Specifically determine:

- What is the SUT and what is the scope of this test effort (a unit, a feature,
  a release, a full system)?
- What are the highest-priority quality risks — the defect classes that would
  cause the greatest harm if undetected?
- Are there regulatory, safety, or contractual standards that mandate specific
  techniques or coverage levels (DO-178C, IEC 61508, ISO 26262)?
- What are the resource constraints: time, tooling, access to test environments,
  availability of testers?

Context shapes every subsequent decision. Testing against a safety standard
requires different rigor than testing a content management feature.

### 2. Select test levels and assign responsibilities

Decide which levels apply (unit, integration, system, acceptance) and who
executes each. Consult `references/levels.md` for entry/exit criteria, typical
defect classes, and ownership at each level. For each level, decide:

- Is it in scope for this test effort? If not, state why.
- Who owns it — developer, dedicated test team, business stakeholder?
- What are the entry criteria before this level can begin?
- What are the exit criteria that declare it complete?

Do not skip this step by assuming levels are obvious. Teams frequently
conflate unit and integration testing, or skip integration testing entirely,
producing test suites that miss a whole class of defect (interface mismatches,
protocol errors, sequencing bugs) that no amount of unit testing can find.

### 3. Select test techniques for each level and risk area

Match techniques to the defect classes you need to find. Consult
`references/techniques.md` for the full catalog with "use when" guidance.
Produce a coverage table:

| Risk / feature area | Test level | Technique(s) | Coverage criterion | Rationale |

Do not select techniques because they are familiar. Ask: what defect class am I
trying to expose in this risk area? Then choose the technique whose coverage
model exposes that class. For example: boundary value analysis finds defects at
partition edges; decision table testing finds defects in complex rule
combinations; mutation testing reveals whether the test suite is actually
sensitive to the faults it claims to cover.

### 4. Design and implement test cases

For each selected technique, derive test cases: specify inputs, execution
conditions, expected outputs, and pass/fail criteria. State the coverage
criterion and how you will measure it (line coverage percentage, branch
coverage percentage, mutation score, equivalence classes covered, transitions
exercised, etc.).

Test cases must be:

- **Specified before execution** (not reverse-engineered from passing code).
- **Independent** — no reliance on execution order or shared mutable state.
- **Traceable** to the requirement or risk they cover.
- **Repeatable** — same inputs, same environment, same result.

For each test case:

| ID | Level | Technique | Input / condition | Expected output | Pass/fail |

Record the coverage criterion being satisfied by each group of test cases, not
just the individual cases.

### 5. Execute tests and manage incidents

Run tests. Log every failure as a test incident: actual vs. expected behavior,
reproduction steps, environment configuration, severity. Do not assume a failure
is a defect — it may be a test error, an environment issue, or a
misspecification. Triage each incident:

- **Defect** — the SUT behaved contrary to its specification.
- **Test error** — the test case was wrong or the test infrastructure failed.
- **Environment issue** — the failure was caused by configuration, data, or
  infrastructure external to the SUT.
- **Specification ambiguity** — the expected behavior was not clearly defined.

Track all incidents to closure. Reopen closed incidents if they recur.

### 6. Evaluate exit criteria and report

Assess whether defined exit criteria are met (coverage thresholds, incident
resolution targets, risk sign-off). A test effort without explicit exit criteria
runs until time runs out — which is not a quality decision, it is a scheduling
accident.

Report:

- Tests planned vs. executed vs. passed/failed.
- Coverage achieved against criterion.
- Open incidents by severity.
- Residual risk: what known defect classes remain untested and why.

## Output format

Unless the user asks for something else, use this structure. Adapt depth to the
system's scale and defect risk.

```
# Test Plan: <System / Feature>

## 1. Context and scope
- System under test (SUT), version, scope of this test effort
- Quality risks and defect priorities
- Applicable standards, regulations, or constraints
- Resource constraints and schedule

## 2. Test levels and responsibilities
| Level       | In scope? | Owner | Entry criteria | Exit criteria |
(Justify any level excluded.)

## 3. Test technique coverage
| Risk / feature area | Test level | Technique(s) | Coverage criterion | Rationale |

## 4. Test case specification (per technique/area)
| ID | Level | Technique | Input / condition | Expected output | Pass/fail |

## 5. Test environment and data
- Environment configuration
- Test data requirements and preparation
- Tools (test runner, mocking, coverage, mutation)

## 6. Incident management
- Incident logging format (ID, description, severity, steps to reproduce, actual vs. expected)
- Triage process and escalation
- Reopening policy

## 7. Exit criteria and reporting
- Coverage thresholds required
- Incident resolution requirements
- Residual risk statement
```

If asked to write tests rather than a plan, still apply the discipline silently:
name the level and technique for each test, state what defect class it targets,
and do not conflate unit tests with integration tests in one fixture.

## Reviewing an existing test suite / test plan (checklist mode)

When the task is to critique or evaluate rather than author, run the workflow as
a checklist against what exists:

1. Are all identified quality risks covered by at least one technique? List any
   uncovered risks explicitly.
2. Are test levels appropriate — is there unit/integration/system separation, or
   is everything lumped into one level?
3. Are test cases traceable to requirements or risk areas? Are there requirements
   with no test cases?
4. Are coverage criteria explicitly stated and measurable — not just "we have
   tests" or "coverage is good"?
5. Are edge cases and boundary values covered, not just the happy path?
6. Is there a mutation testing or equivalent fault-injection approach to assess
   whether the test suite is sensitive to the faults it claims to cover?
7. Is there a defined exit criterion, or is the test effort "done when time runs
   out"?
8. Are tests independent — no reliance on execution order or shared mutable
   state?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **System under test (SUT)** — the tested object: a unit, component,
  subsystem, or complete system, depending on the test level.
- **Test case** — the specification of inputs, execution conditions, and
  expected output for one test scenario, along with the pass/fail criterion.
- **Test level** — the target scope of testing: unit (component), integration,
  system, acceptance. Each level targets a distinct class of defect.
- **Test technique** — the method used to derive test cases: structural
  (white-box), behavioral (black-box), or experience-based.
- **Coverage criterion** — the measurement of how completely a test suite
  exercises a test basis (code structure, equivalence classes, mutation
  operators, state transitions, etc.).
- **Fault (defect)** — a static flaw in code or specification that may cause a
  failure when executed.
- **Failure** — a deviation of observed behavior from specified behavior during
  execution. A fault can exist in code without ever causing a failure.
- **Incident** — any event during test execution that requires investigation;
  may be a defect, a test error, or an environment issue.
- **Exit criteria** — the defined conditions under which a test activity is
  considered complete. Must be specified before testing begins.
- **Regression testing** — re-execution of tests after a change to confirm that
  no previously correct behavior was broken.
- **Mutation testing** — a technique that assesses test effectiveness by
  introducing small artificial faults (mutants) into the code and checking
  whether the test suite detects them. Coverage metric: mutation score (mutants
  killed / total mutants).
- **Test basis** — the artifact from which test cases are derived: source code
  (for structural techniques), requirements or specifications (for black-box
  techniques), or tester experience (for experience-based techniques).
