# Process Definition: Medical Device Firmware Engineering Team

## 1. Project characterization
- **Requirements stability**: High — requirements must be fully elicited, analyzed, locked, and baselined into a Software Requirements Specification (SRS) prior to detailed design and implementation, in accordance with IEC 62304.
- **Team size and distribution**: 15 engineers distributed across 3 time zones, requiring formal interface management, explicit asynchronous collaboration protocols, robust configuration management, and rigorous architectural documentation.
- **Criticality and safety constraints**: High (Class II Medical Device / IEC 62304 Software Safety Class B or C depending on hazard analysis) — software defects can cause patient harm or regulatory non-compliance. Requires rigorous risk management (ISO 14971), bidirectional traceability, formal verification and validation, and independent reviews.
- **Regulatory / contractual process constraints**: IEC 62304 (Medical device software - Software lifecycle processes), ISO 14971 (Risk management), FDA 21 CFR Part 820 / General Principles of Software Validation, and ISO 13485 quality management systems.
- **Stakeholder availability for feedback**: Limited / Formal — clinical domain experts and regulatory affairs specialists participate in formal milestone reviews (Phase Gate reviews) rather than continuous weekly iteration.
- **Technology and domain novelty**: Medium — embedded firmware running on microcontroller / RTOS with hardware-specific drivers, constrained memory, and deterministic timing requirements.

## 2. Lifecycle model selection
- **Selected model**: Tailored V-Model with Formal Stage Gates (IEC 62304 compliant plan-driven lifecycle with iterative subsystem integration).
- **Rationale**: The V-Model explicitly pairs each development phase (Software Requirements, Software Architecture, Detailed Design, Unit Implementation) with its corresponding verification and validation counterpart (Software Testing, System Integration Testing, Integration Testing, Unit Testing). This ensures complete bidirectional traceability required by IEC 62304 and front-loads risk management before implementation begins across a distributed team.
- **Tailoring decisions**:
  - *Hybrid Iterative Integration*: While requirements, architecture, and detailed design follow strict sequential stage gates, unit and integration testing are executed continuously via CI/CD hardware-in-the-loop (HIL) test benches as modules are completed.
  - *Lightweight Documentation Templates*: Standardized markdown-based specification templates stored in version control paired with automated traceability checking tools, replacing cumbersome paper-based documentation while preserving full auditability.
  - *Distributed Review Boards*: Formal gate reviews are conducted asynchronously across time zones using structured PR approval sign-offs and virtual review committees rather than single-room co-located sign-offs.

## 3. Phase / iteration table
| Phase or iteration type | Activities | Entry criteria | Exit criteria | Artifacts | Owner |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Software Requirements Analysis** | Elicit system requirements, perform safety risk analysis (ISO 14971), define software requirements, establish traceability matrix stub. | Approved system-level hazard analysis and product charter. | SRS reviewed and approved by Systems, Software, Quality, and Regulatory leads; zero open critical review comments. | Software Requirements Specification (SRS), Risk Management File, Requirements Traceability Matrix (RTM). | Systems Engineer / Product Manager |
| **2. Software Architectural Design** | Define high-level architecture, software components, hardware-software interfaces, safety-related segregation, and concurrency models. | Approved SRS and RTM stub. | Architecture design reviewed, hazard mitigations verified against architecture, interface specifications signed off. | Software Architecture Document (SAD), Interface Control Document (ICD), Updated RTM. | Principal Software Architect |
| **3. Software Detailed Design** | Define module-level data structures, algorithms, state machines, error handling, and unit test specifications. | Approved SAD and architecture sign-off. | Detailed design documentation complete, code guidelines reviewed, unit test specs mapped to requirements. | Detailed Design Specification (DDS), Unit Test Specifications, Updated RTM. | Lead Firmware Engineers |
| **4. Implementation & Unit Testing** | Write C/C++ embedded firmware code, execute static analysis (MISRA C compliance), write and execute unit tests on target or simulator. | Approved DDS and unit test specs. | 100% statement and branch coverage (or MC/DC as required by Safety Class), zero static analysis warnings, code review passed. | Source code, compiled binaries, Unit Test Results Report, Static Analysis Report. | Firmware Engineers |
| **5. Integration & Integration Testing** | Integrate software modules, build firmware images, execute hardware-in-the-loop (HIL) integration tests, verify interface contracts. | Passing unit test reports for all integrated modules. | Integration test plan executed successfully, subsystem interfaces validated, no memory leaks or timing violations. | Integration Test Procedure, Integration Test Report, Integrated Firmware Build. | Integration Lead / Test Engineers |
| **6. System Testing & Validation** | Full system V&V testing against SRS requirements, stress testing, boundary condition testing, traceability verification. | Passing integration test reports and freeze candidate build. | All system requirements verified, traceability matrix 100% verified bidirectionally, anomaly reports resolved. | System V&V Test Protocol, System Test Report, Complete RTM, Software Release Candidate. | Quality Assurance / V&V Lead |
| **7. Release & Maintenance** | Regulatory packaging, digital signing of firmware binaries, deployment to manufacturing/field update tools, post-market surveillance monitoring. | Approved V&V test report, Quality Assurance sign-off, regulatory release clearance. | Firmware released to manufacturing/field distribution, master records archived, maintenance baseline established. | Release Notes, Production Firmware Image, Software Bill of Materials (SBOM), Device History Record (DHR) inputs. | Release Manager / Regulatory Affairs |

## 4. Process measurement plan
| Goal | Question | Metric | Collection point | Baseline | Owner |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ensure strict requirements traceability** | Are all software requirements fully linked to design and test cases prior to release? | **Traceability Completeness**: (Linked Requirements / Total Requirements) × 100% | End of each phase gate | 100% required for Phase 3 onwards | Requirements Manager |
| **Maintain high static analysis compliance** | Is the firmware code adhering to safety coding standards (MISRA C)? | **MISRA C Violation Count**: Number of unsuppressed rule violations per 1,000 lines of code | Every CI build / PR review | 0 unsuppressed violations | Lead Architect / CI Pipeline |
| **Prevent defect leakage across phases** | Where are defects being introduced and caught in the V-model? | **Defect Origin Distribution**: % of defects originating in Requirements vs. Design vs. Implementation vs. Test | Monthly quality review | < 5% originating in design/reqs escaping to test | Quality Assurance Lead |
| **Achieve full code & test coverage** | Are unit and integration tests covering all code paths and safety requirements? | **Test Coverage Ratio**: (Executed & Passed Statements / Total Statements) × 100% | Phase gate 4 & 5 | 100% statement / branch coverage | Test Lead |
| **Control rework and change requests** | How much churn occurs in requirements and design post-baseline? | **Change Request Rate**: Number of approved change requests per phase after baseline sign-off | Phase gate reviews | < 5 per release cycle | Project Manager |

## 5. Improvement cadence
- **Retrospective / review frequency**: Phase Gate Reviews at the conclusion of each major lifecycle phase (formal review board), plus bi-weekly technical synchronization meetings across the 3 time zones to review process bottlenecks, CI build health, and tooling issues.
- **Improvement action tracking**: All process non-conformances, audit findings, and retrospective improvement items must be logged in the Quality Management System (QMS) corrective and preventive action (CAPA) or issue tracking system with an assigned owner, root-cause analysis, and verified closure date.
- **Escalation path for persistent process failures**:
  1. **Technical Blockers / Process Deviations**: Raised immediately during async time-zone standups or flagged in PR/gate review comments.
  2. **Stage Gate Failure / Non-Conformance**: If entry/exit criteria fail at a milestone review, the phase cannot be closed, and the issue escalates to the Quality Assurance Manager and Project Manager.
  3. **Critical Safety or Compliance Risks**: Any safety hazard or IEC 62304 non-compliance discovered escalates immediately to the Safety Officer, Regulatory Affairs, and Executive Steering Committee with mandatory root-cause analysis within 24 hours.

## 6. Distributed Collaboration & Configuration Management for Multi-Timezone Firmware Teams

### 6.1 Multi-Timezone Asynchronous Workflow
- **Overlap Windows**: Define a 2-hour daily shared collaboration window across the 3 time zones for critical real-time syncs, architectural discussions, and unblocking.
- **Async-First Artifacts**: All design decisions, requirement clarifications, and code reviews must be documented thoroughly in writing (via PR descriptions, ADRs, and specification comments) to allow asynchronous review across time zones without blocking progress.

### 6.2 Configuration Management & Reproducible Builds
- **Strict Configuration Identification**: All source code, toolchains (compilers, linkers, assemblers), third-party libraries, and build scripts are placed under strict configuration management with cryptographic hashing and version locking.
- **Deterministic CI/CD Pipelines**: Automated containerized build environments ensure that firmware binaries built on CI servers are bit-for-bit reproducible and traceable to exact commit hashes and toolchain versions.
