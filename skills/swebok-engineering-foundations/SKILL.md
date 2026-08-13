---
name: swebok-engineering-foundations
description: >-
  Apply engineering discipline to software problems using the foundations from
  SWEBOK V4 Chapter 18. Use this whenever the work involves engineering
  problem-solving, failure analysis, or disciplined measurement — e.g.
  "engineering approach", "root cause analysis", "RCA", "5 whys", "fishbone
  diagram", "Ishikawa diagram", "fault tree analysis", "measurement theory",
  "empirical study", "experiment design", "abstraction levels",
  "encapsulation principle", "engineering standards", "simulation vs
  prototype", "engineering problem-solving", "design as problem solving",
  "empirical methods", "engineering foundations", "observation study",
  "prototype vs simulation", "measurement scale", "nominal ordinal interval
  ratio", "Industry 4.0", "cyber-physical systems". Trigger even when the user
  just says "why does this keep breaking" or "how should we approach this
  systematically" — the discipline of framing the problem, abstracting the
  solution space, and finding root causes rather than symptoms applies.
---

# Engineering Foundations

Engineering foundations ground software engineering in the broader engineering
discipline: a practice that applies scientific and mathematical knowledge to
produce artifacts meeting specified requirements within constraints of cost,
time, safety, and ethics. Chapter 18 of SWEBOK V4 covers the engineering
design process, abstraction, measurement theory, empirical methods, root cause
analysis, modeling and simulation, and the emerging context of Industry 4.0.

Three ideas drive everything below:

1. **Engineering is disciplined problem-solving under constraint.** It is not
   science (which discovers what is true) and not art (which expresses intent);
   it is the application of scientific and mathematical knowledge to produce
   artifacts that meet specified requirements within real constraints. The
   engineering discipline means the solution must be justified, not just
   working. "It works on my machine" is not an engineering answer; "it meets
   the specified requirements under the stated operating conditions, and here is
   the evidence" is.

2. **Root cause analysis, not symptom treatment, is the engineer's
   obligation.** Fixing the symptom of a failure reliably recurs; identifying
   the root cause prevents the class of failure. A system that crashes every
   Tuesday and is restarted every Tuesday has a symptom fix, not an engineering
   fix. The discipline of RCA — 5 Whys, Ishikawa diagrams, fault tree analysis
   — is what separates engineering improvement from trial and error. Apply it
   every time, not only when a failure is embarrassing.

3. **Abstraction is the engineer's primary cognitive tool.** No engineer can
   hold an entire complex system in mind at once; abstraction — levels of
   abstraction, encapsulation, hierarchy — allows reasoning about one level at
   a time while suppressing irrelevant detail. Violations of abstraction
   boundaries, where a component reaches through its interface to exploit the
   implementation of another, are engineering failures, not just style
   problems: they couple the two levels, break the hierarchy, and make
   change expensive.

## When NOT to over-apply this

For small, low-stakes problems with obvious solutions, full RCA and formal
measurement plans are overhead. Apply the complete discipline when the
problem is recurring, safety or cost consequences are significant, or the
cause is genuinely unknown. State the scaling decision rather than
silently defaulting to minimal or maximal process.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Frame the engineering problem

Distinguish the problem from its symptoms before attempting a solution:

- **What is the actual problem?** State it as a gap between the current state
  and the desired state, not as a description of what went wrong.
- **What are the constraints?** Cost, time, safety, regulatory standards,
  ethical limits, operational environment.
- **What does "good enough" mean?** The acceptance criterion must be stated
  before design begins, not discovered after delivery.
- **What are the assumptions?** Every engineering solution is conditional;
  unstated assumptions become surprises in production.

Do not proceed to design until the problem frame is clear. A precise solution
to the wrong problem is waste.

### 2. Select an appropriate abstraction strategy

Determine how to decompose and encapsulate the problem:

- **What levels of abstraction apply?** From domain concepts at the top to
  implementation mechanisms at the bottom — identify the levels relevant to
  this problem and what each level is responsible for.
- **What is encapsulated at each level?** Each level should hide one design
  decision from the levels above it. Name the decision explicitly.
- **What is exposed at each interface?** The interface is a contract; it
  specifies what callers may rely on and what implementers may change.
- **What alternate abstractions serve different stakeholders?** An operations
  team and a development team may need different views of the same system.
  Both can be valid; inconsistency between them is not.

Violations of abstraction — reaching through an interface to use internal
details — should be identified and flagged explicitly, not tolerated as
"pragmatic shortcuts."

### 3. Model, simulate, or prototype

Choose the tool based on cost, risk, and what question needs answering:

- **Analytical model** — use when you need to reason about structural
  properties (correctness, consistency, completeness) before building anything.
  Cheapest. Cannot exercise dynamic behavior.
- **Simulation** — use when dynamic behavior under load, over time, or under
  failure conditions must be explored before committing to an implementation.
  More expensive than a model; cheaper than a prototype. Cannot generate
  stakeholder feedback on user experience.
- **Prototype** — use when stakeholder feedback on behavior, interface, or
  user experience is required. Most expensive of the three. Not a production
  artifact unless explicitly planned to be.

State what question each approach will answer and, equally importantly, what it
will not answer — so the gap is visible before the next phase begins.

### 4. Measure and observe

Define measurement before data collection, not after:

- **What attribute is being measured?** State it precisely: "response time
  under peak load" is an attribute; "performance" is not.
- **What scale type applies?**
  - _Nominal_ — categories with no ordering (e.g., defect type).
  - _Ordinal_ — ordered categories without equal intervals (e.g., severity:
    low/medium/high).
  - _Interval_ — ordered with equal intervals but no true zero (e.g.,
    calendar date).
  - _Ratio_ — ordered, equal intervals, true zero (e.g., response time,
    defect count). Most arithmetic is only valid on ratio scales.
- **How will data be collected?** Instrument the system, run a controlled
  experiment, or conduct an observational study. Distinguish correlation from
  causation: controlled experiments establish causation; observational studies
  do not.
- **What validity threats exist?** Confounding variables, selection bias,
  measurement instrument error. Name them and state mitigations.

Scale type determines what statistical operations are valid. Averaging ordinal
data — "average severity score" — is a measurement theory error.

### 5. Perform root cause analysis and improve

Apply RCA every time a failure or defect class recurs:

**5 Whys technique:**
Ask "Why did this happen?" and answer with the immediate cause. Then ask why
that cause occurred. Repeat until you reach a cause that is actionable and
whose elimination would prevent the class of failure — typically 3–7 levels
deep. Stop when you reach a cause you can actually fix, not when you reach
organizational or political discomfort.

**Ishikawa (fishbone) diagram:**
Organize potential causes into categories (e.g., people, process, tools,
environment, requirements, design) to surface root causes in complex failures
where a single causal chain is unlikely. Branch each category into specific
cause hypotheses. Eliminate hypotheses with data.

**Fault tree analysis:**
Work top-down from the failure event, identifying combinations of lower-level
events (AND/OR gates) that produce it. Use for safety-critical failures where
combinations of failures, not single causes, are the concern.

After identifying the root cause:

- Implement a root-cause-based corrective action — one that eliminates the
  cause, not just the symptom.
- Verify that the corrective action eliminates the failure class (not just
  the specific instance) by observing the system after the fix.
- Document the cause and fix so the knowledge propagates to similar systems.

## Output format

Unless the user asks for something else, use this structure.

```
# Engineering Analysis: <system / problem>

## 1. Problem frame
- Problem (distinct from symptoms)
- Constraints (cost, time, safety, ethics, standards)
- Definition of "good enough"
- Assumptions

## 2. Abstraction strategy
- Levels of abstraction identified
- What is encapsulated at each level
- Alternate abstractions for different stakeholders

## 3. Model / simulation / prototype plan
- Approach chosen and why
- What questions it will answer
- What it will not answer (and why that is acceptable)

## 4. Measurement plan
| Attribute | Scale type | Measurement method | Collection point |

## 5. Root cause analysis (if failure occurred)
- Symptom observed
- 5 Whys chain / fishbone branches
- Root cause identified
- Corrective action (root-cause-based)
- Verification that root cause is eliminated
```

## Reviewing an existing engineering approach (checklist mode)

When the task is to evaluate an existing design, process, or failure response
rather than author one, run the workflow as a checklist:

1. Is the problem stated as a gap between current and desired state — or is a
   symptom being treated as the problem?
2. Are constraints and acceptance criteria stated explicitly and measurably?
3. Are abstraction levels identified? Is each level's encapsulation boundary
   respected, or are there cross-level dependencies?
4. Is the modeling / simulation / prototyping choice matched to the question
   being answered?
5. Are measurements defined before data collection? Are scale types correct for
   the statistical operations applied?
6. When a failure occurred: was RCA performed to root cause, or was a symptom
   fix applied?
7. Is the corrective action root-cause-based — or does it address only the
   specific instance?
8. Is there evidence that the corrective action eliminated the failure class?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **Engineering design** — a problem-solving activity constrained by
  requirements, resources, and standards; produces an artifact specification,
  not a discovery.
- **Abstraction level** — a layer of description that exposes selected
  properties while hiding implementation details of the layer below.
- **Encapsulation** — the hiding of a design decision behind an interface so
  that the decision can be changed without affecting components that use the
  interface.
- **Hierarchy** — a structure of abstraction levels where each level depends
  only on the interface of the level immediately below it.
- **Alternate abstraction** — a different view of the same system serving a
  different stakeholder concern; multiple valid abstractions can coexist.
- **Measurement theory** — the study of the relationships between attributes
  and the numbers assigned to represent them; determines what mathematical
  operations are meaningful for a given scale.
- **Nominal / ordinal / interval / ratio scale** — measurement scale types in
  ascending order of mathematical strength; arithmetic is only fully valid on
  ratio scales.
- **Root cause analysis (RCA)** — a structured method for identifying the
  underlying cause of a failure or defect class, rather than its symptoms.
- **5 Whys** — an iterative RCA technique that asks "why?" repeatedly until
  reaching an actionable root cause.
- **Ishikawa (fishbone) diagram** — a cause-and-effect diagram organizing
  potential causes into categories to support RCA in complex failures.
- **Fault tree analysis** — a top-down deductive technique modeling failure
  combinations using AND/OR gates; used for safety-critical RCA.
- **Empirical method** — a method for acquiring knowledge through observation
  and experiment rather than reasoning alone.
- **Controlled experiment** — a study in which an independent variable is
  deliberately varied while confounds are held constant; establishes causation.
- **Simulation** — an executable model of a system's dynamic behavior; used to
  explore behavior under conditions that are costly or risky to produce in a
  real system.
- **Prototype** — an incomplete implementation of a system built to answer a
  specific question (feasibility, user feedback, interface design); not
  necessarily a production artifact.
- **Industry 4.0** — the integration of cyber-physical systems, IoT, cloud
  computing, and AI into industrial engineering; introduces software as a
  first-class engineering component in physical manufacturing and
  infrastructure systems.
- **Cyber-physical system** — a system in which embedded software continuously
  monitors and controls physical processes; failures have physical consequences.
