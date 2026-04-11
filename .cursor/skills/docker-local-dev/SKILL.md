---
name: docker-local-dev
description: >-
  Runs and debugs the portfolio app locally using Docker or Docker Compose.
  Use when the user asks to run the app in Docker, fix compose errors, expose
  ports, or align container commands with Next.js. Use when editing Dockerfile
  or docker-compose files and verifying the stack starts.
---

# Docker-first local development

## Before you start

- This repo is a **Yarn workspaces monorepo** (`apps/web`, `packages/web-ui`, `packages/cv`, …): the same **`web`** image runs Next.js, Storybook, and tests, but **packages stay separated** in code—see [`docs/agents/project-overview.md`](../../../docs/agents/project-overview.md).
- Read `AGENTS.md` and any `README.md` sections that document compose service names and ports.
- Confirm **Docker Desktop** (or compatible engine) is running on the machine.

## CV PDF (this repo)

- Prefer **`yarn cv:dump:docker`** or [`docs/agents/cv-pdf-docker.md`](../../../docs/agents/cv-pdf-docker.md) for rendering and comparing the résumé PDF (Vitest dump, Python raster/PNG, docx extract). Do not rely on host Python for those steps.

## Default procedure

1. **Discover entrypoints**: Locate `Dockerfile`, `docker-compose.yml` (this repo), and `.env.example` (if present).
2. **Environment**: Copy `.env.example` → `.env` or `.env.local` as documented; never invent secret values—ask the user for missing credentials.
3. **Build**: `docker compose build` (or `docker-compose build` if the repo uses v1 syntax—match existing docs).
4. **Run**: `docker compose up` (add `-d` for detached). Watch logs for the Next.js ready URL.
5. **Verify**: Open the documented host/port (often `http://localhost:3000`). If the container binds `0.0.0.0`, that matches external access from the host.

The **`web`** service mounts a **named volume** for `apps/web/.next` so Next dev/Turbopack does not write the build cache on the Windows/macOS bind mount (fewer file-lock and permission failures than a host `.next` folder).

## Storybook and full checks (this repo)

- **`Dockerfile`** pulls Node from **`public.ecr.aws/docker/library/node:22-bookworm-slim`** by default (mirrors Docker Official Images) when Docker Hub returns TLS errors via Cloudflare R2. Override at build time: `docker compose build --build-arg NODE_IMAGE=node:22-bookworm-slim web` if your network can reach Docker Hub reliably.
- The **`development`** image extends the **`deps`** stage so **Playwright system libraries** installed by `yarn playwright install chromium --with-deps` are present for **`yarn test:storybook`** / **`yarn test`**. Do not split `development` onto a fresh `FROM node` without reinstalling deps, or Chromium will fail with missing **`libglib-2.0.so.0`** (and similar).
- **`web`** publishes **3000** (Next.js) and **6006** (Storybook). Browsers live at **`PLAYWRIGHT_BROWSERS_PATH=/ms-playwright`** (not under the `node_modules` volume).
- Run Storybook from the host browser:

  ```bash
  docker compose run --rm --service-ports web yarn storybook
  ```

  Then open `http://localhost:6006`.

- Mirror CI locally (same `yarn` scripts as `.github/workflows/ci.yml`):

  ```bash
  docker compose run --rm web yarn lint
  docker compose run --rm web yarn typecheck
  docker compose run --rm web yarn test:unit
  docker compose run --rm web yarn test:storybook
  docker compose run --rm web yarn build
  docker compose run --rm web yarn build-storybook
  ```

## Troubleshooting

- **ESLint after `yarn build`**: Static Storybook output is under `apps/web/public/storybook/` (gitignored). Root `yarn lint` ignores that path; if lint suddenly scans huge bundles, ensure `eslint.config.mjs` still includes `apps/web/public/storybook/**` in `globalIgnores`.
- **Port conflicts**: Change the host port in compose or stop the conflicting process; document the chosen port if you change it.
- **Stale volumes**: After dependency or lockfile changes, `docker compose build --no-cache` or remove anonymous volumes per team practice.
- **ARM vs x86**: If base images fail on Apple Silicon, prefer official images with `linux/arm64` support or explicit platform flags only when the repo already uses them.

## Done when

- Containers start without error and the app responds on the documented URL.
- Any new env vars are reflected in `.env.example` and mentioned in `README.md` or `AGENTS.md` if agents need them.
