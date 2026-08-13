---
name: github-contribution-retrospective
description: >-
  Evaluate a person's software engineering practices from their real GitHub
  activity on a repo — authored commits and PRs, plus reviews and comments
  left for other contributors — and produce an evidence-cited retrospective
  of trends, strengths, and growth areas. Use this when the user asks to
  "evaluate my commit history / PRs / reviews on <repo>", "analyze my GitHub
  contribution history", "what do my code reviews say about my engineering
  practices", "look at my activity on this repo and tell me what you notice",
  "self-assessment from git/GitHub history", "engineering retrospective from
  GitHub activity", or asks the same about a named teammate/contributor rather
  than themselves. Trigger even when the user just pastes a GitHub repo URL
  and asks you to "evaluate" or "look at" their history there — the discipline
  here is mining real commits/PRs/reviews for grounded patterns, not writing
  new code.
---

# GitHub Contribution Retrospective

A retrospective built from commits, authored PRs, and reviews or comments on
others' work is more useful than a general impression because each claim can
trace to a specific artifact. This skill turns a `{repo, GitHub login}` pair
into that evidence-cited retrospective.

## Philosophy

1. **Every claim is a citation, not an impression.** "You write clear commit
   messages" is an opinion. "PR #6791's commit message lists which dependency
   bumps were verified byte-identical against baseline `dist/`, and which were
   rejected and why" is checkable. If a pattern can't be pointed at a specific
   PR/commit/review, it isn't a finding yet — keep sampling until it is or
   drop it.

2. **Behavior across three surfaces, not one.** Commits show how someone
   documents their own decisions. Authored PRs show what they choose to work
   on and how they scope/describe it. Reviews and comments on *other* people's
   work show how they communicate feedback, what they prioritize when
   reading someone else's code, and how they treat contributors. A retrospective
   built from only one surface (e.g. just commit messages) misses whether the
   same rigor shows up when the pressure is off — reviewing, not authoring.

3. **This is a growth tool, not a scorecard.** Whether the subject is the
   person asking or a named teammate, frame findings constructively: name what
   to keep doing as clearly as what to strengthen. If evaluating someone other
   than the requester, keep the same non-judgmental framing you'd want applied
   to your own history — this informs a conversation, it does not rank a
   person.

## Step 1 — Resolve the subject and scope

- **Repo**: the user will typically give a URL or `owner/repo`. Confirm you
  can reach it: `gh repo view <owner>/<repo>` (read-only).
- **GitHub login**: if the user is asking about themselves ("my commits",
  "my PRs"), resolve their authenticated login rather than asking — `gh api
  user --jq .login`. If they name someone else, use the login/handle given.
  If neither is clear, ask.
- **Time range**: default to full available history unless the user asks to
  scope it (e.g. "in the last year"). Note the range you actually pulled in
  the final output so the reader knows what's covered.

## Step 2 — Pull the data (read-only)

All commands are `gh api` / `gh pr list` / `gh graphql` calls — no writes, no
side effects, safe to run without asking. The exact commands, with
`{repo}`/`{login}` placeholders, live in `references/queries.md`. Pull:

1. **Authored PRs** — titles, states, dates. Skim beyond titles: open a
   handful of PR bodies (`gh pr view <n> --json body`) to see how the subject
   documents their *own* work, not just how they title it.
2. **Authored commit messages** — the full text, not just the first line.
   This is where "why", verification steps, and rejected alternatives (or
   their absence) show up.
3. **Reviews given to others** — state distribution (APPROVED /
   CHANGES_REQUESTED / COMMENTED) across *all* reviews, not just a sample, so
   the ratio you report is real. Then sample review-summary bodies and a
   handful of inline (line-level) review comments to check whether the tone
   and specificity you see in the summary also holds at the line level. Note
   how many of the reviewed PRs are bot-authored (Dependabot, Renovate, and
   similar) versus human-authored — the two populations carry structurally
   different risk and tone, and a sample dominated by one will misrepresent
   the subject's review style if reported without that context (see Step 3).
4. **Comment volume** — how often the subject shows up in other people's
   issues/PRs at all, as a rough signal of engagement beyond their own work.

Save raw pulls to a scratch file as you go — you'll want to re-quote specific
PR numbers when writing the final output, and the search APIs are easy to
re-run but slow to re-cross-reference from memory.

## Step 3 — Read for these dimensions

Work through the pulled data looking for patterns in each of these, citing
specific PR/commit/review numbers as you find them:

- **Commit message rigor** — does the subject explain *why*, not just *what*?
  Do messages include verification detail (tests run, output diffed) or
  document alternatives that were considered and rejected? Or are messages
  terse/generic ("fix bug", "update deps")?
- **PR focus and scope** — what kind of work clusters here: infra/build
  tooling, CI/CD, dependency hygiene, core bugfixes, features, docs? A
  concentration says something about role (maintainer/infra-owner vs.
  feature-author vs. generalist) — name it, don't just list PR titles.
- **Review tone and specificity** — do reviews give actionable, specific
  feedback tied to lines/behavior, or generic approval/rejection? Do they
  credit the contributor, distinguish hard blockers from suggestions, and
  loop in relevant code owners? Vague "LGTM"-only reviews vs. substantive
  ones are both worth naming honestly. Read bot-authored and human-authored
  reviews as separate populations: a review sample that's mostly Dependabot
  approvals with a repeated verification transcript reflects a
  low-risk-change-verification habit, not a "rarely pushes back on
  contributors" finding — don't blend the two into one ratio without saying
  so.
- **Consistency between what's demanded of others and what's done in one's
  own PRs.** If the subject asks contributors for tests/docs/rationale in
  review, do their own PRs meet that same bar? This is often the most
  revealing dimension — check it explicitly rather than assuming either way.
  But weigh this against the repo's actual audience reach and permanence
  before calling it a gap (see `change-documentation-rigor`'s "scale by
  audience reach and permanence" guidance): thin PR bodies on a
  widely-consumed, long-lived platform is a real finding; the same thinness
  on a solo tool or a repo whose output is ephemeral/regenerated on a
  schedule is calibrated judgment, not a shortfall — say so explicitly
  rather than flagging every instance of "docs were thinner here" at the
  same weight regardless of what was actually at stake.
- **Responsiveness signals** — timestamps between PR open and first review;
  any self-acknowledged delays visible in review comments ("thanks for your
  patience waiting on me"); PRs that were opened, abandoned, and re-done
  (e.g. several near-duplicate PRs closed same-day before a working version
  landed) — this is real signal about iterating live vs. in a draft/fork.
- **Tooling and automation patterns** — anything showing how the subject
  works, not just what they produce: AI-assisted review transcripts,
  automated verification steps referenced in commits, CI workflows they
  built for the team.

## Step 4 — Write the retrospective

Unless the user asks for a different format, deliver this directly in chat
(not published externally by default — this may be a personal or another
person's performance reflection):

```
# GitHub Retrospective: <login> on <owner/repo>
(Coverage: <date range / PR-number range actually pulled>)

## Trends and commonalities
- Pattern, cited to specific PR/commit/review numbers.

## Strengths
- What's worth explicitly naming as already-strong practice, cited.

## What to strengthen
- Gaps or inconsistencies visible in the data, cited. Prefer patterns you can
  point at (e.g. "3 duplicate PRs opened/closed same day before #N landed")
  over inferred generalities.

## What this reveals about their engineering approach
- A short synthesized characterization — the role/persona the evidence
  points to (e.g. "infra-minded maintainer who verifies before merging and
  mentors through review rather than gatekeeping") — not a list, a read.
```

Lead each section with the strongest/most-repeated evidence, not a
top-to-bottom recital of everything pulled.

## When NOT to over-apply this

A subject with only a handful of PRs on the target repo doesn't have enough
signal for a confident retrospective — say so rather than stretching thin
data into broad claims. If the ask is really "review this one PR" or "help
me write a better commit message", that's code review or construction
guidance, not this skill.

A structurally empty surface is not the same thing as a weak finding on that
surface. A solo repo with no external contributors will return zero reviews
given to others — that's silence caused by there being no one else's code to
review, not evidence about reviewing style. Say so plainly in the output
("no review data — solo repo") rather than omitting the dimension silently
or, worse, treating its absence as a gap to strengthen.
