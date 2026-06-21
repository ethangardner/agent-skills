---
name: swebok-requirements
description: >-
  Produce or review a software requirements specification using the elicitation,
  classification, analysis, and validation discipline from SWEBOK V4 Chapter 1.
  Use this whenever the work involves discovering, documenting, or evaluating
  software requirements — e.g. "elicit requirements", "write requirements",
  "requirements specification", "user stories", "acceptance criteria",
  "functional/non-functional requirements", "requirements review",
  "requirements validation", "scope definition", "requirements traceability",
  "gather requirements", "system requirements", "software requirements
  document", "SRS", "requirements workshop", "stakeholder needs". Trigger even
  when the user just says "what does this system need to do", "define the
  scope", or "write acceptance criteria" — the discipline of classifying,
  analyzing, and verifying requirements applies, not just a freehand list.
---

# Software Requirements

A software requirements specification (SRS) is the work product that records
the **agreed conditions** a system must satisfy — its behaviors, quality
properties, and constraints — in enough precision that the system can be built,
verified, and accepted. It is not a wish list and not a design document. Its job
is to give all parties — customers, developers, testers, operators — a shared,
verifiable model of what the system must do and how well it must do it.

Three principles drive everything below:

1. **Requirements are agreements, not discoveries.** They emerge from
   negotiation among stakeholders with conflicting interests, not from
   excavating a pre-existing truth. Your job as requirements engineer is to
   surface conflicts, facilitate resolution, and record the outcome — not to
   transcribe what one stakeholder dictates.
2. **Every requirement must be verifiable.** An unverifiable requirement is a
   wish, not an engineering specification. If you cannot define a test,
   measurement, or inspection that confirms it, it is not a requirement yet.
   "The system shall be fast" is not a requirement. "Response time for search
   shall be ≤ 200 ms at the 95th percentile under 500 concurrent users" is.
3. **Requirements defects compound.** A defect seeded at the requirements phase
   costs roughly 100× more to fix post-deployment than pre-specification. The
   earlier you find conflicts and ambiguities, the cheaper they are. Invest time
   in analysis and validation before the first line of code.

## When NOT to over-apply this

For a small one-person script or prototype, a bulleted note in a README
suffices. The full discipline earns its keep on multi-team systems,
safety/compliance-critical work, or contractual deliverables where requirements
are baseline commitments. State the scaling decision rather than silently
defaulting to maximal ceremony.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Establish context and stakeholders

Requirements are **outward-looking**. Before any requirement, establish:

- The **system-of-interest and its boundary** — what is inside vs. outside.
- The **external entities**: users, operators, customer organizations,
  interfacing systems, regulators. These constrain the system as much as any
  stakeholder interview.
- Who has **decision authority** (can approve or reject requirements), who has
  **domain knowledge** (knows how the work actually happens), and who will be
  **impacted** (must live with the system).
- **Regulatory or contractual requirements** that are fixed constraints, not
  open to negotiation. Identify these early — they set the floor.

Document this as the system scope. Every requirement that follows must trace
into this scope.

### 2. Select and execute elicitation techniques

Choose technique(s) appropriate to the context, the stability of the domain,
and stakeholder availability. Consult `references/techniques.md` for the full
catalog with "use when" guidance and limitations.

- Don't rely on interviews alone. Stakeholders often don't know what they need
  until they see what they don't want. Use prototyping, observation, or document
  analysis alongside conversation-based techniques.
- **Document the source** of each requirement: which stakeholder, document, or
  observation produced it. Traceability starts here.
- Distinguish between what stakeholders **say they want** (expressed needs),
  what they **actually need** (real needs), what they **don't know they need**
  (latent needs), and what they explicitly **don't want** (negative
  requirements). All four matter.

### 3. Classify all requirements by category

Apply the taxonomy from `references/categories.md` before writing the spec.
Classification shapes verifiability:

- **Functional requirements** — what the system shall _do_: its behaviors,
  functions, and responses to inputs.
- **Quality requirements (non-functional)** — how well the system performs some
  function: a measurable property with an identified metric and target value.
- **Constraints** — fixed restrictions on design or implementation choices:
  technology mandates, regulatory standards, budget or schedule limits.
- **Interface requirements** — the external interfaces the system must present
  or conform to: APIs, protocols, data formats, UI conventions.

Misclassification is the most common source of unverifiable requirements.
"The system shall be fast" is a quality requirement stated as if it were
functional — it has no metric and no target, so it cannot be verified.

### 4. Analyze for completeness, consistency, and conflict

A list of requirements is not a specification until it has been analyzed:

- **Completeness** — are all system behaviors specified, including error
  conditions, boundary cases, and startup/shutdown behavior? Are all external
  entities' interactions covered?
- **Consistency** — do any two requirements contradict each other? Can all
  requirements be satisfied simultaneously?
- **Conflict** — do stakeholder interests conflict in ways not yet resolved?
  Conflict resolution must be recorded, not silently adopted.
- **Feasibility** — given the constraints, is it actually possible to build a
  system that satisfies all requirements?

For safety-critical or high-assurance systems, formal analysis is warranted:
state machines, model checking, assertions. For most systems, structured
walkthroughs with diverse stakeholder representation catch the major gaps.

### 5. Specify in chosen notation

Write requirements in a notation appropriate to the system's domain and risk
level:

- **Structured natural language** — the default for most systems. Each
  requirement has: an ID, a "shall" statement, a rationale, a priority, and
  a verifiability criterion. Avoid ambiguous qualifiers ("reasonable",
  "adequate", "as needed").
- **Model-based** — for complex behavior: state machines, use case models,
  BDD scenarios (Given/When/Then). Use when behavior is too intricate for
  prose to express without ambiguity.
- **Formal specification** — for safety-critical or high-assurance systems
  where mathematical precision is required.

Every quality requirement must follow the pattern: **characteristic → metric →
target value → measurement method**. See `references/categories.md` for
examples.

### 6. Validate against stakeholder expectations

Validation answers: "Are these requirements actually what the stakeholders
need?" not "Are these requirements internally consistent?" (That is analysis,
step 4.)

Validation techniques:

- **Reviews and walkthroughs** — have real stakeholders walk through the spec
  against their mental model of the problem.
- **Prototyping** — build throwaway UI or interaction mockups to surface
  misunderstandings before specification is baselined.
- **Simulation or model execution** — for model-based specs, execute scenarios
  against the model.

For each requirement, confirm: it is actually _wanted_ (not assumed), its
acceptance criterion is _testable_, and it can be _traced_ to a business goal
or stakeholder need. Any requirement that fails these three checks is not ready
to be baselined.

## Output format

Unless the user asks for something else (e.g. BDD feature files, a user story
backlog, a structured SRS per IEEE 29148), use this structure. Adapt depth to
the system's scale.

```
# Requirements Specification: <System Name>

## 1. System scope and context
- System-of-interest and boundary
- External entities (users, systems, regulators, interfacing hardware)
- Assumptions and constraints (fixed, not open to negotiation)

## 2. Stakeholder register
| Stakeholder | Role | Authority | Key interests |

## 3. Functional requirements
| ID | Description | Rationale | Priority | Verification criterion |
(Every row must have a testable verification criterion.)

## 4. Quality requirements (non-functional)
| ID | Quality characteristic | Metric | Target value | Measurement method |
(Reference `references/categories.md` for the quality taxonomy.)

## 5. Constraints
| ID | Type (technical/regulatory/business) | Description | Source |

## 6. Interface requirements
| ID | Interface type | Description | Protocol/format | Counterpart |

## 7. Traceability matrix stub
| Req ID | Source (stakeholder/document) | Design element | Test case |
```

If asked for a user story or acceptance criterion rather than a full SRS, still
apply the discipline silently: classify the requirement, ensure the acceptance
criterion is testable, and flag any quality requirements buried inside the story
that need separate treatment.

## Reviewing existing requirements (checklist mode)

When the task is to critique or evaluate rather than write, run the workflow as
a checklist against what exists:

1. Is every requirement **verifiable**? Flag any that cannot be tested,
   measured, or inspected. These need either a metric added or removal.
2. Is every requirement **traceable** to a stakeholder need or business goal?
   Requirements without a source are gold-plating risks.
3. Are quality requirements stated as **measurable attributes**, not vague
   adjectives ("fast", "reliable", "secure", "user-friendly")?
4. Are constraints explicitly **typed** (technical/regulatory/business) and
   **sourced**? Untested assumptions masquerade as constraints.
5. Do any requirements **conflict**? Are conflict resolutions recorded, or just
   one stakeholder's view silently adopted?
6. Is there **gold-plating** — requirements no stakeholder actually asked for,
   added by the development team?
7. Are **derived requirements** (flowing from system-level requirements to
   software-level requirements) explicitly linked to their parent?

Lead the review with the highest-leverage finding, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Requirement** — a condition or capability that a system must satisfy,
  agreed by the relevant stakeholders.
- **Functional requirement** — what the system shall _do_: its behaviors,
  functions, and responses to inputs and conditions.
- **Quality requirement (non-functional requirement)** — how well the system
  performs some function: a measurable property with an identified metric and
  target value. Never an adjective alone.
- **Constraint** — a requirement that restricts design or implementation choices
  (technology, regulatory, budget, schedule). Constraints remove degrees of
  freedom; they are not behaviors.
- **Interface requirement** — a requirement on the external interfaces the
  system must present or conform to: APIs, protocols, data formats, UI standards.
- **Elicitation** — the activity of discovering what stakeholders want and need;
  not just asking — also observing, prototyping, and analyzing existing systems
  and documents.
- **Analysis** — examining requirements for completeness, consistency, conflict,
  and feasibility.
- **Validation** — confirming that requirements represent the stakeholders'
  actual needs (did we specify the right thing?).
- **Verification** — confirming that the system meets its specified requirements
  (did we build the thing right?).
- **Traceability** — the ability to link each requirement bidirectionally to its
  source (stakeholder/document), to design elements, and to test cases.
- **Gold-plating** — adding requirements (or implementation features) that no
  stakeholder asked for; a scope risk.
