---
name: eg-web-performance-audit
description: >-
  Run a structured web-performance investigation on a page or site —
  diagnose using Core Web Vitals and RUM-vs-lab data, separate quick wins
  from structural fixes, and translate findings into a business-impact case
  — rather than handing back a generic list of performance tips. Use when
  asked to "audit this page's performance", "why is this page slow",
  "investigate this LCP/CLS/INP regression", "do a performance review of
  this site", "find quick wins for page speed", or "help me build the
  business case for a performance fix". Trigger even when the ask is
  narrowly framed around a single metric (e.g. "why is my LCP bad") — the
  same diagnose, classify, translate shape applies regardless of which vital
  triggered the request.
---

# Web Performance Audit

Performance work is diagnostic and organizational, not just technical. Real
value comes from finding the actual bottleneck, separating what's fixable
immediately from what requires a real project, and connecting the finding to
a business outcome so the fix actually gets prioritized — a percentage
improvement alone rarely wins the argument on its own.

## Philosophy

1. **Diagnose before prescribing.** Identify the actual bottleneck, measured
   rather than guessed, before reaching for a generic fix list. RUM
   (real-user monitoring) and lab data (WebPageTest, Lighthouse, PageSpeed
   Insights) tell different stories — lab data is a controlled reproduction,
   RUM is what real users on real networks and devices actually experienced.
   Use both where available and reconcile them if they disagree.
2. **Quick wins and structural fixes are a real distinction — name which is
   which.** A fix deployable in an afternoon (adding `fetchpriority`, fixing
   an uncompressed asset) is a different recommendation than one requiring
   an architecture change (streaming SSR, a new CDN). Present both, but
   don't blur them into one undifferentiated list.
3. **Every finding closes with a business translation.** A metric
   improvement ("LCP: 4.1s → 1.8s") means little to a non-engineering
   stakeholder without a connection to an outcome — conversion rate, bounce
   rate, infrastructure cost, developer time. State the connection
   explicitly, using the organization's own data where available or
   published research (conversion-vs-load-time correlations) otherwise.
4. **A borrowed structuring framework can clarify a complex investigation.**
   Organizing an audit around a small number of named questions or phases
   (e.g. "what's the browser doing that could happen later / that needs to
   happen sooner / that it doesn't need to do at all") often communicates
   findings more clearly than an unordered list. Use one when it helps, skip
   it when the investigation is simple enough not to need it.

## Workflow

1. Establish what's actually being measured and how: Core Web Vitals (LCP,
   INP, CLS) plus supporting metrics (TTFB, FCP). Confirm both field data
   (Chrome UX Report, RUM tooling) and lab data (Lighthouse, WebPageTest,
   PageSpeed Insights) sources, and note explicitly when only one is
   available.
2. Identify the critical path for the metric in question. For LCP: find the
   LCP element and trace what blocks it from rendering — discoverability in
   the initial HTML, render-blocking resources, server response time. For
   CLS: find the specific elements causing shift. For INP: find the slow
   interaction and what's blocking the main thread during it.
3. Classify findings into quick wins (deployable fast, low risk) versus
   structural fixes (require a project, more risk and investment). Don't
   recommend a structural rewrite when a quick win would resolve most of the
   impact, and don't undersell a quick win's real limits when the underlying
   problem is actually structural.
4. Translate each significant finding into a business-relevant statement,
   tied to conversion, cost, or user-facing harm.
5. Present prioritized recommendations, quick wins first, each with
   expected impact and the evidence behind it.

See `references/technique-checklist.md` for a categorized checklist of
specific techniques — organized by loading/main-thread work, critical-path
and TTFB, waste elimination, and layout-stability (CLS) — to pull from once
the diagnostic phase has identified which category actually applies. The
checklist is a menu to select from after diagnosis, not a substitute for it.

## When NOT to over-apply this

A narrowly scoped, already-diagnosed request ("compress these images," "add
width/height to this one `img` tag") doesn't need the full audit workflow —
just do the specific fix. Reserve the full diagnose/classify/translate shape
for genuine investigations where the cause isn't already known, and skip
straight to execution when it is.
