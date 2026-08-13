# Estimation Methods Catalog

Used during project planning (workflow step 2–3) to select an appropriate
size and effort estimation method. The right method depends on what is known
at the time of estimation, the project type, and how the estimate will be used.

**How to use this catalog**

1. Identify what data is available now (requirements stability, historical data,
   team velocity, analogous projects).
2. Consult the method-selection table at the bottom to narrow the candidate
   set.
3. Apply the chosen method using the guidance below.
4. State the cone of uncertainty for the estimate — a single-point estimate
   without a range is not an estimate, it is a wish.

Never report an estimate without the method used to derive it. A number without
a method cannot be validated, calibrated, or defended.

---

## Expert Judgment (Delphi / Wide-Band Delphi)

**What it is.** Structured elicitation of estimates from domain experts,
optionally with an iterative convergence process (wide-band Delphi) to reduce
anchoring and groupthink.

**Use when.** The work is novel or poorly defined; no historical data is
available; the team has experienced engineers who have done similar work before.

**Process.** Each estimator independently produces an estimate. Estimates are
revealed simultaneously. Outliers explain their reasoning. The group converges
over multiple rounds. Wide-band Delphi adds a facilitator and requires
rationales before convergence.

**Strengths.** Fast to apply; captures tacit knowledge; works without
historical data; expert intuition incorporates factors that models miss.

**Limitations.** Subject to anchoring (first estimate heard biases others),
groupthink, optimism bias, and authority bias. Wide-band Delphi mitigates
most of these when run correctly. Not calibratable — you cannot improve the
method by comparing its outputs to actuals unless you track individual
estimators over time.

**Output.** A range (optimistic, most likely, pessimistic) with a rationale.
Never a single point from expert judgment alone.

---

## Algorithmic Models (COCOMO II, Function Points)

**What it is.** Parametric models that derive effort or cost from measurable
software size attributes using calibrated equations.

**Use when.** Historical project data is available to calibrate the model;
requirements are stable enough to measure size; the project is large enough
that the setup cost of calibration is justified.

**COCOMO II.** Estimates effort (person-months) from source lines of code
(SLOC) using scale factors (precedentedness, development flexibility,
architecture/risk resolution, team cohesion, process maturity) and effort
multipliers (product, platform, personnel, project attributes). Requires
calibration to local data for accuracy.

**Function points.** Measures functional size by counting external inputs,
external outputs, external inquiries, internal logical files, and external
interface files, then adjusting for complexity. Technology-independent; useful
for early estimation before technology is chosen. Convert to SLOC using
backfiring tables only as a rough approximation.

**Calibration requirement.** An uncalibrated algorithmic model is not more
accurate than expert judgment; it is only more defensible-looking. Calibrate
using at least 5–10 completed projects from the same organization, technology
stack, and domain.

**Limitations.** Requires stable size inputs; sensitive to SLOC counting
conventions; calibration data may not exist for new technologies or domains;
complexity factors involve subjective judgment.

---

## Story Points / Relative Sizing (Agile Contexts)

**What it is.** Relative estimation of implementation complexity using an
abstract unit (story point) calibrated to team velocity.

**Use when.** Working in an iterative/agile context; requirements are expressed
as user stories; historical velocity data from the team is available or will
be collected over the first few sprints.

**Process.** Team members estimate each story relative to a reference story
(not in hours). Planning poker is the standard elicitation technique: all
estimators reveal their estimate simultaneously; outliers explain their
reasoning; estimates converge through discussion.

**Velocity.** After a few sprints, the team's average story points completed
per sprint (velocity) provides a basis for release planning: story points
remaining ÷ velocity = sprints remaining. Velocity is team-specific and
context-specific; never transfer velocity between teams or projects.

**Cone of uncertainty.** After one sprint, uncertainty is roughly ±50%. After
5+ sprints with stable velocity, uncertainty narrows to ±15–20%. State which
phase of the cone you are in.

**Limitations.** Story points are not comparable across teams; velocity is
unstable under team changes; works poorly for novel or research-heavy work
where there is no reference story.

---

## Analogy-Based Estimation (Case-Based)

**What it is.** Estimating a new project or task by identifying one or more
completed analogous projects and adjusting for differences.

**Use when.** Historical data exists on similar projects; the new project is
similar in type (same domain, similar technology) but may differ in size or
complexity.

**Process.**

1. Select analogues — completed projects similar in domain, technology, and
   problem type. Similarity on superficial dimensions (language choice,
   team size) is less valuable than similarity on complexity drivers.
2. Document differences — for each analogue, identify dimensions on which the
   new project differs: size, team experience, requirements stability,
   integration complexity, quality constraints.
3. Apply adjustment factors — estimate the impact of each difference (e.g.,
   "team is less experienced → add 20% effort"; "requirements are more stable
   → reduce 10%"). Adjustments should be explicit, not folded into a gestalt
   "gut feel" number.
4. Triangulate — if using multiple analogues, do not average blindly. Understand
   why they differ from each other and use the most similar as the base case.

**Strengths.** Grounded in real data; adjustment factors make assumptions
explicit; auditable.

**Limitations.** Quality depends on quality of analogues; adjustment factors
are still subjective; historical data may reflect past inefficiencies you
intend to avoid.

---

## Bottom-Up Estimation (WBS Decomposition)

**What it is.** Decompose the total scope into small, estimable work packages
via a WBS; estimate each work package independently; aggregate to a total.

**Use when.** Scope is sufficiently understood to decompose; high accuracy is
required (e.g., for contract pricing); other methods are producing estimates
too uncertain to act on.

**Process.**

1. Decompose scope into a WBS to the level where individual tasks are 8–40
   hours of work.
2. Estimate each task using expert judgment, analogy, or direct measurement.
3. Aggregate bottom-up. Do not apply a contingency percentage on the aggregate;
   instead, apply it at the task level where risk is understood, or add a
   separate management reserve based on identified risks.
4. Risk buffer guidance — add task-level buffers to tasks with high uncertainty
   (novel technology, unclear requirements, external dependencies). Reserve a
   management contingency of 10–25% of total effort for unidentified risks,
   scaled to the project's novelty.

**Strengths.** Highest accuracy when scope is well-understood; forces
thoroughness — tasks missing from the WBS are missing from the estimate;
aggregation is auditable.

**Limitations.** Time-consuming to produce; accuracy depends entirely on scope
completeness — an incomplete WBS produces a systematically low estimate; does
not work well when requirements are abstract or unstable.

---

## Method-Selection Guide

| Project type              | Requirements stability | Historical data available | Recommended method(s)                                       |
| ------------------------- | ---------------------- | ------------------------- | ----------------------------------------------------------- |
| Novel / research-heavy    | Low                    | No                        | Expert judgment (wide-band Delphi)                          |
| Novel / research-heavy    | Low                    | Yes (similar projects)    | Analogy-based + expert judgment                             |
| Iterative / agile         | Moderate               | Team velocity known       | Story points + planning poker                               |
| Iterative / agile         | Moderate               | No velocity data yet      | Expert judgment → calibrate velocity after sprint 1–3       |
| Traditional / plan-driven | High                   | Historical SLOC/FP data   | Algorithmic (COCOMO II or function points)                  |
| Traditional / plan-driven | High                   | No calibration data       | Bottom-up (WBS) + expert judgment per task                  |
| Contract / fixed-price    | High                   | Any                       | Bottom-up (WBS) — required for defensibility                |
| Large-scale, multi-team   | High                   | Historical data           | Algorithmic + bottom-up hybrid; calibrate model to org data |

**Combining methods.** For high-stakes estimates, use two or more methods
independently and reconcile the results. Significant divergence between methods
signals a misunderstanding of scope, missing risks, or incorrect model
calibration — investigate before reporting either number.
