# Portfolio

Personal portfolio site and résumé, built as a small multi-package TypeScript repo: a **Next.js** app, a **Storybook** UI package, shared **résumé data**, and **Playwright** end-to-end tests.

## What is in this repository

| Area                      | Path                                 | Role                                                                          |
| ------------------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| Site                      | `apps/frontend/`                     | Next.js 16 (App Router), pages, app shell, and route handlers                 |
| Shared web UI             | `packages/storybook/`                | Components, styles, Storybook — imported by the app as `@portfolio/storybook` |
| Résumé data               | `packages/resume-content/`           | Types and content — `@portfolio/resume-content`                               |
| E2E tests                 | `apps/e2e/`                          | Playwright specs against the running app                                      |
| Static Storybook for Next | `tools/build-storybook-for-next.mjs` | Build step wiring (see Storybook package)                                     |

Packages link to each other with Yarn **`file:`** dependencies and their own `yarn.lock` files. CI runs **Docker Compose** so Node, Yarn, and Playwright match local containers.

## Quick start (Docker)

From the repo root (Docker Desktop running):

```bash
docker compose up --build frontend
```

Open [http://localhost:3000](http://localhost:3000).

Next dev cache is written to **`apps/frontend/.next`** on your machine (same bind mount as the repo). If the local site looks older than production, delete that folder and run Compose again.

Storybook on port **6006** (inside the same image):

```bash
docker compose run --rm --service-ports frontend sh -lc "cd ../../packages/storybook && yarn install --frozen-lockfile && yarn storybook"
```

## Requirements

- **Node.js** 24.14.1 (see `.nvmrc`, package `engines`, and the Docker image pin).
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

## Conventions

- **Web UI**: view in `.tsx`, logic in `.ts`, styles in `.css` / `.module.css`; shared DOM lives in `@portfolio/storybook`.
- **Class names**: compose with [`clsx`](https://github.com/lukeed/clsx) instead of ad-hoc `.filter(Boolean).join(" ")` joiners.
- **Formatting**: [Prettier](https://prettier.io) is the source of truth (root `.prettierrc.json`). Each package exposes `yarn format` / `yarn format:check`; CI runs the check so drift never merges.

## Architecture decisions

Durable architectural decisions (multi-package layout, shared DOM via Storybook, Docker Compose parity) are captured as short ADRs in [`docs/adr/`](docs/adr/README.md). Read the index first before proposing a cross-cutting change.
