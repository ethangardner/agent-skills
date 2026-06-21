# Test Levels

Each test level targets a distinct scope of the system and catches a distinct
class of defect most efficiently. The levels are not redundant — defects found
at a lower level cost significantly less to fix than the same defect found at a
higher level. Define entry and exit criteria for each level before testing begins;
without them, a level is "complete" only when time runs out.

Use this reference when executing Step 2 of the workflow: select which levels
apply, assign ownership, and set entry/exit criteria.

---

## Unit (Component) Testing

**Target:** Individual units (functions, methods, classes, modules) in isolation
from their dependencies. Dependencies are replaced with stubs, mocks, or fakes.

**Typical defects found:**

- Logic errors and incorrect algorithms within a unit
- Boundary condition failures (off-by-one, overflow)
- Edge cases within a single unit's responsibility
- Incorrect return values or side effects
- Missing or incorrect error handling for exceptional inputs

**Isolation approach:** Stubs and mock objects replace all dependencies of the
unit under test. This ensures failures are localized to the unit, not to its
collaborators. The isolation boundary must be explicitly stated — a "unit test"
that exercises a database call is an integration test.

**Entry criteria:**

- Unit code complete and compiles
- Coding standards checked (linting, static analysis)
- Unit test cases designed and reviewed
- Test harness and mocking infrastructure available

**Exit criteria:**

- Coverage criterion met (typically branch coverage ≥ 80–90% or mutation
  score at defined target)
- All test incidents resolved or explicitly deferred with rationale
- No high-severity incidents open

**Typical techniques:** Branch/decision coverage, boundary value analysis,
equivalence partitioning, mutation testing, condition coverage (MC/DC for
safety-critical units).

**Owner:** Developer. Unit testing is most effective when written test-first
(TDD) or written alongside the code, not after the fact. Late-written unit tests
have lower defect-finding yield because the developer has already mentally
exercised the happy path.

---

## Integration Testing

**Target:** Interactions between integrated units or components — the interfaces,
contracts, and communication paths between parts that have each individually
passed unit testing.

**Typical defects found:**

- Interface mismatches (incorrect parameter types, orders, or counts)
- Incorrect data exchange between components (encoding, format, serialization)
- Protocol errors (incorrect message sequences, handshake failures)
- Sequencing errors (component A requires B to initialize first)
- Resource contention (shared state, locking, race conditions between components)
- Incorrect error propagation across component boundaries

**Integration strategies:** Choose one; state the choice and its rationale.

| Strategy            | Description                                                               | When to use                                                      |
| ------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Big-bang            | Integrate all components at once and test the combined system             | Small systems only; produces difficult-to-isolate failures       |
| Bottom-up           | Integrate and test lowest-level components first; add higher levels       | When lower-level components are ready first; needs test drivers  |
| Top-down            | Integrate and test from the top-level component down; stubs at the bottom | When high-level behavior must be validated early; needs stubs    |
| Sandwich            | Combine top-down and bottom-up; meet in the middle                        | Large systems; reduces stub and driver complexity                |
| Collaboration-based | Integrate components required by a use case or feature together           | Agile/feature-driven development; keeps integration close to use |

**Entry criteria:**

- All constituent units have passed unit testing (no open high-severity unit incidents)
- Interfaces specified and available (API contracts, schemas, protocol specs)
- Integration test cases designed
- Integration environment configured with appropriate test doubles at the
  remaining unintegrated boundaries

**Exit criteria:**

- All identified integration paths exercised
- Interface test cases passed
- No high-severity incidents open
- Identified defect classes (interface mismatches, protocol errors) resolved or
  explicitly accepted

**Typical techniques:** Scenario/use-case based (drive through a realistic
workflow), state transition testing (for protocol-based integrations), call-graph
coverage (exercise each inter-component call path).

**Owner:** Developer or dedicated integration test team, depending on
organizational structure. Integration testing should be separate from unit
testing — using the same test suite for both produces a suite that appears
comprehensive but misses an entire defect class.

---

## System Testing

**Target:** The complete integrated system evaluated against its requirements
specification and quality requirements. The entire system is treated as the SUT.

**Typical defects found:**

- Missing functionality (requirements not implemented)
- Requirement violations (functionality implemented incorrectly)
- End-to-end failures that only manifest across the full system
- Configuration and deployment errors
- Performance and scalability failures
- Security vulnerabilities in the assembled system
- Data integrity issues across the full system boundary

**Environment:** System testing must be performed in an environment that mirrors
production as closely as possible — same infrastructure configuration, same data
volumes, same network topology. A system test run in a degraded or simplified
environment produces results that do not predict production behavior.

**Entry criteria:**

- Integration testing complete; no open high-severity integration incidents
- Test environment configured and verified to match production
- System-level test cases designed and reviewed
- Release candidate (or equivalent stable build) available
- Test data prepared

**Exit criteria:**

- All functional requirements covered by at least one test case
- Quality requirements (performance targets, security requirements,
  reliability thresholds) verified against specified acceptance values
- No high or critical severity incidents open
- Non-functional testing (performance, security, reliability) completed and
  results within targets
- Test report produced

**Typical techniques:** Use-case based testing, equivalence partitioning,
boundary value analysis, exploratory testing (chartered, time-boxed sessions),
performance/load/stress testing, security testing.

**Owner:** Independent test team, separate from the development team that built
the system. Independence reduces confirmation bias. A developer testing their
own code finds fewer defects than an independent tester because the developer
unconsciously avoids the scenarios where they know the code is fragile.

---

## Acceptance Testing

**Target:** The system in the context of its actual use — validating that the
system meets the needs of its intended users, stakeholders, or contractual/
regulatory requirements.

**Sub-types:**

### User Acceptance Testing (UAT)

Actual users or user representatives validate the system against real business
needs and workflows.

- **Typical defects found:** Business process mismatches; missing use cases;
  workflows that are technically correct but impractical; usability barriers
- **Entry criteria:** System testing complete; defect list reviewed and
  accepted/deferred by stakeholders; acceptance test cases approved by business
- **Exit criteria:** Business stakeholders formally sign off; all contractual
  acceptance criteria met
- **Typical techniques:** User scenarios, business process flows, exploratory
  testing by domain users
- **Owner:** Business stakeholders or product owner, supported by test team

### Operational Acceptance Testing (OAT)

The operations team validates that the system can be deployed, operated,
monitored, backed up, and recovered.

- **Typical defects found:** Deployment procedure failures; backup/restore
  failures; monitoring gaps; operational runbook errors; resource sizing errors
- **Entry criteria:** System testing complete; deployment procedures documented
- **Exit criteria:** Deployment, backup/restore, monitoring, and failover
  procedures validated; operations team accepts operational responsibility
- **Typical techniques:** Checklist-based (against operational runbooks),
  scenario-based (execute disaster recovery procedures end-to-end)
- **Owner:** Operations team / SRE

### Contractual Acceptance Testing

Validates that the system meets criteria specified in a contract between supplier
and customer.

- **Typical defects found:** Contractual deliverable gaps; non-conformance to
  agreed technical standards or performance benchmarks
- **Entry criteria:** Contract acceptance criteria formally agreed and documented
- **Exit criteria:** All contractual criteria demonstrated; customer formally accepts
- **Owner:** Customer and independent test team (as specified in contract)

### Regulatory Acceptance Testing

Validates compliance with legal, regulatory, or standards requirements.

- **Typical defects found:** Compliance gaps; documentation deficiencies; audit
  trail failures; data handling non-conformance
- **Entry criteria:** Regulatory requirements mapped to system capabilities;
  regulatory test cases approved by compliance function
- **Exit criteria:** All regulatory criteria met; independent auditor or
  certification body sign-off obtained
- **Typical techniques:** Checklist-based (against regulatory requirements),
  evidence collection, audit trail verification
- **Owner:** Independent auditor or certification body; compliance function

---

## Non-Functional Test Types (cross-cutting)

These test types are not limited to one level — they apply primarily at system
level but some aspects apply earlier. They address quality attributes that are
not expressible as functional pass/fail scenarios.

| Test type                      | What it measures                                              | Typical level      | Typical defects found                                       |
| ------------------------------ | ------------------------------------------------------------- | ------------------ | ----------------------------------------------------------- |
| **Performance testing**        | Response time and throughput under a defined workload         | System             | Latency exceeding SLA; throughput below target              |
| **Load testing**               | System behavior under expected peak load                      | System             | Degradation at peak; resource exhaustion at expected volume |
| **Stress testing**             | System behavior beyond normal operating limits                | System             | Crash or corruption under overload; incorrect graceful      |
|                                |                                                               |                    | degradation; recovery failure after overload                |
| **Security testing**           | Vulnerability identification; penetration resistance          | System             | Injection vulnerabilities; authentication bypass;           |
|                                |                                                               |                    | authorization failures; sensitive data exposure             |
| **Reliability / availability** | Mean time between failures; recovery time; failure mode       | System             | Incorrect failover; data loss on failure; recovery time     |
|                                | behavior                                                      |                    | exceeding RTO; MTBF below target                            |
| **Usability testing**          | Effectiveness, efficiency, and satisfaction of user interface | System, acceptance | Interaction design failures; task completion failures;      |
|                                |                                                               |                    | accessibility violations                                    |

Non-functional testing requires explicit, measurable targets stated before
testing begins — "the system must respond in under 200ms at the 95th percentile
under 500 concurrent users" is a testable criterion; "the system should be fast"
is not. If no targets are defined, define them before planning non-functional
tests.
