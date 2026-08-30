# Worked example: URL clustering against performance data

*Research type: quantitative analysis — statistical clustering, validated
against independent data.*

PRs #4 and #5 from `GSA-TTS/10x-web-performance-optimization-research` show
the `SKILL.md` workflow end to end.

## The question

Which government web pages share enough in common that a web-performance
finding on one plausibly generalizes to the others — and can that grouping
be tied to real performance/traffic data rather than asserted by category
name alone?

## PR #4 — the clustering pass

**Purpose stated up front, in the PR body, not buried in the diff:**
> Adds a research package for URL clustering. Group URLs by patterns which
> can then be correlated with site traffic.

**The exploratory trail was preserved, not squashed.** The squash-merged
commit history reads as an honest, unrewritten sequence rather than a
cleaned-up narrative:

```
Add clustering of URLs using K-Means and TF-IDF
Add URL clustering script with CLI support
commit wip
Create a notebook to demo clustering and act as a workbook for a single agency
try to find optimal k value
plot results for single agency and find optimal k value
plot cluster results. analyze clusters based on crux data and pageviews
linting
add charts for metric visualization
remove requirement from domain flag
make the form factor optional
```

**Parameter search shown, not asserted.** "try to find optimal k value" and
"plot results for single agency and find optimal k value" are their own
commits — the choice of cluster count is visibly searched and plotted, not
picked and presented as obviously right.

**Independent validation, not just internal cluster quality.** "plot
cluster results. analyze clusters based on crux data and pageviews" —
the clusters are checked against two independent, real-world signals (Chrome
UX Report performance data and actual pageview volume), not only against
an internal metric like inertia or silhouette score.

**Workbook + script split.** The notebook exists explicitly "to demo
clustering and act as a workbook for a single agency" — exploration and
visualization live in the notebook; the CLI-supported script is what's
reusable for a different agency or a re-run later.

## PR #5 — the scoped follow-on

Opened one day after PR #4, with its own narrow purpose:

> Merge 2 dataframes to match URLs with performance data for each agency.

This is deliberately a separate PR, not a continuation of #4's diff — it
takes the clustering result as a given and answers a *different* question
("what does this mean per agency") rather than re-opening the clustering
question. Two scoped answers, chained, instead of one PR trying to be both
the analysis and the interpretation.

## What made this a good trail, not just a working script

- The reader can tell *why* k was chosen (a search is shown) rather than
  having to trust an assertion.
- The reader can tell the clusters mean something beyond "the algorithm
  found some groups" — they're checked against real traffic and performance
  data.
- The reader can tell where exploration ended and interpretation began,
  because those are two different PRs with two different stated purposes.
- None of this required a rigorous PR-description template — a one-line
  purpose statement per PR was enough, because the commit history itself
  carried the evidence. (This is a solo research repo with no external
  reviewer and no lasting production consequence — see
  `eg-change-documentation-rigor`'s "scale by audience reach and permanence"
  guidance for why a heavier template wasn't warranted here.)
