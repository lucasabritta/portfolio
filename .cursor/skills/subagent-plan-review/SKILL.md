---
name: subagent-plan-review
description: >-
  Validates plans and features and performs independent code review by spawning
  Cursor subagents (Task tool). Use when the user asks for plan validation,
  design or feature review, pre-implementation review, independent or parallel
  code review, or explicitly to use subagents for validation or review.
---

# Subagent plan validation and code review

Use **separate subagent runs** so findings stay independent from the authoring agent. The parent agent synthesizes results and applies fixes only when agreed.

For **code-review-only** workflows (PR/diff review, pre-merge, second opinion on implementation), prefer **`.cursor/skills/subagent-code-review/SKILL.md`** — it duplicates the Task/output patterns with a code-focused checklist. This skill remains the home for **plan validation** and for **plan + code** parallel runs.

## When to use

| Situation | Subagent role |
|-----------|----------------|
| Plan, RFC, or feature approach before coding | **Plan validator** — gaps, repo fit, risks |
| After a substantive change set (or before merge) | **Code reviewer** — correctness, boundaries, tests |
| User asks for parallel or second opinion | Run **both** in one assistant turn (parallel Task calls) |

Skip subagents for trivial one-file edits unless the user asks.

## Tooling

Use the **Task** tool (subagents). Subagents **do not** see the user’s chat or prior turns — put everything they need in the **prompt** you send.

| Goal | `subagent_type` | `readonly` | Notes |
|------|-----------------|------------|--------|
| Plan / architecture / repo fit | `explore` | `true` | Read-only search and file reads |
| Code review from description + paths | `explore` | `true` | Paste relevant snippets or name paths/commits |
| Review that must run commands (lint, tests) | `generalPurpose` | `false` | Prefer repo scripts (`yarn lint`, etc.); keep scope narrow |

Use **`model: fast`** unless the change is unusually large or security-critical.

## Parallelism

When both **plan validation** and **code review** apply (for example, a written plan plus an existing branch or draft patch):

1. In **one** assistant message, start **two** Task calls:
   - Task A: plan validator (explore, readonly).
   - Task B: code reviewer (explore readonly, or generalPurpose only if commands are required).
2. Wait for both; merge non-duplicative findings in the parent reply.

Do **not** nest Task inside Task.

## Prompt checklist (copy into each subagent prompt)

Include:

1. **Goal**: validate plan / review code (pick one).
2. **Scope**: files, directories, or Storybook areas; what is **out of scope**.
3. **Constraints**: link or paste portfolio rules that matter (`AGENTS.md`, `.cursor/rules/project-core.mdc`, `nextjs-react.mdc`, `storybook-ui` skill if UI).
4. **Artifacts**: full plan text, diff summary, PR description, or “read these paths: …”.
5. **Output contract** (below) — required.

## Output contract (subagent must follow)

Return markdown with:

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
Numbered, concrete actions (files or commands when possible).
```

The parent agent: resolves **blockers**, triages **should fix**, and only then marks work complete (or documents accepted risk).

## Portfolio-specific review hints

Subagents should check, when relevant:

- **Next.js**: App Router, Server vs Client components, data fetching patterns (`docs/agents/agent-workflow.md`).
- **UI boundary**: Shared DOM under `packages/web-ui/src/**`; ESLint `portfolio/storybook-ui-boundary` (see `storybook-ui` skill).
- **CV PDF**: `lib/cv-pdf/**` uses react-pdf `StyleSheet`, not web CSS.
- **Validation**: After code changes, `yarn lint`, `yarn typecheck`, `yarn test`, `yarn build` per `nextjs-change-checklist` skill (reviewer may cite; executor runs).

## Anti-patterns

- Spawning a subagent **without** pasting the plan or naming paths to read.
- Using **generalPurpose** when **explore** + file reads is enough (adds write risk).
- Treating subagent text as authoritative without reconciling with the actual repo state in the parent session.
