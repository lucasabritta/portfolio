# Agent Workflow

Use this file for repository-specific working conventions.

## Read order

1. Start with `AGENTS.md` to find the right document.
2. Read the relevant file in `.cursor/rules/` for always-on or file-scoped constraints.
3. Read the relevant file in `.cursor/skills/` when a task matches an existing workflow.
4. Use `README.md` for human-oriented project context.

## Rules vs skills

- Rules in `.cursor/rules/*.mdc` define concise constraints and defaults.
- Skills in `.cursor/skills/<name>/SKILL.md` define repeatable procedures, commands, and done criteria.

## Agent expectations

- Consult `docs/adr/` before proposing cross-cutting architectural changes; each ADR captures the context that drove a decision.
- Prefer small, focused changes.
- Treat the repository as a **multi-package repo, not a monolith**: **`apps/frontend`**, **`packages/storybook`**, **`packages/resume-content`**, **`apps/e2e`**, and **`tools/`** are separate concerns. Preserve boundaries (imports, ESLint, CI workflows per package); do not merge layers or add cross-cutting shortcuts. See [`docs/agents/project-overview.md`](project-overview.md).
- Match nearby patterns before introducing new ones.
- Keep frontend separation explicit: `.tsx` for views, `.ts` for logic, and `.css`/`.module.css` for web styles.
- For **`packages/storybook/**`**, keep shared DOM components documented with Storybook; do not add ad-hoc `components/` folders for web UI (ESLint enforces this).
- For **`apps/frontend/lib/cv-pdf/**`**, use react-pdf `StyleSheet` (`styles.ts`/`styles/\*.ts`) instead of web CSS while still extracting reusable logic into `.ts` files.
- Do not commit secrets; use Vercel or GitHub environment configuration for deploy-time values.

## Subagent plan validation

When you need an **independent** pass over a **plan or feature design**, use the **`subagent-plan-review`** skill: spawn readonly `explore` subagents via the Task tool; parallel plan + implementation review when both apply. See `.cursor/skills/subagent-plan-review/SKILL.md` and `.cursor/rules/subagent-plan-review.mdc`.

## Subagent code review

When you need an **independent** pass over **implementation** (PR, diff, pre-merge), use the **`subagent-code-review`** skill: default to readonly `explore` reviewers; use a command-running subagent only when `yarn` checks are required. Optional **two parallel** reviewers (e.g. general + security/a11y). See `.cursor/skills/subagent-code-review/SKILL.md` and `.cursor/rules/subagent-code-review.mdc`.

## Validation

When code or config changes need verification, use the `nextjs-change-checklist` skill for the expected lint, typecheck, test, and build flow.

Before saying a task is complete, run the **package-scoped** scripts you changed (see `.github/workflows/` and the **`nextjs-change-checklist`** skill). Typical Docker invocations from the repo root:

- Frontend: `docker compose run --rm frontend yarn lint` (and `typecheck`, `test:unit`, `build` in `apps/frontend` — default working directory of the service is that folder).
- Storybook: `docker compose run --rm frontend sh -lc "yarn --cwd ../../packages/storybook install --frozen-lockfile && yarn --cwd ../../packages/storybook lint"` (and `typecheck`, `test:storybook`, `build-storybook` as needed).

Do not mark the task done until relevant checks pass, unless the user explicitly accepts a documented exception.
