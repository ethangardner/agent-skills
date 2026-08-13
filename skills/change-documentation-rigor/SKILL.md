---
name: change-documentation-rigor
description: >-
  Write commit messages and PR descriptions that document the reasoning
  behind a change, not just the change itself. Use this whenever you're about
  to write a commit message, open a PR, or describe a diff — e.g. "write a
  commit message for this", "describe this PR", "explain this dependency
  bump", "write a changelog entry", "document this change", or any time you
  finish a non-trivial diff and need to explain it to a reviewer. Trigger even
  when the user just says "commit this" without asking for a message — a
  one-line "fix bug" commit message is exactly the failure mode this skill
  prevents. Applies especially to changes that look mechanical or low-risk on
  the surface (dependency bumps, config tweaks, codemods), where the
  temptation to skip explanation is highest and the cost of skipping it is
  hidden until someone needs the history later.
---

# Change Documentation Rigor

A commit message or PR description is read by someone who wasn't in the room
when the change was made — often you, months later, trying to remember why
you rejected the obvious alternative. "What changed" is visible in the diff
itself; a message that only restates the diff ("update deps", "fix bug") adds
nothing a `git log -p` wouldn't already show. The message earns its keep by
carrying what the diff *can't* show: why, what was verified, and what was
considered and rejected.

## The three questions every message answers

1. **Why is this happening?** Not the mechanical action ("bump lodash") but
   the problem it solves ("lodash 4.17.15 has a known prototype-pollution CVE
   affecting our build") or the trigger ("closes #1234"). If the answer is
   "because it was next on the list," say what list and why it matters now.
2. **What evidence shows it's correct?** Tests run and their result, output
   diffed against a baseline, a CI run linked, a manual repro confirmed fixed.
   "Should work" is not evidence; a described verification step is.
3. **What was considered and rejected, and why?** This is the highest-leverage
   sentence in the message and the one most often skipped. If you evaluated
   three approaches and picked one, say what you didn't pick and why — it
   stops the next reader (including you) from re-proposing the rejected
   option, and it's the only place that reasoning will ever live.

## For batch/mechanical changes specifically

Dependency upgrades, codemods, and mass renames compress many small decisions
into one diff, so the rejection list matters more here, not less:

- List what was changed, grouped and named specifically (which packages, old
  version → new version), not "updated dependencies."
- List what was deliberately *not* changed in the same sweep, and why
  (failing tests, behavior-changing output, incompatible peer dependency) —
  so the next person doesn't waste time re-attempting a bump you already
  ruled out, and knows it was a decision, not an oversight.
- State how you confirmed the change is behavior-preserving where that's the
  claim: byte-identical build output, full test suite pass count, a linked
  CI run — whatever makes "this is safe" a checkable claim instead of an
  assertion.

## PR description: use the repo's own template first

Before reaching for a generic structure, check whether this repo already
defines one — most hosts let a repo ship a native PR/MR template, and if one
exists it's the shape reviewers here already expect. Check, in order:

- **GitHub**: `.github/pull_request_template.md`, `docs/pull_request_template.md`,
  or `pull_request_template.md` at the repo root (case-insensitive, `.md` or
  `.txt`). Multiple templates live under a `PULL_REQUEST_TEMPLATE/` directory
  (e.g. `.github/PULL_REQUEST_TEMPLATE/*.md`) — if there's more than one, pick
  the one that matches the change (e.g. a `bug_fix.md` vs. `feature.md` split).
- **GitLab**: `.gitlab/merge_request_templates/*.md`. A file named
  `Default.md` in that directory is the one GitLab auto-applies; prefer it
  when present, otherwise pick the template whose name matches the change.
- **Bitbucket Cloud**: `.bitbucket/pull_request_template.md` on the source
  branch.

Grep/list these paths (`git ls-files | grep -i -E 'pull_request_template|merge_request_templates'`
or equivalent) before writing a description from scratch. If the repo has a
template, fill it in completely rather than replacing its structure — a
half-filled native template is worse than a well-filled generic one, because
it signals the sections were seen and skipped.

Only fall back to `references/pr-template.md` when the repo defines no
template of its own. That fallback (Summary, Breaking change, Related issue,
Problem statement, Solution, Major changes, Testing and review, and an
optional dependency-table section for batch upgrades) exists so the same
rigor applies even in repos that haven't set one up. Whichever structure is
in play — native or fallback — fill in every section; an empty "Testing and
review" section is a visible gap, not a saved step.

## Keep exploratory iteration out of the public PR queue

If you're iterating toward a working version of something (a CI workflow, a
codemod, a config change) and don't yet know it works, do that in a draft PR
or a scratch branch — not as a series of opened-then-closed PRs against the
target branch. A trail of abandoned same-day PRs is noise for anyone reading
PR history later; a single draft PR that gets amended, or a branch you throw
away before opening anything, keeps the record clean. Open the real PR once
you can write the "Testing and review" section honestly.

## Self-check before opening

- Does the message explain why, not just restate the diff?
- Is there a stated verification step, not just an implicit "trust me"?
- If alternatives existed, are the rejected ones named with a reason?
- Would a reviewer with zero prior context understand the change without
  asking a follow-up question the message could have answered?

## When NOT to over-apply this

A one-line typo fix or a revert of a change made minutes ago doesn't need a
Problem Statement / Solution breakdown — a single clear sentence is
proportionate. Scale the rigor to how expensive it would be for a future
reader to reconstruct the reasoning without it: cheap to reconstruct (trivial,
obviously-correct changes) needs little; expensive to reconstruct (anything
involving a judgment call, a rejected alternative, or a non-obvious fix)
needs the full treatment.
