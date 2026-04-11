---
name: nextjs-change-checklist
description: >-
  Validates Next.js/React changes in this repo using yarn scripts: lint,
  typecheck, tests, and production build. Use before finishing a task, after
  substantive edits to app/, components, or config, or when the user asks if
  the change is safe to merge.
---

# Next.js change checklist

## Preconditions

- Dependencies installed: `yarn install` (from repo root).
- If the project uses TypeScript, ensure `tsconfig.json` exists and paths are unchanged unless intentional.

## Commands (run what exists)

Execute in order; **skip** any script absent from `package.json`:

1. `yarn lint` — ESLint / Next lint per project config.
2. `yarn typecheck` or `yarn tsc --noEmit` — if defined or if `typescript` is a dependency and the team uses explicit typecheck.
3. `yarn test` — if present (Jest, Vitest, Playwright, etc.).
4. `yarn build` — production Next.js build; must pass before merge for application changes.

## App Router specifics to double-check

- **Server vs client**: New hooks or browser APIs belong in Client Components with `"use client"` at the top of that module.
- **Data**: No accidental `fetch` caching surprises—use `cache: 'no-store'` or `revalidate` when data must be fresh.
- **Images / links**: Use `next/image` and `next/link` when the codebase already standardizes on them.

## Docker / CI parity

- If CI runs in Linux, avoid macOS-only assumptions in scripts or path separators.
- If the team is Docker-first, optionally smoke-test with `docker compose up --build` after large dependency or config changes.

## CV PDF (this repo)

- After edits under `lib/cv-pdf/**` or `lib/cv/**` used by the résumé PDF, run **`yarn vitest run lib/cv-pdf/`** (includes `cv-pdf-integrity.test.ts` and the Docker dump test when enabled).
- After edits under `storybook/ui/**` or `.storybook/**`, run **`yarn build-storybook`** in addition to the usual checks.

## Done when

- `yarn lint`, `yarn typecheck`, and `yarn test` have all been run and passed before reporting completion.
- All existing scripts invoked above complete successfully, or the user accepts a documented exception (e.g. known flaky test tracked elsewhere).
- No new secrets or `.env` files are committed.
