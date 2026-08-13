---
name: technical-blog-drafting
description: >-
  Turn raw technical work — a completed investigation, a finished project, a
  bare checklist or brain-dump of notes — into a narrative blog post that
  opens with a concrete scenario, backs claims with real data, and closes
  with a reusable takeaway, rather than publishing notes as-is. Use when
  asked to "help me write a blog post about this", "turn these notes into a
  post", "draft a post about the X investigation", "I have a brain dump,
  help me turn it into an article", or "write up this technical work for the
  blog". Trigger even when the user hands over a bare bullet list or
  checklist and asks for "a post" without describing a narrative themselves
  — the discipline here is finding the story inside the notes, not
  reformatting the notes.
---

# Technical Blog Drafting

Raw technical work — an investigation's findings, a finished project's
details, a checklist of techniques — is not yet a blog post. A post earns a
reader's attention with a concrete scenario before it shows them the
technique, and closes with something the reader can reuse. Notes published
as-is skip both.

## The shape a technical post needs

1. **Open with a real scenario, not a topic sentence.** A concrete anecdote,
   problem, or situation that actually happened — not "In this post I'll
   discuss X." The scenario is what earns the next sentence.
2. **State the stakes before the fix.** Why did this matter — cost, user
   harm, a business metric, time lost — so the reader knows why to keep
   reading before they see the resolution.
3. **Show the investigation, not just the conclusion.** What was tried,
   what was ruled out, what the data actually showed. This is where
   credibility comes from — a post that jumps straight to "the fix was X"
   reads as asserted, not earned.
4. **Cite real data, not adjectives.** "Faster" is an adjective; "LCP
   dropped from 4.1s to 1.8s" is a citation. Before/after numbers, not
   qualitative claims, wherever they exist.
5. **Borrow a structuring framework only when it clarifies.** An analogy
   from another discipline, a named model, a small number of guiding
   questions — useful when it organizes a genuinely complex investigation,
   decorative and skippable when the material is simple enough to stand on
   its own.
6. **Close with a reusable takeaway**, not just a recap of what happened to
   the author — what should the reader do differently with this.
7. **Link to primary sources.** Situates the finding in existing literature
   and lets a skeptical reader check the underlying claim.

## Turning a checklist or brain-dump into a post

A raw checklist — grouped bullets, no anecdote, no narrative arc — is
source material, not a draft. Before expanding it into a post:

- **Pick one scenario or theme to anchor a single post.** Don't try to cover
  every bullet in one piece — a fifty-item checklist is five to ten posts,
  not one. Ask the user which slice to focus on if it isn't obvious.
- **Find the real situation behind each technique's inclusion.** "Why is
  this on the list" usually surfaces the anecdote the checklist compressed
  away.
- **Reorder around the narrative arc above, not the checklist's original
  grouping.** The source structure was built for lookup, not for reading
  start to end — expect to reshuffle, not just add prose around the
  existing bullets.

## Workflow

1. Identify the single scenario or finding the post will anchor on.
2. Draft the opening scenario paragraph first, before anything else. If a
   real, concrete opening can't be written, the material may not be ready
   to become a narrative post yet — check with the user whether it should
   stay a reference doc instead (see below).
3. Assemble the supporting data and investigation detail that back it up.
4. Add a structuring framework only if it clarifies the argument.
5. Close with a takeaway and outbound links.
6. Read it back against the shape above — if it still reads like
   documentation rather than a story, the opening needs another pass.

See `change-documentation-rigor` for the adjacent but distinct discipline of
documenting the *why* of a code change — that skill applies to commit
messages and PR descriptions, not narrative long-form writing.

## When NOT to over-apply this

Not every technical write-up should be a narrative. Reference material meant
for lookup — a runbook, an onboarding checklist, API documentation, an
internal wiki page — is actively worse when forced into a scenario-first
shape; a reader scanning for "what's the flag for X" doesn't want an
anecdote first. Apply this only when the explicit goal is a blog post,
article, or other narrative piece meant to be read start to end — if the ask
is ambiguous, confirm the intended format before restructuring.
