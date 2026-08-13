---
name: swebok-process
description: >-
  Define, select, tailor, measure, or improve a software development process
  using the lifecycle model discipline from SWEBOK V4 Chapter 10. Use this
  whenever the work involves choosing or evaluating a development process or
  lifecycle model — e.g. "software process", "lifecycle model", "SDLC",
  "choose a development process", "waterfall vs agile", "process definition",
  "process improvement", "CMMI", "process assessment", "lifecycle definition",
  "DevOps process", "spiral model", "V-model", "process tailoring", "process
  measurement", "agile process", "process maturity". Trigger even when the
  user just says "how should we structure our development process" or "should
  we use waterfall or agile" — the discipline of matching lifecycle model to
  project risk characteristics, not to fashion or habit, applies.
---

# Software Engineering Process

A software process is a set of activities, methods, practices, and
transformations that people use to develop and maintain software and its
associated products. A lifecycle model is the abstract description of the
major phases of a software process and the relationships among them. Choosing
the wrong lifecycle model — or applying a model without tailoring it to the
project's actual characteristics — is an architectural decision with
consequences that propagate through every subsequent management and engineering
activity.

Three ideas drive everything below:

1. **No ideal process exists.** Every lifecycle model is a model, and every
   model is wrong in some context. Waterfall is not obsolete; it is appropriate
   in specific conditions (stable requirements, safety-critical certification,
   fixed-price contracts). Agile is not universally superior; it trades
   documentation and traceability for adaptability, which is the wrong trade in
   regulated or safety-critical environments. The goal is to select and tailor
   a process appropriate to the project's actual characteristics, not to follow
   a methodology because it is fashionable or because the team already knows it.

2. **Process and product quality are linked.** The quality of the process
   influences the quality of the product. A process that cannot be observed
   cannot be managed; a process that cannot be measured cannot be improved. An
   organization that installs a process but does not measure it has added
   ceremony without adding control. Every deployed process requires at least
   minimal measurement to determine whether it is producing the intended
   outcomes.

3. **Lifecycle model selection is a risk management decision.** Choosing
   waterfall vs. iterative vs. agile is not a team preference; it is a
   decision about where to place risk. Waterfall front-loads risk in
   requirements (betting that requirements are correct before any code is
   written). Agile distributes risk across iterations (betting that frequent
   feedback will correct direction faster than up-front specification).
   Spiral makes risk explicit as the primary driver of each cycle. Choosing a
   model without analyzing the project's risk profile is an arbitrary decision
   with non-arbitrary consequences.

## When NOT to over-apply this

A solo developer building a personal project does not need a process definition
document, process metrics, or a CMMI assessment. The full discipline earns its
keep when multiple people must coordinate, when external stakeholders have
commitments that depend on predictable delivery, or when the process will run
across multiple years or multiple teams. State the scaling decision rather than
silently defaulting to maximal or minimal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Characterize the project

Before selecting a process, establish the conditions that will constrain and
inform the selection. Answer these questions explicitly — "it depends" is a
symptom of not having answered them:

- **Requirements stability** — are the requirements well-understood and unlikely
  to change significantly, or are they uncertain, evolving, or subject to
  stakeholder discovery? Stable requirements favor front-loading specification;
  unstable requirements favor iterative delivery and frequent feedback.
- **Team size and distribution** — small co-located teams can coordinate
  informally; large or distributed teams require explicit process structure to
  manage interfaces and dependencies.
- **Criticality and safety** — does a defect in this system cause financial
  loss, safety risk, or regulatory violation? High-criticality systems may
  require formal methods, rigorous traceability, and lifecycle models that
  support certification (V-model, waterfall with stage gates).
- **Regulatory and contractual constraints** — are there process constraints
  imposed externally? ISO 9001, DO-178C, IEC 62304, and government contracts
  each impose lifecycle and documentation requirements that override team
  preference.
- **Stakeholder availability** — are product owners or domain experts available
  frequently enough to support iterative feedback? Agile processes fail when
  stakeholders are unavailable for regular review.
- **Technology and domain novelty** — is the technology well-understood, or is
  the project exploring new technical ground? High technical novelty increases
  risk and favors risk-driven or iterative models.

### 2. Select and tailor a lifecycle model

Match the lifecycle model to the characteristics identified in step 1. Use the
guidance below to reason about the tradeoffs explicitly.

**Waterfall (sequential).** Requirements → Design → Implementation → Test →
Deployment. Each phase produces a complete artifact before the next begins.
_Use when:_ requirements are well-understood and stable, technology is
familiar, the contract or regulatory environment requires complete documentation
at each phase, or the cost of late change is manageable because scope is small.
_Risk:_ defects in requirements are not discovered until test; late-phase
failures are expensive. _Not appropriate for:_ novel domains where requirements
will be discovered through use, or systems where early delivery of partial
value is important.

**V-model.** Extends waterfall by making verification and validation explicit
counterparts to each development phase: requirements ↔ acceptance testing;
system design ↔ system testing; detailed design ↔ integration testing;
implementation ↔ unit testing. _Use when:_ certification evidence is required
(safety-critical systems, regulated devices); traceability from requirements
to test is mandatory. _Risk:_ same as waterfall on the left side; testing is
still late relative to development.

**Incremental.** The full system is defined up-front and built in increments,
each adding functionality. Each increment delivers working software to users.
_Use when:_ requirements are known but delivery of partial value is useful;
risk can be reduced by delivering and validating subsystems before the full
system is complete.

**Iterative.** The system is built in cycles (iterations), each refining the
product based on feedback from the previous iteration. Requirements evolve
through use. _Use when:_ requirements are partially understood or subject to
change; user feedback is available between iterations; early delivery of
working software reduces risk.

**Agile (Scrum / Kanban).** Short-cycle iterative and incremental development
with continuous stakeholder involvement, adaptive planning, and emphasis on
working software over documentation. _Use when:_ requirements are volatile
or emergent; product owners are available for frequent feedback; the team is
small to medium-sized; organizational culture supports self-organization.
_Risk:_ reduced traceability and documentation may disqualify it from
regulated environments; velocity-based planning requires stable team
composition. _Scrum_ is sprint-based with fixed cadence; _Kanban_ is
flow-based with no fixed cadence — choose based on whether work arrives in
batches (Scrum) or continuously (Kanban).

**Spiral.** Risk-driven iterative model organized into four quadrants per
cycle: objectives and constraints, risk evaluation and reduction, development
and validation, planning of the next cycle. _Use when:_ technical or
requirements risks are high; the cost of a failed project is high enough to
justify the overhead of explicit risk analysis each cycle; the project is
large or long-running.

**DevOps / Continuous delivery.** Extends agile with continuous integration,
continuous delivery, automated testing, and monitoring in production.
Deployment is an automated, frequent event rather than a project milestone.
_Use when:_ the system is a live service that must be evolved in production;
deployment risk can be managed through automated testing and deployment
pipelines; the team owns both development and operations.

**Tailoring.** No lifecycle model is applied verbatim. Define explicitly:
which phases and activities from the base model are included, which are
modified, which are omitted and why. Tailoring decisions must be documented;
undocumented tailoring is process drift, not process adaptation.

### 3. Define process activities and artifacts

For the selected and tailored lifecycle model, specify what work is done and
what is produced at each phase or iteration. This makes the process operational
rather than abstract.

For each phase or iteration type, define:

- **Activities** — what work is performed in this phase (e.g., elicit
  requirements, develop architectural design, write unit tests, conduct
  integration testing)?
- **Entry criteria** — what must be true before this phase begins? Entry
  criteria prevent phases from starting before their inputs are ready.
- **Exit criteria** — what must be true before this phase is complete? Exit
  criteria define "done" and prevent phases from ending prematurely under
  schedule pressure.
- **Work products (artifacts)** — what documents, models, code, or other
  artifacts are produced? Specify the required artifact for each activity:
  its purpose, required content, and who reviews and approves it.
- **Roles and responsibilities** — who is accountable for each activity and
  each artifact?

### 4. Establish process measurement

A process without measurement cannot be managed or improved. Apply GQM to
derive process metrics from management goals (see swebok-management for the
full GQM treatment).

Typical process measurement areas:

- **Schedule conformance** — are phases starting and ending when planned?
- **Effort by activity** — is the effort distribution across activities (e.g.,
  requirements vs. coding vs. testing) consistent with plan and with historical
  norms? Unexpected distributions signal process problems.
- **Defect origin** — where in the lifecycle are defects being introduced?
  A high rate of defects originating in requirements signals a process
  weakness in requirements elicitation or review.
- **Review effectiveness** — defects found per review hour; defects escaping
  each review phase. Low effectiveness signals checklist quality or reviewer
  skill issues.
- **Rework ratio** — effort spent reworking artifacts vs. producing them.
  High rework indicates upstream process quality problems.

Define collection points (when data is collected), collection method (how),
and baseline targets. Without baselines, measurement data has no reference
for comparison.

### 5. Assess and improve

Process improvement is a cycle. Compare measurement data to baselines and
goals; identify gaps; implement targeted improvements; re-measure.

- **Retrospectives** — in iterative and agile contexts, conduct a retrospective
  at the end of each iteration. Ask: what worked, what did not, and what will
  we change next iteration? Retrospectives are process improvement in
  continuous mode; they must produce action items with owners and due dates,
  not just observations.
- **Process reviews** — in plan-driven contexts, conduct periodic process
  reviews comparing actual process execution to the defined process. Identify
  deviations, determine whether deviations are process violations (enforce)
  or signals that the process definition is wrong (update the process).
- **Capability assessments** — formal assessments against CMMI (Capability
  Maturity Model Integration) or ISO/IEC 330xx (process assessment standard)
  evaluate process capability across practice areas. Use to identify systemic
  weaknesses and benchmark against industry norms. Formal assessment is
  appropriate when an organization is pursuing a capability target for
  contractual or strategic reasons.
- **Improvement actions** — implement improvements in a controlled way. An
  improvement that is never measured for effect is an intervention, not an
  improvement. For each improvement action: state the problem it addresses,
  the expected effect, the metric that will show whether it worked, and the
  review date.

## Output format

Unless the user asks for something else, use this structure. Adapt depth to
the project's characteristics and formality needs.

```
# Process Definition: <Project / Team Name>

## 1. Project characterization
- Requirements stability: [High / Medium / Low] — rationale: ___
- Team size and distribution: ___
- Criticality and safety constraints: ___
- Regulatory / contractual process constraints: ___
- Stakeholder availability for feedback: ___
- Technology and domain novelty: ___

## 2. Lifecycle model selection
- Selected model: ___
- Rationale: (why this model fits the characterization above)
- Tailoring decisions: (what is modified or omitted from the base model, and why)

## 3. Phase / iteration table
| Phase or iteration type | Activities | Entry criteria | Exit criteria | Artifacts | Owner |

## 4. Process measurement plan
| Goal | Question | Metric | Collection point | Baseline | Owner |

## 5. Improvement cadence
- Retrospective / review frequency: ___
- Improvement action tracking: ___
- Escalation path for persistent process failures: ___
```

If asked to choose between two specific lifecycle models, still apply the
discipline silently: characterize the project first, then evaluate each model
against the characterization — do not default to agile because it is popular
or waterfall because the contract demands documentation.

## Reviewing an existing process definition (checklist mode)

When the task is to critique or evaluate rather than define, run the workflow
as a checklist:

1. Is the lifecycle model explicitly chosen and documented, or is the team
   following a process by habit without naming it?
2. Is the model selection justified by the project's actual characteristics
   (requirements stability, criticality, stakeholder availability), or chosen
   by default?
3. Are tailoring decisions documented? Or is the team following a published
   methodology with undocumented deviations?
4. Does each phase or iteration have explicit entry and exit criteria, or does
   work flow between phases informally?
5. Are required artifacts defined, or is it unclear what "done" means for any
   given activity?
6. Is there a measurement plan that connects metrics to management goals via
   GQM, or are metrics collected because they are available?
7. Are retrospectives or process reviews producing action items with owners, or
   generating observations that are filed and forgotten?
8. Is the process matched to the team's actual regulatory or contractual
   constraints? Missing regulatory requirements is a compliance gap, not a
   process tailoring decision.

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Software process** — the set of activities, methods, practices, and
  transformations used to develop and maintain software and its associated
  products. Includes both technical activities (designing, coding) and
  management activities (planning, reviewing).
- **Lifecycle model** — an abstract description of the major phases of a
  software development process and the relationships (ordering, overlap,
  iteration) among them.
- **Process tailoring** — the adaptation of a standard lifecycle model to the
  specific constraints and characteristics of a project or organization.
  Must be documented; undocumented tailoring is drift, not adaptation.
- **Entry criteria** — the conditions that must be satisfied before a phase or
  activity may begin. Enforces readiness; prevents downstream work from
  starting before its inputs exist.
- **Exit criteria** — the conditions that must be satisfied before a phase or
  activity is considered complete. Defines "done" objectively; prevents
  premature closure under schedule pressure.
- **GQM (Goal-Question-Metric)** — a paradigm for selecting metrics by deriving
  them from answerable questions that operationalize management goals. See
  swebok-management for full treatment.
- **CMMI (Capability Maturity Model Integration)** — a process improvement
  framework organized into practice areas and capability levels. Used to assess
  an organization's process capability and identify improvement priorities.
  Not a lifecycle model — it assesses process capability, not process
  structure.
- **Process capability** — the inherent ability of a process to produce
  defined results within defined limits. A capable process produces consistent,
  predictable outcomes; an incapable process produces variable outcomes
  regardless of individual effort.
- **Retrospective** — a structured meeting at the end of an iteration or phase
  in which the team examines its process and identifies improvement actions.
  The defining product of a retrospective is specific, owned action items —
  not a list of observations.
- **Process assessment** — a structured evaluation of a process against a
  reference model (CMMI, ISO/IEC 330xx) to determine capability level and
  identify gaps. Used to support process improvement programs or satisfy
  contractual requirements.
- **Retirement** — the deliberate removal of a software system from service,
  including data migration, user transition, and archival of system artifacts.
  A lifecycle phase that is often unplanned and therefore poorly executed;
  retirement activities should be defined in the process definition before
  the system goes into production.
