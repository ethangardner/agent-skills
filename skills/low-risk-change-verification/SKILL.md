---
name: low-risk-change-verification
description: >-
  Verify a mechanical or apparently-low-risk change (dependency bump, bot/
  codemod PR, generated diff, config regeneration) before approving or
  merging it, and produce a short evidence transcript instead of a bare
  approval. Use when reviewing a dependency-bump PR, a Dependabot/Renovate
  PR, a lockfile-only change, a generated/auto-formatted diff, or anything
  else that looks routine enough to tempt a reflexive approve. Trigger on
  "should I approve this dependency bump", "is this bot PR safe to merge",
  "verify this before merging", "sanity check this generated diff", or "write
  a verification transcript for this change". Also trigger when you yourself
  (as an AI agent) are about to approve or recommend approving a change like
  this — the transparency requirement below applies to AI-assisted review as
  much as human review.
---

# Low-Risk Change Verification

Scrutiny drops fastest for changes that look safest: version bumps,
regenerated lockfiles, and formatter runs. Yet transitive behavior changes,
major-version output changes, and unexpected codemod edits can hide there. A
short, consistent transcript replaces a bare "LGTM" with a checkable decision.

## What the transcript covers

Before approving, produce a short transcript answering:

1. **Diff scope** — what actually changed, precisely (files, line count,
   which packages/versions). Not "a few dependency bumps" — the specific
   packages and version deltas.
2. **What the change mechanically does** — for a dependency bump, what does
   the new version change (check the changelog/release notes, don't assume
   a patch bump is behavior-neutral). For a codemod, what transformation
   rule was applied.
3. **Indirect/transitive impact** — does this dependency appear elsewhere in
   the tree with a conflicting constraint? Does a major-version bump change
   a public API or build output this repo depends on? Does the generated
   diff touch anything outside the intended scope?
4. **Confirmation** — the actual check performed and its result: tests run
   and pass count, build output diffed against baseline (ideally
   byte-identical where that's the claim), a linked CI run. State what was
   checked, not just "looks fine." Compare against a *known* baseline rather
   than expecting a clean slate — e.g. "same 38 pre-existing failures as
   main" is a real, checkable confirmation on a codebase with known flake;
   demanding zero failures on such a codebase makes the check either
   impossible to pass honestly or something people learn to fudge.

See `references/transcript-template.md` for a copy-pasteable skeleton.

## Attach it, don't just act on it

The transcript belongs in the review comment or PR description, not just in
your own head. A future person triaging a security advisory or a regression
needs to know this bump was actually checked, and what "checked" meant at
the time — that's only available if it's written down where the PR lives.

## Label AI involvement transparently

If an AI agent performed some or all of this verification, say so explicitly
in the transcript (e.g. "AI-assisted review — verification performed by
<tool/agent>") rather than presenting the output as unassisted human
judgment. This isn't a disclaimer to hedge liability — it lets the next
reader correctly weight the transcript: AI-assisted verification of a
mechanical diff is genuinely useful evidence, but a reader should know
that's what they're looking at, the same way they'd want to know a
human's review was a five-second skim versus a careful pass.

## Apply it consistently within a change class

If every dependency bump in a repo gets a transcript except when it's
tedious, the transcript stops being evidence of safety and starts being
evidence of mood. Pick the bar for a given class of change (e.g. "every
major-version bump gets a transcript; patch bumps get a lighter check") and
hold it steady, so an absent transcript is itself a signal something was
missed rather than just an inconsistency.

Once the transcript shape is right for a given change class in a given
repo, reuse it verbatim rather than re-deriving it each time — the same
diff-scope/mechanism/impact/confirmation structure, filled in fresh each
time but not reworded from scratch. Re-deriving the shape every time is what
makes the discipline expensive enough to skip under time pressure; reusing a
settled shape is what makes it sustainable enough to actually hold at #100
the same way it held at #1.

## When NOT to over-apply this

A genuinely trivial change — a patch-version bump of a dev-only dependency
with an empty changelog, a single-file typo fix from a codemod you already
verified on nine other files — doesn't need a full four-part transcript.
State the shorter reasoning inline ("patch bump, no changelog entries,
dev-only dependency") rather than manufacturing ceremony. The goal is
checkable evidence proportionate to actual risk, not a mandatory template
for every change regardless of size.
