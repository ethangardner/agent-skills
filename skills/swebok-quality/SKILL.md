---
name: swebok-quality
description: >-
  Plan, assure, control, or review software quality using the quality
  management discipline from SWEBOK Chapter 12. Use this whenever the work
  involves defining quality objectives, selecting quality characteristics,
  planning QA or QC activities, establishing quality gates, or evaluating an
  existing quality approach — e.g. "write a quality plan", "software quality
  assurance", "SQA plan", "define quality gates", "code quality measurement",
  "defect prevention", "quality culture", "ISO 25010", "quality model",
  "quality metrics", "quality dashboard", "quality attributes", "defect
  density", "test coverage as quality metric", "quality standards", "CMMI
  quality", or "acceptance quality criteria". Trigger even when the user says
  "QA vs QC" or "quality review" — the discipline of building quality in
  through planned assurance and control activities applies, not just testing.
---

# Software Quality

Software quality is the degree to which a software product satisfies its
stated and implied requirements. Quality management is the engineering
discipline that plans, assures, controls, evaluates, and improves that degree
of satisfaction across the product's lifecycle.

The dominant failure mode in quality management is treating quality as a
testing phase rather than as a property that must be built in from requirements
through operations. Testing is a detection activity — it finds defects after
they are created. Quality management begins with prevention: defining what
quality means for this product, putting the right process in place to build it
in, and measuring the result against explicit criteria.

## Philosophy

1. **Quality is built in, not inspected in** — Detection activities (reviews,
   testing) find defects after they are created; prevention activities
   (standards, training, process improvement, quality culture) reduce the rate
   at which defects are created. Both are necessary. But prevention has the
   higher leverage: finding and removing a defect during requirements costs a
   fraction of what it costs after deployment. A quality plan that contains
   only testing activities is incomplete.

2. **Quality without a model is opinion** — "High quality" means nothing until
   you specify which quality characteristics matter for this product and how
   they will be measured. The quality model (ISO/IEC 25010 or equivalent) makes
   implicit expectations explicit, comparable, and negotiable. Without a model,
   quality debates are unmediatable because participants are arguing from
   different unstated definitions.

3. **Quality culture precedes quality process** — Process and tools only work
   in an environment where quality failures are treated as system problems
   requiring systemic solutions, not as individual failures requiring blame.
   A blame culture hides defects; a learning culture surfaces them. Culture
   is the precondition; process is the structure that operates within it.

## When NOT to over-apply this

A short-lived internal tool used by a small team may need only minimal code
review and basic test coverage — not a formal quality plan with a defect
classification scheme. The full discipline earns its keep on systems with
external users, safety or compliance obligations, or long lifetimes where
quality problems compound over time. Scale the formality to the obligations
and the lifetime of the product; state the scaling decision rather than
silently defaulting to maximal or minimal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Establish quality culture and objectives

Before defining any quality activity, establish what quality means for this
product and in this context.

- **Stakeholder expectations** — identify the parties whose quality
  expectations must be satisfied: end users, operators, sponsors, regulators,
  maintainers. Their expectations are the source of quality requirements.
- **Organizational quality policy** — what does the organization define as
  "acceptable quality" for this type of product? Is there an existing policy,
  or must one be established?
- **Applicable standards** — identify quality standards that apply: ISO 9001
  (quality management systems), ISO/IEC 25010 (product quality model),
  domain-specific standards (DO-178C for aviation software, IEC 62304 for
  medical devices, MISRA C for safety-critical embedded software). Standards
  impose obligations; missing them is a compliance gap, not a process choice.
- **Measurable quality objectives** — define quality objectives in measurable
  terms before defining quality activities. "Few bugs" is not a quality
  objective. "Defect density below 0.5 defects/KLOC at system test entry" is.
  Quality objectives are the criteria against which quality activities will
  later be evaluated.

### 2. Select the quality model and characteristics to evaluate

A quality model is a framework that names, defines, and organizes the quality
characteristics of software. Without an explicit model, quality is implicitly
defined as "passes tests" — which addresses only functional correctness and
ignores reliability, security, maintainability, usability, and the other
characteristics that determine whether a system works well over its lifetime.

- Choose the quality model applicable to this context. ISO/IEC 25010 is the
  reference model for product quality; it defines 8 top-level characteristics
  with sub-characteristics for each.
- Select the characteristics most relevant to this product. Not all
  characteristics require equal attention: a real-time safety-critical system
  prioritizes reliability and performance efficiency; an enterprise UI
  prioritizes usability and maintainability; a long-lived platform prioritizes
  maintainability and portability.
- For each selected characteristic: identify sub-characteristics to evaluate,
  define the measurement approach, and set a measurable target.

Consult `references/models.md` for the ISO/IEC 25010 taxonomy with
sub-characteristics, example metrics, tool classes, and "prioritize when"
guidance for each of the 8 top-level characteristics.

### 3. Plan quality assurance activities

Quality assurance (QA) is process-focused: it provides confidence that the
right process is being followed. QA activities evaluate the process, not the
product directly. The distinction matters — confusing QA with testing (a QC
activity) produces plans that contain only detection activities and miss
prevention entirely.

QA activity types to consider:

- **Management reviews** — at project milestones, senior stakeholders review
  progress and quality status. Purpose: ensure quality issues receive
  organizational visibility and resources.
- **Technical reviews** — design walkthroughs, architecture reviews, code
  inspections. Purpose: find defects early, transfer knowledge, and enforce
  standards.
- **Formal inspections** — structured reviews with defined roles (moderator,
  author, reviewers), entry criteria, checklists, defect logging, and formal
  follow-up. Historically the highest-yield defect-detection technique per hour
  invested. Appropriate for high-risk artifacts.
- **Process audits** — independent verification that the defined process is
  being executed: are reviews happening? Are change requests being recorded?
  Is the test plan being followed?

For each planned QA activity, specify: when it occurs (milestone trigger),
who conducts it, entry criteria (what must be true before the review starts),
exit criteria (what must be true before the review is closed), and what artifact
is produced.

### 4. Plan quality control activities

Quality control (QC) is product-focused: it finds defects in the product
through inspection and testing. QC activities do not improve the process — they
measure the product against its quality criteria.

QC activity types to consider:

- **Static analysis** — automated analysis without execution: linters (style
  and common errors), SAST (security vulnerabilities), complexity analyzers
  (cyclomatic complexity, coupling metrics). Finds defects before test
  execution; highest leverage per defect found.
- **Testing** — unit, integration, system, and acceptance testing (covered in
  the testing KA). In the quality plan, specify the testing strategy: which
  levels are required, what coverage criterion must be met at each level, and
  what quality gate must be passed before the next phase.
- **Defect tracking** — a defined process for recording defects: severity
  classification, resolution SLA by severity, tracking tool, and reporting
  cadence.
- **Quality measurement** — which metrics are collected, from which activities,
  at what frequency, and by whom. Metrics are only useful if they are visible
  and acted upon.

### 5. Execute and collect data

Run the planned QA and QC activities. This step is where planning converts to
evidence. Three disciplines govern execution:

- **Visibility** — quality data hidden in a spreadsheet or a CI dashboard
  nobody reads does not drive decisions. Surface quality metrics visibly,
  frequently, and to the people who can act on them.
- **Origin recording** — for every defect found, record the origin phase: was
  the defect introduced in requirements, design, coding, or a third-party
  integration? Origin data is the input to prevention activity prioritization
  in step 6.
- **Trend tracking** — snapshots of defect counts are less useful than trends.
  Is defect density increasing or decreasing over iterations? Is review
  effectiveness (defects found per review hour) improving? Trend data reveals
  whether quality activities are working.

### 6. Evaluate and improve

Compare quality results against the objectives defined in step 1. For each gap,
identify the root cause:

- **Process gap** — the right activity is not being done, or not being done
  consistently. Fix: adjust the quality plan and enforce it.
- **Skill gap** — the activity is done but done poorly. Fix: training, pairing,
  checklist improvement.
- **Tool gap** — the tool used does not find the defect class that is leaking.
  Fix: tool replacement or addition.
- **Culture issue** — defects are hidden rather than surfaced; process is
  followed in form but not in intent. Fix: leadership, retrospective practice,
  removal of incentives to hide defects.

Implement targeted improvement actions. Measure again. Quality improvement is a
cycle, not a one-time audit. Record improvement actions and their results — this
is the basis for organizational quality learning.

## Output format

Unless the user asks for something else (e.g., a defect classification scheme,
a quality metrics dashboard, or an SQA plan to a specific standard), use this
structure. Adapt depth to the product's scale and obligations.

```
# Software Quality Plan: <Product / Project>

## 1. Quality objectives
- Product context and quality policy
- Applicable quality standards: ___
- Quality characteristics and targets:
  | Characteristic | Sub-characteristic | Metric | Target | Measurement method |
  (From references/models.md — list only those applicable to this product)

## 2. Quality assurance activities
| Activity | When | Participants | Entry criteria | Exit criteria | Output artifact |
(Management reviews, technical reviews, formal inspections, process audits)

## 3. Quality control activities
| Activity | When | Tools | Coverage criterion | Owner |
(Static analysis, testing levels, defect tracking, quality measurement)

## 4. Defect classification
- Severity levels:
  - Critical: system unusable or data loss / safety hazard — SLA: ___
  - High: major function unavailable, no workaround — SLA: ___
  - Medium: function impaired, workaround available — SLA: ___
  - Low: cosmetic or minor inconvenience — SLA: ___
- Defect tracking tool and process: ___
- Defect origin tracking: record phase of introduction (requirements / design /
  code / integration / third-party)

## 5. Quality metrics
| Metric | Target | Measurement frequency | Data source | Owner |
(Defect density, review effectiveness, test coverage, mean time to detect,
mean time to repair, static analysis violation rate)

## 6. Quality gate criteria
| Phase gate | Quality criteria that must be met before proceeding |
(Requirements complete → design entry; design complete → coding entry;
coding complete → test entry; test complete → release)

## 7. Improvement cycle
- Quality review frequency: ___
- Quality retrospective process: ___
- Improvement action tracking tool/process: ___
- Escalation path for unresolved quality gaps: ___
```

## Reviewing an existing quality approach

When the task is to audit or evaluate rather than plan, run the workflow as a
checklist against what exists:

1. Are quality objectives stated and measurable, or only vague
   ("high quality", "few bugs")? Vague objectives cannot be evaluated.
2. Is there a quality model explicitly chosen? Or is quality implicitly defined
   as "passes tests" — with reliability, security, maintainability, and
   usability left unaddressed?
3. Is there a distinction between quality assurance (process) and quality
   control (product)? A plan that contains only testing activities has no QA.
4. Are defects classified by severity? Is there a resolution SLA, and is it
   being met?
5. Are quality metrics tracked over time — trend data, not just snapshots?
   A defect count without a trend is uninformative.
6. Is there a prevention-focused activity (process improvement, training,
   retrospective, root cause analysis) in addition to detection activities?
7. Are quality gates defined at phase transitions, or does work go from
   "not started" to "shipped" without explicit checkpoints?
8. Is the quality culture visible — are defects surfaced and discussed in
   retrospectives and reviews, or are they hidden and minimized?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Quality** — the degree to which a set of inherent characteristics of an
  object fulfills requirements (ISO 9000). Not an absolute; always relative to
  specified and implied requirements.
- **Quality characteristic** — a named, measurable property of software. The
  ISO/IEC 25010 model defines 8 top-level characteristics, each with
  sub-characteristics. Do not use "quality attribute" and "quality
  characteristic" interchangeably — in the SWEBOK context, "characteristic" is
  the precise term from the quality model.
- **Quality assurance (QA)** — process-focused activities that provide
  confidence that quality requirements will be fulfilled; evaluates whether the
  right process is being followed. QA is not testing.
- **Quality control (QC)** — product-focused activities that find defects;
  evaluates whether the product meets its quality criteria. Testing is a QC
  activity.
- **Quality improvement** — systematic actions taken to increase the
  organization's ability to meet quality requirements; addresses root causes,
  not just defect symptoms.
- **Defect** — a flaw in a software work product. A defect in code that is
  executed may cause a failure. Distinguish: defect (flaw in the artifact),
  fault (activated defect), failure (observable incorrect behavior).
- **Defect density** — number of defects per unit size (KLOC, function points)
  of software. Used as a comparative quality metric across products, teams, or
  time periods. Not useful in isolation; useful as a trend.
- **Review** — a process of systematically examining a work product to find
  defects, improve quality, or gain consensus. Includes walkthroughs (informal,
  author-led), technical reviews (peer-led, criteria-based), and formal
  inspections (structured, highest rigor).
- **Inspection** — the most rigorous form of review: structured, with defined
  roles (moderator, author, reviewer, recorder), entry criteria, checklists,
  formal defect logging, and follow-up verification. Historically the
  highest-yield defect-detection technique per hour invested.
- **Static analysis** — automated analysis of software artifacts (source code,
  configuration, models) without execution, to find defects or quality
  violations. Complements but does not replace testing.
- **Quality gate** — a formally defined checkpoint at a phase transition that
  specifies the quality criteria a work product must meet before proceeding to
  the next phase. Gates make quality objectives enforceable, not aspirational.
