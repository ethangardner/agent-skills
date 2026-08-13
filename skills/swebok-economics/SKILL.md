---
name: swebok-economics
description: >-
  Perform or review an economic analysis of a software engineering decision
  using the discipline from SWEBOK V4 Chapter 15. Use this whenever the work
  involves justifying, comparing, or evaluating software investments — e.g.
  "software ROI", "build vs buy", "make or buy decision", "software
  cost-benefit analysis", "NPV", "net present value", "IRR", "payback period",
  "software investment", "pricing software", "product economics", "portfolio
  management", "knowledge asset value", "software economics", "technical debt
  cost", "TCO", "total cost of ownership", "software retirement decision",
  "economic justification", "business case", "cost estimation", "value of
  software", "replacement analysis", "product life cycle", "project life cycle",
  "cash flow analysis", or "discount rate". Trigger even when the user just
  says "is this worth building" or "how do I justify this to stakeholders" —
  the discipline of matching the economic frame to the decision and modeling
  total cost of ownership applies, not just a rough guess at ROI.
---

# Software Engineering Economics

Software engineering economics applies economic analysis to decisions about
software: what to build, how to build it, whether to buy or retire it, and at
what price. It treats every technical decision as having an economic dimension
that can be modeled, compared, and communicated to stakeholders. Ignoring
economics does not make a decision neutral — it makes it implicit.

Three ideas drive everything below:

1. **Every technical decision is an economic decision.** Choosing an
   architecture, a technology stack, or a development approach allocates costs
   and creates option value. Engineers who cannot articulate the economic
   consequences of their technical choices are making half-decisions. A
   microservices migration is not just a scalability choice — it is a choice
   about where operational costs will concentrate, what skills the team must
   maintain, and what future deployment options become available or foreclosed.

2. **Time value of money makes the timing of costs and benefits matter.** A
   dollar of technical debt paid today costs more in absolute terms than the
   same dollar paid next year — but technical debt accrues interest in
   complexity, integration cost, and hiring friction that often reverses this.
   Calculate total cost of ownership across a realistic time horizon, not just
   initial cost. A cheap solution that doubles maintenance cost for three years
   is not cheap.

3. **The unit of economic analysis must match the unit of decision.** Evaluating
   a feature's ROI at the product level obscures cross-product effects;
   evaluating a platform investment at the project level makes it look
   unjustifiable. Match the economic frame to the decision being made. A
   shared authentication service must be evaluated against the portfolio it
   serves, not just the project that builds it first.

## When NOT to over-apply this

For a small internal tool or a low-stakes experiment, a brief cost sanity-check
suffices. The full economic analysis discipline — cash flow modeling, NPV/IRR,
incremental alternatives comparison — earns its keep on decisions with
multi-year cost implications, significant capital outlay, or executive
stakeholders who need quantitative justification.

## The workflow

Work through these steps in order. Skip or compress steps deliberately, not by
accident, and say when you do.

### 1. Define the economic frame

Before modeling anything, identify what decision needs to be made. Clarify:

- What is the decision (build a feature, buy a platform, retire a system,
  rewrite vs. maintain)?
- What alternatives exist — including the do-nothing baseline?
- What is the relevant time horizon (typically the expected useful life of the
  investment, 3–10 years for most software)?
- Whose perspective is this analysis from (a project team, a product line, the
  enterprise, an external customer)?

The frame determines which costs appear in the model and which are externalized.
A project-level frame will exclude cross-team benefits; an enterprise frame will
include them. State the frame explicitly so readers know what is and is not in
scope.

### 2. Identify and classify costs and benefits

Enumerate all costs and benefits. For each item, classify it:

- **Type:** development, operations, maintenance, support, training, licensing,
  migration, retirement, opportunity cost.
- **Timing:** one-time (Year 0) vs. recurring (ongoing per year).
- **Tangibility:** tangible (measurable in dollars: licenses saved, headcount
  reduced, revenue enabled) vs. intangible (developer satisfaction, reduced
  cognitive load, brand risk).

Do not omit opportunity costs — the foregone value of the next-best alternative
is a real cost even if it never appears on an invoice. Do not omit intangibles
either — name them and note whether they can be proxied by a tangible metric.

### 3. Model cash flows and time value

Construct a cash flow diagram across the time horizon. For each period:

- Sum all costs (negative cash flows) and benefits (positive cash flows).
- Apply a discount rate to convert future cash flows to present value.
  - For internal projects, use the organization's weighted average cost of
    capital (WACC) or hurdle rate, typically 8–15%.
  - For comparisons, hold the rate constant across alternatives.

Calculate for each alternative:

- **NPV** (Net Present Value): sum of discounted cash flows. Positive NPV means
  the investment creates value. Choose the highest-NPV justified alternative.
- **IRR** (Internal Rate of Return): the discount rate at which NPV = 0.
  Acceptable if IRR exceeds the hurdle rate.
- **Payback period:** the point in time when cumulative cash flows turn positive.
  Useful for liquidity decisions; does not account for time value.
- **Break-even point:** the volume or usage level at which total revenue equals
  total cost (for pricing decisions).

Run a sensitivity analysis: identify the two or three most uncertain
assumptions and show how NPV changes as they vary ±20–30%.

### 4. Evaluate alternatives using incremental analysis

Do not simply pick the alternative with the highest ROI. Use incremental
analysis:

1. Order alternatives by increasing initial investment.
2. Compare each alternative to the previous one: does the incremental
   investment produce positive incremental NPV?
3. Select the last alternative for which the incremental investment is
   justified.

This prevents selecting an inferior alternative with high ROI on a small
investment when a larger investment would produce greater total value.

### 5. Document the decision with assumptions

State all assumptions explicitly:

- Identify which assumptions are load-bearing (if they change by a significant
  amount, the decision reverses).
- Set specific triggers for revisiting the decision (e.g., "if user growth
  exceeds 3x the projection, revisit the build-vs-buy decision for the
  recommendation engine").
- Record the decision date, decision maker, and frame so future teams can
  understand the context in which the analysis was valid.

## Output format

Unless the user asks for something else, use this structure.

```
# Economic Analysis: <decision>

## 1. Decision frame
- Decision to be made:
- Alternatives under consideration:
- Time horizon:
- Stakeholder perspective:
- Do-nothing baseline:

## 2. Costs and benefits
| Category | Item | Type (one-time/recurring) | Year 0 | Year 1 | Year 2 | ... |
|----------|------|--------------------------|--------|--------|--------|-----|

## 3. Cash flow model
- Discount rate: <% and rationale>
- NPV by alternative:
  | Alternative | NPV |
- IRR by alternative: <values>
- Payback period: <values>
- Break-even point: <when, if applicable>
- Sensitivity: NPV changes by X for Y% change in <key assumption>

## 4. Alternatives comparison (incremental)
| Alternative | Initial investment | Incremental NPV vs. previous | Justified? |
|-------------|--------------------|------------------------------|------------|

## 5. Recommended alternative and assumptions
- Recommendation:
- Load-bearing assumptions (if these change, decision changes):
- Sensitivity summary:
- Revisit triggers:
- Decision recorded by / date:
```

## Reviewing an existing economic analysis (checklist mode)

When the task is to critique or evaluate rather than author, run the workflow as
a checklist against what exists:

1. Is the decision frame explicit — what alternatives are in scope, over what
   time horizon, from whose perspective?
2. Is the do-nothing baseline included as an alternative?
3. Are opportunity costs identified and quantified where possible?
4. Are cash flows modeled across a realistic time horizon, not just Year 0?
5. Is a discount rate applied, and is it justified?
6. Is NPV the primary criterion, with IRR and payback as secondary signals?
7. Were alternatives compared using incremental analysis, not just highest ROI?
8. Are load-bearing assumptions explicitly stated and sensitivity-tested?
9. Are revisit triggers defined so the decision is not treated as permanent?
10. Are intangible costs and benefits named, even if not quantified?

Lead the review with the highest-leverage gap, not a top-to-bottom recital.

## Vocabulary (use precisely)

- **NPV (Net Present Value)** — the sum of discounted future cash flows minus
  the initial investment. Positive NPV means the investment creates value above
  the cost of capital.
- **IRR (Internal Rate of Return)** — the discount rate that makes NPV equal to
  zero. An investment is acceptable if IRR exceeds the organization's hurdle
  rate.
- **Payback period** — the time until cumulative cash flows turn positive. A
  liquidity metric; does not account for the time value of money.
- **Discount rate** — the rate used to convert future cash flows to present
  value, reflecting the cost of capital and the time value of money.
- **TCO (Total Cost of Ownership)** — all costs associated with an asset across
  its full life: acquisition, operation, maintenance, and retirement.
- **ROI (Return on Investment)** — net benefit divided by cost. Useful for
  communication but misleading when used to compare alternatives of different
  scale; use incremental NPV for that.
- **Make-or-buy decision** — the choice between building a capability internally
  and acquiring it from an external vendor or open-source source.
- **Opportunity cost** — the value of the next-best alternative foregone by
  making a given choice. Always a real cost, even when not on an invoice.
- **Incremental analysis** — comparing alternatives in order of increasing
  initial investment to determine whether each increment of investment is
  economically justified.
- **Knowledge asset** — a software system or codebase valued as an asset;
  valuation incorporates both intrinsic quality (Qval) and information value
  (Ival): KAval = Qval + Ival.
- **Product life cycle** — the stages a software product passes through from
  conception through retirement, encompassing multiple project life cycles.
- **Project life cycle** — the phases of a single project: initiation, planning,
  execution, closure. Distinct from the product life cycle it contributes to.
- **Cash flow** — money moving in (benefit) or out (cost) at a specific point
  in time. The raw material of NPV and IRR calculations.
- **Break-even point** — the volume or time at which total revenue equals total
  cost; beyond this point, the investment is profitable.
