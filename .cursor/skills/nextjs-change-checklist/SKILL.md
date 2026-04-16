---
name: nextjs-change-checklist
description: >-
  Validates Next.js/React changes in this repo using yarn scripts: lint,
  typecheck, tests, and production build. Use before finishing a task, after
  substantive edits to app/, components, or config, or when the user asks if
  the change is safe to merge.
---

# Next.js change checklist

## Logical multi-package repo (not a monolith)

This repo uses **separate Yarn packages** (`apps/frontend`, `packages/storybook`, `packages/resume-content`, `apps/e2e`, `tools/`) with **`file:`** dependencies. Validate the **parts you touched**:

- **Frontend** (`apps/frontend`, default cwd in the **`frontend`** Docker service): `yarn lint`, `yarn typecheck`, `yarn test:unit`, `yarn build`.
- **Storybook** (`packages/storybook`): `yarn --cwd ../../packages/storybook …` from the frontend container, or `cd packages/storybook` on the host — `lint`, `typecheck`, `test:storybook`, `build-storybook`.
- **Résumé data** (`packages/resume-content`): `yarn --cwd ../../packages/resume-content lint`, `typecheck`, `test:unit`.
- **E2E** (`apps/e2e`): `yarn --cwd ../../apps/e2e test:e2e` (see `ci-e2e.yml`).

For **CV PDF** edits under `apps/frontend/lib/cv-pdf/**`, run frontend **`yarn test:unit`** and consider **`sh scripts/cv/docker-dump.sh`** for a real PDF byte check.

## Preconditions

- Dependencies installed: `yarn install` in each package directory you modify (or use Docker **`yarn install`** / **`yarn --cwd … install --frozen-lockfile`** as CI does).
- If the project uses TypeScript, ensure `tsconfig.json` exists and paths are unchanged unless intentional.

## Commands (run what exists)

Execute in order; **skip** any script absent from the relevant `package.json`:

1. **`yarn lint`** — in the package you changed.
2. **`yarn typecheck`** — where defined (`apps/frontend`, `packages/storybook`, `packages/resume-content`).
3. **`yarn test:unit`** — frontend and/or `packages/resume-content`; **`yarn test:storybook`** — under `packages/storybook` (needs Chromium; CI runs it in a **separate** job; Docker **`frontend`** image includes Playwright system libs).
4. **`yarn test:e2e`** — from **`apps/e2e`** when flows under test changed (often via Docker per `ci-e2e.yml`).
5. **`yarn build`** — production Next.js build under **`apps/frontend`**; must pass before merge for application changes.

## App Router specifics to double-check

- **Server vs client**: New hooks or browser APIs belong in Client Components with `"use client"` at the top of that module.
- **Data**: No accidental `fetch` caching surprises—use `cache: 'no-store'` or `revalidate` when data must be fresh.
- **Images / links**: Use `next/image` and `next/link` when the codebase already standardizes on them.

## Docker / CI parity

- If CI runs in Linux, avoid macOS-only assumptions in scripts or path separators.
- Docker-first: prefer **`docker compose run --rm frontend yarn lint`** (and the **`yarn --cwd ../../packages/...`** patterns from `.github/workflows/`) so Node, Playwright, and Linux match CI (see `Dockerfile` / `docs/agents/storybook-ui.md`).

## CV PDF (this repo)

- After edits under **`apps/frontend/lib/cv-pdf/**`** or **`packages/resume-content/**`** used by the résumé PDF, run **`apps/frontend`** **`yarn test:unit`** and optional **`sh scripts/cv/docker-dump.sh`**.
- After edits under **`packages/storybook/**`**, run **`yarn build-storybook`** in that package in addition to the usual checks.

## Done when

- Relevant lint, typecheck, unit, Storybook, e2e, and build steps for the touched packages have been run and passed before reporting completion.
- All existing scripts invoked above complete successfully, or the user accepts a documented exception (e.g. known flaky test tracked elsewhere).
- No new secrets or `.env` files are committed.
