---
name: storybook-ui
description: >-
  Develops and validates shared DOM UI in storybook/ui: Storybook dev/build,
  co-located stories, and the portfolio/storybook-ui-boundary ESLint rule.
  Use when adding or moving React components, configuring Storybook, or fixing
  UI library boundaries.
---

# Storybook UI workflow

## Read first

- [`docs/agents/storybook-ui.md`](../../../docs/agents/storybook-ui.md) — layout, imports, ESLint boundary
- [`docs/agents/repository-map.md`](../../../docs/agents/repository-map.md) — path reference

## Conventions

- Put reusable DOM components in **`storybook/ui/`**; import from pages as `@/storybook/ui/...`.
- Add **`*.stories.tsx`** next to the component; prefer **`UI/<Area>/<Name>`** titles (see existing stories).
- Share cross-page styles via co-located modules under **`storybook/ui/`** (per component or thin shared files like `section-heading.module.css`), not `app/*.module.css`.
- Résumé PDF stays in **`lib/cv-pdf/**`** (react-pdf); do not move PDF sections into Storybook.

## Commands

```bash
yarn storybook
yarn build-storybook
```

After UI changes, also run the **`nextjs-change-checklist`** skill (`yarn lint`, `yarn typecheck`, `yarn test`, `yarn build`).

## ESLint

If `yarn lint` reports **`portfolio/storybook-ui-boundary`**, the file contains JSX but is outside `storybook/ui/`, `app/`, `lib/cv-pdf/`, or `.storybook/`. Move the component or split JSX into an allowed path.

## Done when

- `yarn lint` and `yarn build-storybook` pass for Storybook-affecting changes.
- New components have stories (or a documented exception for non-visual glue).
