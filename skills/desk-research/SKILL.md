---
name: desk-research
description: >-
  Conduct desk research — answering a question from data that already
  exists (logs, usage analytics, public datasets) rather than production
  feature work or newly-collected data. Use when asked to "look into what
  the data shows", "cluster/segment this dataset", "correlate X with Y",
  "explore this before we decide", "write a research notebook", "investigate
  patterns in <dataset>", or any "before we build this, what does the data
  say" request. Trigger even when the ask is just "analyze this CSV/log
  export" — the discipline here is producing a defensible, checkable answer
  and an honest trail of how you got there, not a polished feature.
---

# Desk Research

Desk research answers a question using data that already exists, instead of
generating new data (surveys, interviews, experiments) or shipping a
feature. The deliverable is a defensible answer plus a trail showing how you
got there — not production code, and not a conclusion asserted without its
working shown.

## Philosophy

1. **The exploratory trail is part of the deliverable, not something to
   clean up.** This is the one place that instinct inverts from most
   engineering work: `change-documentation-rigor` says keep exploration out
   of a production PR's history; here the artifact under version control
   *is* the research process, so a visible "tried X, tried Y, landed on Z"
   trail — dead ends included — is evidence the conclusion was earned, not
   a mess to squash away. A commit that just says "wip" mid-investigation is
   fine; it's honest about where the thinking was at that point.

2. **Search free parameters explicitly; don't assert a value.** Any
   technique with a tunable parameter (cluster count, threshold, window
   size) needs the search shown, not a hardcoded choice presented as
   obviously correct. "I tried k=3 through k=12 and picked the elbow at
   k=6" is checkable; "grouped into 6 clusters" is not.

3. **Corroborate with an independent source before trusting the result.**
   A clustering or pattern-finding pass validated only against its own
   internal quality metric can still be finding structure that doesn't mean
   anything. Cross-check against a second, independently-collected signal —
   real usage data, an external dataset, a domain expert's sanity check —
   before treating the result as an answer rather than a hypothesis.

4. **State the question, not just the mechanism.** A research artifact's
   summary should say what decision it informs ("group URLs by pattern so
   they can be correlated with site traffic") — not just what the code does
   ("runs K-Means on a list of URLs"). A reader deciding whether to trust or
   reuse the analysis needs to know why it exists before they need to know
   how it works.

5. **Scope each question to its own artifact.** "What are the natural
   groupings in this data" and "what does this grouping mean for each
   stakeholder" are two different questions — answer them as two scoped
   passes (two notebooks, two PRs, two sections) rather than one sprawling
   investigation that conflates exploration with interpretation.

## Workflow

1. **Frame the question before touching data.** What decision does this
   inform, and what would change depending on the answer? A research effort
   with no decision riding on it is usually better spent as documentation
   review or skipped.
2. **Inventory what already exists before collecting anything new.** Internal
   logs/analytics, public datasets (e.g. Chrome UX Report for web
   performance data), prior analyses. Desk research's whole premise is that
   new data collection is usually unnecessary — check that premise first.
3. **Build a reproducible workbook.** A notebook for exploration and
   visualization, paired with a script/CLI for the parts that need to be
   re-run (on new data, on a schedule, by someone else) — the notebook is
   where you think, the script is what survives the investigation.
4. **Search the parameter space and show it.** Plot or log the search, not
   just the chosen value — the search itself is the evidence the value
   wasn't arbitrary.
5. **Validate against an independent signal.** Correlate the result against
   a second data source that wasn't used to produce it. If no independent
   signal exists, say so explicitly rather than presenting an unvalidated
   result with the same confidence as a validated one.
6. **Ship the finding as its own scoped artifact**, separate from any
   follow-on interpretation (a stakeholder rollup, a recommendation) — chain
   scoped answers rather than one document trying to be the analysis, the
   interpretation, and the recommendation at once.
7. **Lead the summary with the answer.** However honest and preserved the
   exploratory trail is, a reader who just wants the finding shouldn't have
   to read the whole notebook to get it — state the answer and its
   confidence up front, with the trail available for anyone who wants to
   check the work.

See `references/worked-example.md` for a real trail that follows this shape
end to end, including exactly what the commit history and PR scoping looked
like.

## When NOT to over-apply this

If the question is already answered by existing documentation, or the
decision doesn't actually hinge on data (it's a straightforward
implementation choice), skip the research step — desk research earns its
cost when a real decision is genuinely uncertain and the data to resolve it
already exists. And once the question moves from "what does the data show"
to "build the feature this analysis justified," switch disciplines: that's
production work, and `change-documentation-rigor` (keep exploration out of
the shipped history) applies there instead of this skill's "preserve the
trail" instinct.
