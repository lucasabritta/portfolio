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
- For `components/cv-pdf/**`, use react-pdf `StyleSheet` (`styles.ts`) instead of web CSS while still extracting reusable logic into `.ts` files.
- Do not commit secrets; use Vercel or GitHub environment configuration for deploy-time values.

## Validation

When code or config changes need verification, use the `nextjs-change-checklist` skill for the expected lint, typecheck, test, and build flow.
