# Project Overview

## Scope

This repository contains the portfolio site. Do not assume shared frontend, backend, or AI pipeline packages exist here unless they are present in this tree.

Related product work may live in separate repositories:

- Frontend code lives in the Frontend repository.
- Backend code lives in the Backend repository.
- Most AI orchestration code lives in the `vectorization_pipeline` repository.

## Multi-package layout (logical monorepo, not a monolith)

The portfolio uses **one git root** with **several Yarn packages** (`apps/*`, `packages/*`). Each package has its own `package.json` and **`yarn.lock`**. The Next app consumes **`@portfolio/storybook`** and **`@portfolio/resume-content`** via local **`file:`** dependencies. That keeps the site, shared DOM UI, and résumé data **separately versioned and importable** — not a monolith where every feature reaches into every layer.

| Surface | Role |
|---------|------|
| `apps/frontend` (`@portfolio/frontend`) | Next.js App Router: routes, layouts, `public/`, `/api/cv` (react-pdf), `lib/cv-pdf/` |
| `packages/storybook` (`@portfolio/storybook`) | Shared DOM components, Storybook (`.storybook/`), web CSS; consumed by the app via **`@portfolio/storybook`** |
| `packages/resume-content` (`@portfolio/resume-content`) | Résumé types, `resumeData`, small shared formatters (`buildPhoneHref`, work-history keys) |
| `apps/e2e` | Playwright end-to-end specs (run against the Next app) |
| `tools/` | Repo-local tooling (e.g. Storybook build helper for Next) |

**Revamp v1:** The multi-page portfolio shell (`/`, `/projects`, `/build`), global nav/footer, home marketing blocks, curated project/build copy, E2E smoke, and Storybook coverage for new UI are **done** per [`portfolio-site-revamp-plan.md`](portfolio-site-revamp-plan.md) (success criteria and Phases 1–4). Further work is optional polish or v2 scope unless that doc is updated.

**Agent expectations:**

- Respect **import direction** and **layer boundaries** (see [`docs/agents/repository-map.md`](repository-map.md)). The Storybook package must not import from `apps/frontend/app/**` or from **`@portfolio/resume-content`**.
- When validating changes, run the **narrowest** meaningful checks in the package you touched (see CI: `docker compose run --rm frontend yarn --cwd ../../packages/...` patterns in `.github/workflows/`).
- Sibling **product** repos (Frontend, Backend, `vectorization_pipeline`) remain **outside** this tree; do not assume their packages are linked here unless files prove it.

## Intended stack

| Area | Choice |
|------|--------|
| Framework | Next.js App Router with stable React |
| Package manager | `yarn` (classic) per package |
| Local development | Docker-first via root `docker-compose.yml` and `apps/frontend/Dockerfile` |
| CI | GitHub Actions in `.github/workflows/` |
| Production deploy | Vercel-native deployment (Next app under `apps/frontend`) |

## Working defaults

- Use `yarn`, not `npm` or `pnpm`.
- Prefer Server Components by default and add `"use client"` only when needed.
- Keep changes focused and avoid unrelated refactors.
