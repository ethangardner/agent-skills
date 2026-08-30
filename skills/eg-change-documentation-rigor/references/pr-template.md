# PR description template (fallback)

Use this only when the repo has no native template. Check the GitHub, GitLab,
and Bitbucket paths listed in `SKILL.md` first; if one exists, fill it in
instead because it is the shape that repo's reviewers expect.

When this fallback does apply, use it for every non-trivial PR, including
infra/build/CI-only changes. Omit a section only when it's genuinely not
applicable (e.g. no preview environment exists) — don't omit it because it's
inconvenient to fill in.

```markdown
# Summary

One or two sentences: what changed, in plain terms a non-expert reviewer
could understand without reading the diff.

## Breaking change

State plainly whether this is a breaking change. If yes, describe what
breaks and what downstream consumers need to do. If no, say why it's safe to
assume so (e.g. "internal-only utility, not part of the public API").

## Related issue

Link the issue(s) this addresses. Use "Closes #N" only when this PR fully
resolves it; if it only partially addresses a multi-part issue, say so
explicitly and name what's left and why it's deferred.

## Problem statement

What was wrong or missing before this PR? Written so someone unfamiliar with
the backstory understands why this change needed to happen at all — not just
what the change mechanically does.

## Solution

How this PR solves the problem. If more than one approach was viable, name
the ones considered and rejected, and why the chosen one won.

## Major changes

A short bullet list of the specific files/areas changed and what changed in
each — a map for the reviewer, not a restatement of the whole diff.

## Testing and review

Concrete, reproducible verification steps a reviewer can run themselves:
commands to run, expected output, what to check manually. Not "tested
locally" — the actual steps.
```
