---
name: swebok-maintenance
description: >-
  Plan, execute, or review a software maintenance change using the comprehend-
  first, impact-analysis-before-coding discipline from SWEBOK V4 Chapter 7.
  Use this whenever the work involves modifying an existing system — e.g.
  "legacy code change", "impact analysis", "software evolution", "technical
  debt", "refactoring strategy", "reverse engineering", "re-engineering",
  "maintainability review", "system comprehension", "maintenance planning",
  "modifying existing system", "maintenance cost estimation", "understanding
  unfamiliar code", "corrective maintenance", "adaptive maintenance",
  "perfective maintenance", "preventive maintenance", "change request
  analysis", "regression risk", "code comprehension". Trigger even when the
  user just says "I need to change this existing system", "how do I understand
  this codebase", or "what's the risk of this change" — the discipline of
  systematic comprehension, impact analysis, and controlled change applies,
  not just writing a patch.
---

# Software Maintenance

Maintenance is the activity of modifying a software product after delivery to
correct defects, improve performance, adapt to a new environment, or prevent
future problems. Despite being treated as a "lesser" activity, it typically
consumes 40–80% of total software lifecycle cost and is where most software
professionals spend most of their careers. The dominant failure mode in
maintenance is not technical: it is modifying code without first understanding
it.

Three ideas drive everything below:

1. **Maintenance is not a lesser form of development.** It is the dominant
   activity in a system's lifetime. The discipline it requires — systematic
   comprehension, impact analysis, controlled change, regression management —
   is harder than greenfield development, not easier. Systems that are modified
   without this discipline degrade: they become harder to change, more likely
   to regress, and eventually too expensive to maintain.
2. **Change always carries risk of regression.** Every maintenance act modifies
   a system that works in its current environment. The goal is to make exactly
   the intended change and no other. This requires understanding first, coding
   second.
3. **The four maintenance categories have different risk profiles.** Corrective
   (fixing defects), adaptive (accommodating environmental changes), perfective
   (improving functionality or performance), and preventive (reducing future
   maintenance cost) have different drivers, urgency levels, and regression
   risks. Confusing categories leads to scope creep, under-testing, and missed
   value.

## When NOT to over-apply this

A simple one-line fix with an obvious cause and no side effects doesn't need a
formal impact analysis. The discipline earns its keep for changes that touch
multiple components, alter interfaces, modify shared state, or affect
safety/security properties. State the scaling decision rather than silently
defaulting to maximal.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Classify the maintenance request and establish scope

Determine the category:

- **Corrective** — a known defect; the system does not behave as specified.
  Urgency is driven by the defect's production impact.
- **Adaptive** — a changed environment requires the system to change: OS
  upgrade, API deprecation, regulatory change, platform migration.
- **Perfective** — improvement to performance or maintainability, or new
  functionality requested by users.
- **Preventive** — refactoring to reduce future maintenance cost; latent fault
  correction before failures occur.

Scope boundaries matter: perfective work without explicit scope creeps into
unlimited enhancement. Establish clear entry criteria (what change is in scope)
and explicit out-of-scope boundaries before any code is read.

### 2. Achieve system comprehension

Do not write a single line of code until you understand the system well enough
to predict the side effects of your change. Use program comprehension
techniques: read the relevant code paths; draw control flow and data flow
through the affected area; use reverse engineering if documentation is absent
or inconsistent with the code; visualize dependencies using call graphs and
data dependency diagrams.

The depth of comprehension required scales with the change's risk. A corrective
change to an isolated utility function requires shallow comprehension. A change
to a shared state container consumed by a dozen callers requires deep
comprehension of every consumption site before touching the container.

Document comprehension findings: what the affected code actually does (not what
comments claim it does), its dependencies, and any non-obvious behavior. These
notes are an input to the impact analysis in step 3.

### 3. Perform impact analysis

For the proposed change: identify all components directly affected; trace all
indirect dependencies (callers, callers of callers, data consumers, subscribers
to changed interfaces); identify regression risks (what currently-working
behavior could be broken?); estimate effort and risk.

A formal impact analysis for a significant change must produce:

- Affected components list (direct and indirect).
- Regression test scope (which existing tests cover the affected area?).
- Risk rating (Low / Medium / High) with rationale.

Impact analysis that traces only direct callers and misses second-order effects
is the source of most maintenance-induced regressions.

### 4. Plan and execute the change

Work within the applicable change control process (even for internal changes,
at minimum: a branch, a pull request, a review before merging). Define the
testing strategy for this change: which existing tests cover the affected area?
What new tests are required? What regression scope is needed?

Execute the change with the minimum necessary footprint. Avoid opportunistic
cleanup that expands scope and regression risk — if preventive work is
warranted, create a separate maintenance request for it. Scope mixing is one
of the most common causes of maintenance-induced defects.

### 5. Validate the change and update documentation

Run the defined test suite (targeted + regression scope from step 3). Verify
the original defect is corrected or the enhancement is present. Verify that no
previously passing tests now fail.

Update all documentation made stale by the change: code comments, API docs,
architecture descriptions, runbooks, user documentation. Stale documentation
is a maintenance liability that compounds over time — the next maintainer will
trust it, and it will mislead them.

For corrective maintenance specifically: create a regression test that would
have caught the original defect if it had existed. A defect corrected without
a regression test is a defect likely to recur.

## Output format

Unless the user asks for something else, use this structure. Adapt depth to
the change's risk and the system's criticality.

```
# Maintenance Request: <System> — <Summary>

## Classification
- Category: [ ] Corrective  [ ] Adaptive  [ ] Perfective  [ ] Preventive
- Priority: [ ] Critical  [ ] High  [ ] Medium  [ ] Low
- Urgency (for corrective): [ ] Production down  [ ] Degraded  [ ] Workaround available

## Scope
- Change requested: ___
- Explicitly out of scope: ___

## System comprehension notes
- Relevant code paths: ___
- Dependencies identified: ___
- Known risks or non-obvious behavior: ___

---

# Impact Analysis: <Change Summary>

## Directly affected components
| Component | Nature of change | Owner |

## Indirect dependencies at risk
| Component | Dependency type | Regression risk |

## Risk assessment
- Overall risk: [ ] Low  [ ] Medium  [ ] High
- Rationale: ___

## Testing plan
- Targeted tests (for the change itself): ___
- Regression scope: ___
- New tests required: ___

## Technical debt assessment
- Does this change increase technical debt? If so: ___
- Is there preventive work warranted alongside this change? ___
```

## Reviewing a proposed or completed maintenance change (instead of planning)

When the task is to critique or evaluate a change rather than plan it, apply
this checklist:

1. Is the maintenance category correctly identified? Corrective work should not
   silently expand into perfective; scope mixing is a risk multiplier.
2. Was the system understood before the first line was changed? If the
   comprehension step is missing, the impact analysis below it cannot be trusted.
3. Is the impact analysis complete — are indirect dependencies traced, not just
   direct callers?
4. Does the test plan cover regression risk, not just the happy path of the new
   change?
5. Is the change minimal — are there any modifications that are not required to
   achieve the stated goal?
6. Are all affected documentation artifacts updated? Stale documentation is a
   maintenance defect.
7. For corrective maintenance: is there a new regression test that would have
   caught the original defect?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Corrective maintenance** — modification to correct discovered faults
  (defects). The system does not behave as specified.
- **Adaptive maintenance** — modification to keep the software usable in a
  changed or changing environment (OS upgrade, regulation change, API
  deprecation).
- **Perfective maintenance** — modification to improve performance or
  maintainability, or to add new functionality requested by users.
- **Preventive maintenance** — modification to detect and correct latent faults
  before they become failures; refactoring to reduce future maintenance cost.
  Also called proactive maintenance.
- **Technical debt** — the accumulated cost of deferred improvements to code
  quality; like financial debt, it accrues interest over time in the form of
  increasing maintenance difficulty.
- **Impact analysis** — the activity of identifying all the components,
  artifacts, and tests that will need to change as a result of a proposed
  modification.
- **Regression** — a previously correct behavior that is broken by a subsequent
  change; the primary quality risk in maintenance.
- **Reverse engineering** — the process of analyzing existing software to
  recover its design or specification from the source code.
- **Re-engineering** — the transformation of an existing system into a new form,
  typically to improve quality, performance, or maintainability.
- **Program comprehension** — the activity of understanding what existing code
  does, how it does it, and why; a prerequisite for any non-trivial maintenance
  act.
