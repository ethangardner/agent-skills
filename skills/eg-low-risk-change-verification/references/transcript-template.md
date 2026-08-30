# Verification transcript template

Attach this to the review comment or PR/approval note for mechanical or
apparently low-risk changes. Keep it short, but answer every section with
evidence rather than a placeholder.

```markdown
**Verification transcript** *(AI-assisted, via <tool/agent name>, if applicable)*

**Change**: <one line — e.g. "Bump undici 7.28.0 -> 7.29.0">

- **Diff scope**: <files changed, line count — e.g. "lockfile-only
  (package-lock.json, 3 lines)">
- **What changed**: <what the new version/transformation actually does —
  cite the changelog/release notes entry, don't assume>
- **Indirect impact**: <does this appear elsewhere in the dependency tree
  with a conflicting constraint? Public API/output change? Anything touched
  outside the intended scope?>
- **Confirmation**: <what was actually checked and the result — test suite
  run + pass count, build output diffed against baseline, linked CI run>

**Verdict**: <approve / needs follow-up, with the specific reason>
```

## Worked example (dependency patch bump)

```markdown
**Verification transcript — AI-assisted review, OpenCode Agent**

**Change**: Bump undici 7.28.0 -> 7.29.0

- **Diff scope**: lockfile-only (package-lock.json, 3 lines changed).
- **What changed**: undici is a transitive test-only dependency; release
  notes show only internal fixes, no public API change.
- **Indirect impact**: no other package in the tree pins a conflicting
  undici range; not referenced directly in source.
- **Confirmation**: `npm ci` installs clean; full test suite passes
  (unchanged pass count vs. baseline).

**Verdict**: Approve — patch bump, transitive-only, no behavior surface
affected.
```
