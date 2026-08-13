---
name: swebok-management
description: >-
  Plan, track, or review a software project using the initiation, measurement,
  planning, enactment, and closure discipline from SWEBOK V4 Chapter 9. Use
  this whenever the work involves managing a software project — e.g. "project
  plan", "project planning", "SE management", "software project manager",
  "estimation", "schedule", "project tracking", "risk management plan",
  "resource planning", "project closure", "measurement plan", "GQM", "goal
  question metric", "software metrics", "project review", "earned value",
  "project initiation", "scope definition", "project kickoff", "project
  charter". Trigger even when the user just says "how should I plan this
  project" or "we are going over schedule" — the discipline of grounding
  management decisions in measurement and controlling scope before committing
  to a plan applies, not just a list of tasks to assign.
---

# Software Engineering Management

Software engineering management applies the principles of management to the
planning, execution, and control of software projects. It spans the full
lifecycle of a project: from defining its scope and feasibility, through
planning and executing, to evaluating performance and closing the project in a
controlled way. The dominant failure mode is not technical: it is committing to
a plan without understanding the scope, and executing without measuring progress
against it.

Three ideas drive everything below:

1. **Measurement drives management.** You cannot control what you cannot
   measure. The Goal-Question-Metric (GQM) paradigm provides the discipline for
   choosing metrics that answer real management questions rather than metrics
   that are easy to collect. Measuring lines of code when the management
   question is "will we be late?" is not measurement — it is data collection
   without intent. Every metric must trace to a goal and through an answerable
   question.

2. **Planning is a model of uncertainty, not a commitment to accuracy.** A
   project plan is not a contract with the future; it is the current best model
   of how the work will unfold given what is known today. The value of planning
   is in the reasoning it forces — identifying dependencies, surfacing risks,
   exposing resource conflicts — not in the accuracy of the numbers. Plans must
   be revised as reality departs from assumptions; a plan that is never revised
   is not being used to manage.

3. **Scope is the root of most project failures.** Undefined or unstable scope
   propagates uncertainty through every subsequent plan: estimates are wrong
   because the work is unknown, schedules slip because unplanned work appears,
   and quality suffers because the team is always reacting. Scope definition is
   the first management act, not a formality to complete before the "real" work
   begins.

## When NOT to over-apply this

A two-person spike lasting one week does not need a formal project charter,
a risk register, or an earned-value tracking system. The full discipline earns
its keep when projects have external stakeholders, formal commitments, multiple
teams, or durations beyond which informal coordination breaks down. Scale the
formality to the commitment level and the cost of failure; state the scaling
decision rather than silently defaulting to maximal or minimal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Establish initiation and scope

Define what the project is before committing to when or how much. Without a
clear scope, no estimate is meaningful and no plan is trustworthy.

- **System of interest** — what software system is being built or changed?
  What are its boundaries, its interfaces to external systems, and what is
  explicitly out of scope?
- **Stakeholders** — who has interests in the project outcome? Identify
  customers, end users, operators, sponsors, regulators, and the development
  team. Each stakeholder class may have conflicting expectations; surface
  conflicts early.
- **Feasibility** — assess technical, resource, schedule, and organizational
  feasibility before committing. A technically possible project that exceeds
  available budget or requires unavailable skills is not feasible.
- **Project charter** — produce a brief charter capturing: project objective,
  scope boundaries, key stakeholders and their roles, high-level constraints
  (budget ceiling, regulatory obligations, technology mandates), and the
  authority and accountability of the project manager.

### 2. Plan the measurement program [→ consult `references/estimation-methods.md` for size/effort estimation]

Define what will be measured before defining the plan. The GQM paradigm
structures measurement in three levels:

- **Goal** — the management goal motivating the measurement (e.g., "understand
  whether the project will deliver on schedule").
- **Question** — the operational question that, if answered, would indicate
  whether the goal is being achieved (e.g., "Is actual progress tracking
  against planned progress?").
- **Metric** — the quantitative or qualitative measure that answers the question
  (e.g., "planned story points completed vs. actual story points completed per
  sprint").

For each management goal, define the complete GQM chain before coding begins.
Specify: what data will be collected, who collects it, at what frequency, how
it will be stored, and who acts on it. Metrics that are collected but never
reviewed are waste.

Key measurement areas for most projects:

- **Size** — function points, story points, lines of code (for calibration
  only, not tracking). Consult `references/estimation-methods.md` for
  appropriate size estimation methods by project context.
- **Effort and cost** — planned vs. actual person-hours by activity.
- **Schedule** — planned vs. actual milestone completion; earned value if
  formal tracking is required.
- **Defects** — defect arrival rate, open defect count by severity, mean time
  to repair.
- **Quality** — test coverage, code complexity, review effectiveness.

### 3. Plan the project

Produce a project plan that covers scheduling, resources, budget, risk,
quality, and communication. The plan is the current model; it will be revised.

- **Work breakdown structure (WBS)** — decompose the scope into a hierarchy of
  manageable work packages. Each work package should be estimable, assignable,
  and verifiable.
- **Schedule** — sequence work packages, assign durations (using estimation
  methods from `references/estimation-methods.md`), identify the critical path,
  and build in schedule contingency proportional to estimation uncertainty.
- **Resource plan** — identify required skills, assign personnel, flag
  availability conflicts, and identify external dependencies (tools, training,
  third-party components).
- **Budget** — aggregate effort estimates to cost; include contingency.
- **Risk register** — for each identified risk: description, probability,
  impact, risk score (probability × impact), mitigation action, trigger
  condition, and owner. A risk register with no owners and no triggers is a
  list of worries, not a management tool.
- **Quality plan** — define quality objectives, quality gates at phase
  transitions, and the QA/QC activities planned for each phase (refer to
  swebok-quality if this needs elaboration).
- **Communication plan** — specify: who receives project status information,
  at what frequency, in what format, and through what channel.

### 4. Enact the project

Execute the plan. Management during enactment is the discipline of keeping
execution aligned with the plan — or revising the plan when alignment is no
longer achievable.

- **Track progress** — compare actuals to plan at defined cadence. Do not
  rely on self-reports of percentage completion; use objective measures
  (milestones passed, test cases passed, defects closed).
- **Conduct reviews** — hold scheduled technical and management reviews.
  Technical reviews assess the work product; management reviews assess
  project status and risk exposure.
- **Manage changes** — all changes to scope, schedule, or resources must go
  through a defined change control process. Uncontrolled scope changes are
  the primary mechanism by which projects exceed their budgets.
- **Manage risks** — monitor risk trigger conditions. When a risk trigger fires,
  execute the mitigation plan. Update the risk register after every management
  review.

### 5. Review and evaluate performance

Periodically compare actuals to plan and determine whether the current plan
is still achievable. This is distinct from day-to-day tracking (step 4) — it
is a scheduled, deliberate evaluation that may trigger replanning.

- **Variance analysis** — calculate schedule variance (SV) and cost variance
  (CV) using earned value where applicable. A project that is 50% through its
  schedule but has consumed 70% of its budget is not on track.
- **Replan triggers** — define explicit thresholds: if SV or CV exceeds ±10%,
  escalate and replan. Thresholds should be defined in the project plan, not
  chosen reactively when a crisis occurs.
- **Corrective action** — identify root causes of variance; select corrective
  actions (scope reduction, resource addition, schedule extension, risk
  acceptance). Communicate changes to all stakeholders.

### 6. Close the project

Project closure is a management act, not the natural end of coding. Closure
is incomplete if it is not deliberate.

- **Closure criteria** — define what "done" means before the project starts.
  Closure criteria typically include: all planned deliverables accepted,
  defects below a defined threshold, all contractual obligations fulfilled,
  all assets transferred or archived.
- **Closure activities** — formal customer acceptance, final status report,
  contract closeout, release of team members to other assignments.
- **Lessons learned** — conduct a structured retrospective. Document what went
  well, what did not, and what should be done differently. File lessons learned
  where they will be consulted on future projects — a lessons-learned document
  that is never read improves nothing.
- **Archive** — archive project artifacts (plans, requirements, design
  documents, test results, closure report) so they are retrievable for future
  maintenance, audits, or analogous estimation on future projects.

## Output format

Unless the user asks for something else, use this structure. Adapt depth to
the project's scale and commitment level.

```
# Project Management Plan: <Project Name>

## 1. Initiation and scope
- System of interest and scope boundaries
- Key stakeholders and roles
- Feasibility assessment summary
- Constraints (budget ceiling, regulatory obligations, technology mandates)

## 2. Measurement program (GQM)
| Goal | Question | Metric | Collection method | Frequency | Owner |

## 3. Work breakdown structure
(Hierarchical decomposition — paste or sketch top 2 levels here)

## 4. Schedule
- Key milestones and dates
- Critical path
- Schedule contingency rationale

## 5. Resource plan
| Role | Assigned to | Availability | Skills required |

## 6. Risk register
| ID | Risk description | Probability | Impact | Score | Mitigation | Trigger | Owner |

## 7. Quality plan
- Quality objectives and targets
- Quality gates at phase transitions
- QA/QC activities by phase

## 8. Communication plan
| Audience | Content | Frequency | Format | Owner |

---

# Project Status Report: <Project Name> — <Date>

## Summary
- Status: Green / Yellow / Red
- Period covered: ___
- % complete (planned vs. actual): ___

## Progress
- Milestones completed this period: ___
- Milestones planned but not completed: ___

## Schedule variance
- Planned earned value (PEV): ___
- Actual earned value (AEV): ___
- Schedule variance (SV = AEV − PEV): ___

## Issues and risks
| ID | Description | Status | Action | Owner | Due date |

## Next period plan
(What will be completed before the next status report?)
```

If asked to estimate rather than plan, still apply the discipline silently:
choose the estimation method appropriate to the data available (from
`references/estimation-methods.md`), state the cone of uncertainty, and do not
report a single-point estimate without a range.

## Reviewing an existing project plan (checklist mode)

When the task is to critique or evaluate rather than author, run the workflow
as a checklist:

1. Is scope explicitly defined and bounded? Are out-of-scope items stated?
2. Is there a GQM measurement plan, or are metrics collected without management
   goals driving them?
3. Are estimates traceable to an estimation method, or are they guesses dressed
   as numbers?
4. Does the risk register have owners and trigger conditions, or is it a list
   of worries?
5. Are quality gates defined at phase transitions, or is quality implicitly
   "checked at the end"?
6. Is the communication plan explicit about frequency, content, and audience?
7. Are closure criteria defined, or is closure determined by the calendar?
8. Is there a lessons-learned process that feeds future projects?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Scope** — the defined boundary of what the project will and will not
  deliver. The primary input to planning and the primary driver of estimation.
- **Work breakdown structure (WBS)** — a hierarchical decomposition of the
  total scope into deliverable-oriented work packages that define what will
  be done, not how.
- **GQM (Goal-Question-Metric)** — a paradigm for measurement planning in which
  each metric is derived from an answerable question that operationalizes a
  management goal. Metrics without goals are data without purpose.
- **Earned value** — a technique for measuring project performance by comparing
  the planned value of work scheduled (PEV), the actual value of work performed
  (AEV), and the actual cost incurred (AC). Enables objective schedule and cost
  variance calculation.
- **Schedule variance (SV)** — AEV minus PEV; negative SV means the project is
  behind schedule. Distinct from calendar slip: a project can be calendar-late
  but earned-value-on-schedule if scope was reduced.
- **Risk register** — the authoritative record of identified project risks,
  including probability, impact, mitigation, trigger condition, and owner. A
  living document reviewed at every management review.
- **Project charter** — the document that formally authorizes a project and
  grants the project manager authority to apply resources. Captures objectives,
  scope, stakeholders, and constraints.
- **Closure criteria** — the explicit, pre-agreed conditions that must be
  satisfied before a project is declared complete. Must be defined before
  the project starts, not when it is about to end.
- **Lessons learned** — a structured retrospective artifact capturing what
  worked, what did not, and what process changes are recommended. Useful only
  if it is consulted on future projects.
- **Replanning** — the deliberate revision of the project plan in response to
  variance or changed assumptions. Not an admission of failure — a plan that
  is never revised is not being used to manage.
