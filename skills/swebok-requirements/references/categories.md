# Requirements Taxonomy

Use this as the classification reference during step 3 of the workflow. Apply
the taxonomy before writing requirements, not after — classification shapes
what a requirement must contain to be verifiable.

## Top-level taxonomy

Every software requirement falls into one of four categories. When in doubt,
ask: "If I change this, does it change what the system _does_ (functional),
how well it does it (quality), what the system _is constrained to be/use_
(constraint), or how it connects to something external (interface)?"

---

### Functional requirements

**What the system shall do**: its behaviors, functions, inputs, outputs, and
responses to conditions.

Functional requirements describe state changes, computations, data
transformations, and interactions the system must perform. They are verified
by **testing** — you can execute the system and observe whether the behavior
occurs.

Characteristics of a well-formed functional requirement:

- States a specific behavior or response, not a general capability.
- Can be tested with a defined input and an expected output or state change.
- Includes exception conditions and error responses, not just the happy path.

**Examples:**

- "The system shall allow a registered user to reset their password via a link
  sent to their registered email address."
- "When a transaction exceeds the user's daily limit, the system shall decline
  the transaction and notify the user via the mobile app within 5 seconds."

---

### Quality requirements (non-functional requirements)

**How well the system performs some function**: measurable properties expressed
as a characteristic, a metric, a target value, and a measurement method.

Quality requirements are verified by **measurement** — you instrument the
system or execute a defined test and compare a reading against a target. A
quality requirement stated without a metric and target value is not yet a
requirement.

The canonical ISO 25010 quality characteristics are:

| Characteristic             | Definition                                                                                                          | Example measurability guidance                                                                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Functional suitability** | Degree to which the system provides functions that meet stated and implied needs.                                   | Typically measured via test coverage of functional requirements; distinct from the functional requirements themselves — this is about completeness and correctness of the functional set.                           |
| **Performance efficiency** | Resource use relative to conditions: time behavior, resource utilization, capacity.                                 | Metric: response time, throughput, CPU/memory utilization. Example: "95th-percentile API response time ≤ 200 ms under 500 concurrent users."                                                                        |
| **Compatibility**          | Ability to co-exist and interact with other systems or environments.                                                | Metric: pass/fail against enumerated system versions or interface standards. Example: "Shall interoperate with versions 3.x and 4.x of the payment gateway API."                                                    |
| **Usability**              | Degree to which the system can be used to achieve specified goals with effectiveness, efficiency, and satisfaction. | Metric: task completion rate, time-on-task, error rate, SUS score. Example: "New users shall complete account registration with no assistance in under 3 minutes."                                                  |
| **Reliability**            | Ability to perform required functions under stated conditions for a stated time.                                    | Metric: MTBF, MTTR, availability percentage. Example: "System availability shall be ≥ 99.9% measured monthly, excluding planned maintenance windows."                                                               |
| **Security**               | Degree to which the system protects information and data from unauthorized access.                                  | Metric: pass/fail on defined threat model controls; penetration test findings. Example: "All data at rest shall be encrypted using AES-256. Penetration tests shall yield no critical or high findings at release." |
| **Maintainability**        | Degree of effectiveness with which the system can be modified.                                                      | Metric: mean time to implement a change, test coverage percentage, cyclomatic complexity bounds. Example: "Any single-feature change shall require modifying no more than 3 modules."                               |
| **Portability**            | Ability of the system to be transferred to different environments.                                                  | Metric: pass/fail against enumerated target environments. Example: "The application shall function correctly on macOS 14+, Windows 11+, and Ubuntu 22.04+."                                                         |

#### The measurability pattern

Every quality requirement must follow this four-part pattern:

```
Characteristic → Metric → Target value → Measurement method
```

**Examples:**

| Characteristic                         | Metric                                         | Target value               | Measurement method                                                                      |
| -------------------------------------- | ---------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------- |
| Performance efficiency (time behavior) | 95th-percentile response time for search       | ≤ 200 ms                   | Load test with k6 at 500 concurrent virtual users                                       |
| Reliability (availability)             | Uptime percentage                              | ≥ 99.9% per calendar month | Monitoring service (e.g., Datadog uptime check), excluding approved maintenance windows |
| Usability                              | Task completion rate for new-user registration | ≥ 95% with no assistance   | Moderated usability test, n ≥ 10 participants unfamiliar with the product               |

A target value without a measurement method is still incomplete — "≤ 200 ms"
means nothing if you don't specify the load conditions under which it is
measured.

---

### Constraints

**Fixed restrictions on design or implementation choices** that remove degrees
of freedom from the solution without describing a behavior or quality
property.

Constraints are verified by **inspection** — checking the system or its
development artifacts for compliance.

| Constraint type | Definition                                                                               | Example                                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Technical**   | Technology mandates, platform requirements, or architecture decisions that are fixed.    | "The back-end shall be implemented in Python 3.11+." / "The system shall be deployed on AWS GovCloud."                                                 |
| **Regulatory**  | Legal or standards compliance requirements from external authorities.                    | "The system shall comply with HIPAA Security Rule requirements for PHI at rest and in transit." / "The system shall conform to WCAG 2.1 Level AA."     |
| **Business**    | Organizational policies, budget limits, schedule constraints, or commercial commitments. | "The system shall be delivered with no third-party dependencies that carry GPL licenses." / "Total infrastructure cost shall not exceed $5,000/month." |

**Do not treat constraints as quality requirements.** "Use PostgreSQL" is a
technology constraint — it restricts the solution space. It is not a
performance or reliability requirement, even if the reason for the constraint
is performance.

---

### Interface requirements

**Requirements on the external interfaces the system must present or conform
to**: APIs, protocols, data formats, hardware interfaces, and UI conventions
mandated by external systems or standards.

Interface requirements are distinct from functional requirements because they
are _bidirectional constraints_ — the system must conform to something it
doesn't control. Verified by **integration testing** or **conformance testing**
against the interface specification.

| Interface type | What it specifies                                          | Example                                                                                                                 |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| External API   | Endpoints, request/response formats, authentication scheme | "The system shall expose a REST API conforming to the OpenAPI 3.1 specification published by the partner organization." |
| Data exchange  | File formats, message schemas, encoding                    | "The system shall accept payment notifications in ISO 20022 XML format."                                                |
| Hardware       | Sensor protocols, device communication standards           | "The system shall communicate with the card reader via EMV contact interface at 9,600 baud."                            |
| UI convention  | Design system or accessibility standard                    | "All user-facing screens shall conform to the USWDS design system component specifications."                            |

---

## Product vs. process requirements

A **product requirement** specifies a property the delivered system must have.
All four categories above are product requirements.

A **process requirement** specifies a constraint on how the system is developed
— the development process, tooling, or methodology. Process requirements
appear in contracts and quality plans, not in an SRS.

| Type                | Example                                                                          |
| ------------------- | -------------------------------------------------------------------------------- |
| Product requirement | "The system shall encrypt all user data at rest using AES-256."                  |
| Process requirement | "The development team shall conduct a security code review before each release." |

An SRS should contain product requirements. Process requirements belong in the
project's quality management plan or statement of work. Mixing them creates
ambiguity about what must be verified in the delivered system vs. what must be
audited in the development process.

---

## Common misclassification pitfalls

These are the most frequent classification errors, and why they matter:

| Misclassified requirement                                             | What's wrong                                                         | Correct classification                                                                                                                                  |
| --------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "The system shall be fast."                                           | No metric, no target, no measurement method. Cannot be verified.     | Quality requirement (performance efficiency) — rewrite with metric, target, and measurement method.                                                     |
| "The system shall be reliable."                                       | Same problem — "reliable" is an adjective, not a requirement.        | Quality requirement (reliability) — specify MTBF, MTTR, or availability percentage.                                                                     |
| "The system shall be secure."                                         | Unverifiable as stated. Security is a multi-characteristic property. | Decompose: specific security controls (functional or constraint), plus measurable security quality requirements (e.g., penetration test pass criteria). |
| "The system shall use PostgreSQL."                                    | This is a technology choice, not a behavior.                         | Technical constraint.                                                                                                                                   |
| "The system shall use HTTPS."                                         | Protocol mandate on an external interface, not a behavior.           | Interface requirement (protocol) or technical constraint (if system-wide).                                                                              |
| "The system shall be easy to use."                                    | "Easy" is unmeasurable.                                              | Quality requirement (usability) — specify task completion rate, time-on-task, or SUS score target.                                                      |
| "The development team shall write unit tests with 80% line coverage." | This constrains the process, not the product.                        | Process requirement — move to the quality management plan.                                                                                              |
| "The system shall log all user actions."                              | This is a behavior — it describes something the system must _do_.    | Functional requirement. (Logging _retention duration_ and _access controls_ are quality/constraint requirements.)                                       |

The test: after classification, can you write a verification criterion? If not,
the requirement is either misclassified or not yet specified precisely enough.
