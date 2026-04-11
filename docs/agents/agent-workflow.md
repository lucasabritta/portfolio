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

- Prefer small, focused changes.
- Match nearby patterns before introducing new ones.
- Keep frontend separation explicit: `.tsx` for views, `.ts` for logic, and `.css`/`.module.css` for web styles.
- For **`storybook/ui/**`**, keep shared DOM components documented with Storybook; do not add ad-hoc `components/` folders for web UI (ESLint enforces this).
- For **`lib/cv-pdf/**`**, use react-pdf `StyleSheet` (`styles.ts`) instead of web CSS while still extracting reusable logic into `.ts` files.
- Do not commit secrets; use Vercel or GitHub environment configuration for deploy-time values.

## Validation

When code or config changes need verification, use the `nextjs-change-checklist` skill for the expected lint, typecheck, test, and build flow.

Before saying a task is complete, run at minimum:

1. `yarn lint`
2. `yarn typecheck`
3. `yarn test`

Do not mark the task done until these pass, unless the user explicitly accepts a documented exception.
