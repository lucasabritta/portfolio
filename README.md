# Portfolio

Personal portfolio site and résumé, built as a small multi-package TypeScript repo: a **Next.js** app, a **Storybook** UI package, shared **résumé data**, and **Playwright** end-to-end tests. The CV is also available as a **PDF** generated in the Next app (no separate backend service).

## What is in this repository

| Area | Path | Role |
|------|------|------|
| Site | `apps/frontend/` | Next.js 16 (App Router), pages, `/api/cv` PDF download, `lib/cv-pdf/` (react-pdf layout) |
| Shared web UI | `packages/storybook/` | Components, styles, Storybook — imported by the app as `@portfolio/storybook` |
| Résumé data | `packages/resume-content/` | Types and content — `@portfolio/resume-content` |
| E2E tests | `apps/e2e/` | Playwright specs against the running app |
| Static Storybook for Next | `tools/build-storybook-for-next.mjs` | Build step wiring (see Storybook package) |

Packages link to each other with Yarn **`file:`** dependencies and their own `yarn.lock` files. CI runs **Docker Compose** so Node, Yarn, and Playwright match local containers.

## Quick start (Docker)

From the repo root (Docker Desktop running):

```bash
docker compose up --build frontend
```

Open [http://localhost:3000](http://localhost:3000). CV PDF: [http://localhost:3000/api/cv](http://localhost:3000/api/cv).

Storybook on port **6006** (inside the same image):

```bash
docker compose run --rm --service-ports frontend sh -lc "cd ../../packages/storybook && yarn install --frozen-lockfile && yarn storybook"
```

## Requirements

- **Node.js** 22.12+ (see `apps/frontend/package.json` `engines` and `.nvmrc` where present).
- **Yarn** classic (v1) per package directory.

## Host install (without Docker)

```bash
cd apps/frontend && yarn install && yarn dev
```

Use the same pattern for `packages/storybook`, `packages/resume-content`, and `apps/e2e` when working only in those folders.

## CI and deploy

- **GitHub Actions**: `.github/workflows/` — frontend, resume-content, Storybook, e2e, and production Docker image (`ci-build.yml`).
- **Vercel**: point the project **Root Directory** at `apps/frontend` and allow including files outside that root so `file:../../packages/...` resolves. Details: [`docs/agents/cursor-mcp.md`](docs/agents/cursor-mcp.md).

## Agent and contributor docs

Cursor rules, skills, and deeper notes live under [`docs/agents/`](docs/agents/) and [`.cursor/skills/`](.cursor/skills/). Start from [`AGENTS.md`](AGENTS.md).

## CV PDF tooling (Docker)

Dump, compare, fonts, and docx notes: [`docs/agents/cv-pdf-docker.md`](docs/agents/cv-pdf-docker.md). From repo root, after a successful dump path is configured:

```bash
sh scripts/cv/docker-dump.sh
```

## Conventions

- **Web UI**: view in `.tsx`, logic in `.ts`, styles in `.css` / `.module.css`; shared DOM lives in `@portfolio/storybook`.
- **CV PDF** (`apps/frontend/lib/cv-pdf/`): react-pdf `StyleSheet` and `.tsx` document tree — not web CSS for the PDF surface.
