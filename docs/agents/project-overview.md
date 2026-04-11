# Project Overview

## Scope

This repository contains the portfolio site. Do not assume shared frontend, backend, or AI pipeline packages exist here unless they are present in this tree.

Related product work may live in separate repositories:

- Frontend code lives in the Frontend repository.
- Backend code lives in the Backend repository.
- Most AI orchestration code lives in the `vectorization_pipeline` repository.

## Yarn workspaces monorepo, not a monolith

The portfolio uses **one git root**, **Yarn workspaces** (`apps/*`, `packages/*`), and **one lockfile** so the **Next app**, **web UI library**, and **CV package** stay **separately versioned and importable** — not a monolith where every feature reaches into every layer.

| Surface | Role |
|---------|------|
| `apps/web` (`@portfolio/web`) | Next.js App Router: routes, layouts, `lib/cv-pdf/`, `public/` |
| `packages/web-ui` (`@portfolio/web-ui`) | Shared DOM components, Storybook (`.storybook/`), web CSS; consumed by the app via **`@portfolio/web-ui`** |
| `packages/cv` (`@portfolio/cv`) | CV types, `cvData`, PDF text helpers, small shared formatters (`buildPhoneHref`, work-history keys) |
| `tools/` | Repo-local tooling |

**Agent expectations:**

- Respect **import direction** and **layer boundaries** (see [`docs/agents/repository-map.md`](repository-map.md)). The UI package must not import from `apps/web/app/**`.
- When validating changes, prefer the **narrowest** meaningful checks: e.g. `yarn test:unit` vs `yarn test:storybook`, or targeted Vitest paths under `apps/web/lib/cv-pdf/` when only PDF code moved. CI already runs unit and Storybook tests in **separate jobs** to keep those surfaces decoupled.
- Sibling **product** repos (Frontend, Backend, `vectorization_pipeline`) remain **outside** this tree; do not assume their packages are linked here unless files prove it.

## Intended stack

| Area | Choice |
|------|--------|
| Framework | Next.js App Router with stable React |
| Package manager | `yarn` (workspaces: `apps/*`, `packages/*`) |
| Local development | Docker-first via `Dockerfile` and `compose*.yml` |
| CI | GitHub Actions in `.github/workflows/` |
| Production deploy | Vercel-native deployment |

## Working defaults

- Use `yarn`, not `npm` or `pnpm`.
- Prefer Server Components by default and add `"use client"` only when needed.
- Keep changes focused and avoid unrelated refactors.
