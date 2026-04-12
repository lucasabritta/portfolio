---
name: nextjs-change-checklist
description: >-
  Validates Next.js/React changes in this repo using yarn scripts: lint,
  typecheck, tests, and production build. Use before finishing a task, after
  substantive edits to app/, components, or config, or when the user asks if
  the change is safe to merge.
---

# Next.js change checklist

## Logical monorepo (not a monolith)

This repo uses **Yarn workspaces** (`apps/frontend`, `apps/backend`, `packages/storybook`, `packages/resume-content`, `tools/`). Validate the **parts you touched**: use **`yarn test:unit`** (or **`yarn test:unit:frontend`**, **`yarn test:unit:backend`**, **`yarn test:unit:resume-content`**) and **`yarn test:storybook`** as appropriate; for PDF-only edits, run targeted Vitest under `apps/backend/src/cv-pdf/` per project docs.

## Preconditions

- Dependencies installed: `yarn install` (from repo root).
- If the project uses TypeScript, ensure `tsconfig.json` exists and paths are unchanged unless intentional.

## Commands (run what exists)

Execute in order; **skip** any script absent from `package.json`:

1. `yarn lint` — ESLint / Next lint per project config.
2. `yarn typecheck` or `yarn tsc --noEmit` — if defined or if `typescript` is a dependency and the team uses explicit typecheck.
3. `yarn test:unit` and `yarn test:storybook` — unit covers **`apps/frontend`**, **`apps/backend`**, and **`packages/resume-content`**; Storybook tests run in **`@portfolio/storybook`** (needs Chromium; CI runs them in a **separate** job; Docker **`frontend`** image includes Playwright system libs).
4. `yarn build` — production Next.js build; must pass before merge for application changes.

## App Router specifics to double-check

- **Server vs client**: New hooks or browser APIs belong in Client Components with `"use client"` at the top of that module.
- **Data**: No accidental `fetch` caching surprises—use `cache: 'no-store'` or `revalidate` when data must be fresh.
- **Images / links**: Use `next/image` and `next/link` when the codebase already standardizes on them.

## Docker / CI parity

- If CI runs in Linux, avoid macOS-only assumptions in scripts or path separators.
- Docker-first: prefer **`docker compose run --rm frontend yarn lint`**, **`typecheck`**, **`test:unit`**, **`test:storybook`**, **`build`**, **`build-storybook`** so Node, Playwright, and Linux match CI (see `Dockerfile` / `docs/agents/storybook-ui.md`).

## CV PDF (this repo)

- After edits under `apps/backend/src/cv-pdf/**` or `packages/resume-content/**` used by the résumé PDF, run **`yarn test:unit:backend`** or **`yarn vitest run --project unit-backend apps/backend/src/cv-pdf/`** (includes `cv-pdf-integrity.test.ts` and the Docker dump test when enabled).
- After edits under `packages/storybook/**`, run **`yarn build-storybook`** in addition to the usual checks.

## Done when

- `yarn lint`, `yarn typecheck`, and both `yarn test:unit` and `yarn test:storybook` have been run and passed before reporting completion.
- All existing scripts invoked above complete successfully, or the user accepts a documented exception (e.g. known flaky test tracked elsewhere).
- No new secrets or `.env` files are committed.
