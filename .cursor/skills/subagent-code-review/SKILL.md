---
name: subagent-code-review
description: >-
  Performs independent code review by spawning Cursor subagents (Task tool).
  Use when the user asks for a code review, PR review, diff review, pre-merge
  review, second opinion on changes, security or a11y review of code, or
  explicitly to use subagents for reviewing implementation.
---

# Subagent code review

Use **separate subagent runs** so review stays independent from the agent that wrote the code. The parent agent merges findings, fixes **blockers**, and triages the rest.

For **plan or feature validation** before implementation, use **`subagent-plan-review`** (optionally run **plan** and **code** subagents in parallel from that skill).

## When to use

| Situation | Action |
|-----------|--------|
| User asks for **code review**, **PR review**, or **review these changes** | Spawn at least one readonly reviewer |
| **Before merge** on a substantive PR or branch | Prefer a subagent pass unless the user skips it |
| **Second opinion** or **parallel reviewers** | Two Task calls in one turn (see below) |
| Trivial one-line change | Review in-session; subagents only if the user asks |

## Tooling

Use the **Task** tool. Subagents **do not** see the user chat — include diff summary, paths, PR body, and constraints in the **prompt**.

| Need | `subagent_type` | `readonly` |
|------|-----------------|------------|
| Read files / trace logic / compare patterns | `explore` | `true` |
| Run `yarn lint`, `yarn test`, or a scoped build | `generalPurpose` | `false` |

Use **`model: fast`** unless the diff is huge or security-sensitive.

## Parallel reviewers (optional)

In **one** assistant message, you may start **two** Task calls with different emphasis, same scope:

1. **General review**: correctness, structure, repo conventions, tests.
2. **Focus pass**: security + dependency/data handling, or **accessibility** + UI semantics, or **performance** + bundle impact — pick what fits the change.

Merge non-duplicative items under one verdict in the parent reply. Do **not** nest Task inside Task.

## Prompt checklist (paste into subagent prompt)

1. **Goal**: code review only; name the branch/PR or list paths.
2. **Change summary**: bullet list of what changed; paste key diffs or say “read git diff / these files”.
3. **Scope**: in/out of scope (e.g. “only `apps/frontend/app/` and `packages/storybook/`”).
4. **Constraints**: `AGENTS.md`, `.cursor/rules/project-core.mdc`, `nextjs-react.mdc`; `storybook-ui` skill if UI; `nextjs-change-checklist` for expected verification commands.
5. **Output contract** (below).

## Review checklist (subagent should cover what applies)

- **Correctness**: logic, edge cases, error paths, types.
- **Next.js / React**: Server vs Client boundaries, hooks rules, data fetching, metadata.
- **Security**: secrets, XSS, unsafe HTML, auth/session assumptions, env usage.
- **UI / a11y**: semantics, labels, focus, contrast; shared DOM only under `packages/storybook/src/**` per ESLint boundary.
- **Styling**: view vs `.module.css`; CV PDF stays in `apps/frontend/lib/cv-pdf/**` with react-pdf `StyleSheet`.
- **Tests & CI**: coverage of new behavior; cite `yarn lint`, `yarn typecheck`, `yarn test`, `yarn build` as needed.
- **Scope creep**: unrelated refactors, noisy diffs.

## Output contract (subagent must follow)

```markdown
## Verdict
One of: **Approve** | **Approve with notes** | **Block**

## Summary
One short paragraph.

## Findings
- **Blockers** (must fix): …
- **Should fix**: …
- **Nits / optional**: …

## Suggested next steps
Numbered, concrete actions (file paths or commands).
```

Parent: resolve **blockers** before calling work merge-ready; document accepted risk for deferred items.

## Anti-patterns

- Reviewing without naming files or pasting enough context to find the change.
- Using **generalPurpose** when **explore** + file reads is sufficient.
- Duplicating the author’s self-review without independent file reads or checks.
