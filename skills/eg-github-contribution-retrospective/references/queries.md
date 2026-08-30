# Data collection queries

All commands are read-only (`gh api` GET requests, `gh pr list`, `gh
graphql` search). Replace `{repo}` with `owner/repo` (e.g. `uswds/uswds`) and
`{login}` with the GitHub username being evaluated. Resolve `{login}` for
"my" activity with:

```bash
gh api user --jq '.login'
```

## 1. Authored PRs (titles, states, dates)

```bash
gh pr list --repo {repo} --author {login} --state all --limit 100 \
  --json number,title,state,createdAt,mergedAt,url
```

`gh pr list` caps around 100 results per call; for prolific contributors,
cross-check the total with:

```bash
gh api "search/issues?q=repo:{repo}+type:pr+author:{login}&per_page=100" \
  --jq '.total_count'
```

Read a handful of full PR bodies (not just titles) to see how the subject
documents their own work:

```bash
gh pr view {pr_number} --repo {repo} --json body,title \
  --jq '.title + "\n---\n" + .body'
```

## 2. Authored commit messages (full text)

```bash
gh api "repos/{repo}/commits?author={login}&per_page=100" --paginate \
  --jq '.[] | .commit.message'
```

This includes merge commits if the subject merges their own PRs — filter
those out mentally (or with `grep -v '^Merge'`) when reading for message
rigor, since merge-commit messages aren't authored prose.

## 3. Reviews given to others — full state distribution

Review state isn't exposed on the REST commits/PR-list endpoints; use the
GraphQL search API and paginate through *all* results, not just the first
page, so the ratio reported is real:

```bash
gh api graphql -f query='
query($cursor: String) {
  search(query: "repo:{repo} reviewed-by:{login}", type: ISSUE, first: 100, after: $cursor) {
    pageInfo { hasNextPage endCursor }
    nodes {
      ... on PullRequest {
        number
        reviews(first: 10) {
          nodes { state author { login } }
        }
      }
    }
  }
}' --paginate
```

Then count states per review where `author.login == {login}` (a review
thread can include reviews from multiple people, so filter by author). A
small Python/jq pass over the paginated JSON output works fine — the
`--paginate` output is concatenated JSON objects, one per page.

## 4. Reviews given to others — sample bodies (for tone/specificity)

```bash
gh api graphql -f query='
query {
  search(query: "repo:{repo} reviewed-by:{login}", type: ISSUE, first: 30) {
    nodes {
      ... on PullRequest {
        number
        title
        reviews(first: 5) {
          nodes { state body author { login } }
        }
      }
    }
  }
}'
```

Filter to `author.login == {login}` and print `state` + `body` per PR number.

## 5. Inline (line-level) review comments — sample

```bash
gh api graphql -f query='
query {
  search(query: "repo:{repo} reviewed-by:{login}", type: ISSUE, first: 8) {
    nodes {
      ... on PullRequest {
        number
        reviewThreads(first: 5) {
          nodes {
            comments(first: 3) {
              nodes { author { login } path body }
            }
          }
        }
      }
    }
  }
}' --jq '.data.search.nodes[] | .number as $n | .reviewThreads.nodes[].comments.nodes[] | select(.author.login=="{login}") | "#\($n) [\(.path)]: \(.body)"'
```

## 6. Comment volume (rough engagement signal)

```bash
gh api "search/issues?q=repo:{repo}+commenter:{login}&per_page=100" \
  --jq '.total_count'
```

This counts issues/PRs the subject has commented on at all (any comment,
not just formal reviews) — a rough measure of engagement with the repo
beyond their own authored work.
