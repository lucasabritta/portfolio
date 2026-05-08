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

- This repo has **several Yarn packages** (`apps/frontend`, `packages/storybook`, `packages/resume-content`, `apps/e2e`, …): the **`frontend`** Compose service defaults **`working_dir`** to **`apps/frontend`**, but Storybook and other packages are invoked with **`yarn --cwd ../../packages/...`** (same pattern as CI). See [`docs/agents/project-overview.md`](../../../docs/agents/project-overview.md).
- Read `AGENTS.md` and `README.md` for compose service names and ports.
- Confirm **Docker Desktop** (or compatible engine) is running on the machine.

## Default procedure

1. **Discover entrypoints**: Locate `Dockerfile`, `docker-compose.yml` (this repo), and `.env.example` (if present).
2. **Environment**: Copy `.env.example` → `.env` or `.env.local` as documented; never invent secret values—ask the user for missing credentials.
3. **Build**: `docker compose build` (or `docker-compose build` if the repo uses v1 syntax—match existing docs).
4. **Run**: `docker compose up` (add `-d` for detached). Watch logs for the Next.js ready URL.
5. **Verify**: Open the documented host/port (often `http://localhost:3000`). If the container binds `0.0.0.0`, that matches external access from the host.

The **`frontend`** service mounts a **named volume** for `apps/frontend/.next` so Next dev/Turbopack does not write the build cache on the Windows/macOS bind mount (fewer file-lock and permission failures than a host `.next` folder).

That volume **persists between `docker compose up` runs**. If the app at `http://localhost:3000` looks like it is missing recent edits (especially under **`@portfolio/storybook`** or CSS modules), clear **contents inside** that cache (do not `rm -rf .next` itself from the app tree—on Linux that path is a mount point and can report *Device or resource busy*). With **`frontend`** stopped:

```bash
docker compose stop frontend
docker compose run --rm frontend sh -lc "find /workspace/apps/frontend/.next -mindepth 1 -delete 2>/dev/null || true"
docker compose up frontend
```

If that still fails (files open), wipe the named volume by mounting it alone (replace the volume name with the one from `docker volume ls` that ends in `_frontend_apps_next`, often `<compose_project>_frontend_apps_next`):

```bash
docker compose down
docker run --rm -v portfolio_frontend_apps_next:/data alpine sh -c "find /data -mindepth 1 -delete"
docker compose up frontend
```

## Storybook and full checks (this repo)

- **`Dockerfile`** pulls Node from **`public.ecr.aws/docker/library/node:24.14.1-bookworm-slim`** by default (mirrors Docker Official Images) when Docker Hub returns TLS errors via Cloudflare R2. Override at build time: `docker compose build --build-arg NODE_IMAGE=node:24.14.1-bookworm-slim frontend` if your network can reach Docker Hub reliably.
- The **`development`** image extends the **`deps`** stage so **Playwright system libraries** installed by `yarn playwright install chromium --with-deps` are present for **`yarn test:storybook`** / **`yarn test`** in packages that need Chromium. Do not split `development` onto a fresh `FROM node` without reinstalling deps, or Chromium will fail with missing **`libglib-2.0.so.0`** (and similar).
- **`frontend`** publishes **3000** (Next.js) and **6006** (Storybook). Browsers live at **`PLAYWRIGHT_BROWSERS_PATH=/ms-playwright`** (not under the `node_modules` volume).
- Run Storybook from the host browser:

  ```bash
  docker compose run --rm --service-ports frontend sh -lc "cd ../../packages/storybook && yarn install --frozen-lockfile && yarn storybook"
  ```

  Then open `http://localhost:6006`.

- Mirror CI locally (combine **`apps/frontend`** default cwd with **`yarn --cwd ../../packages/storybook …`** where CI does):

  ```bash
  docker compose run --rm frontend yarn lint
  docker compose run --rm frontend yarn typecheck
  docker compose run --rm frontend yarn test:unit
  docker compose run --rm frontend sh -lc "yarn --cwd ../../packages/storybook install --frozen-lockfile && yarn --cwd ../../packages/storybook lint"
  docker compose run --rm frontend yarn --cwd ../../packages/storybook typecheck
  docker compose run --rm frontend yarn --cwd ../../packages/storybook test:storybook
  docker compose run --rm frontend yarn build
  docker compose run --rm frontend yarn --cwd ../../packages/storybook build-storybook
  ```

## Troubleshooting

- **ESLint after `yarn build`**: Static Storybook output is under `apps/frontend/public/storybook/` (gitignored). Root `yarn lint` ignores that path; if lint suddenly scans huge bundles, ensure `eslint.config.mjs` still includes `apps/frontend/public/storybook/**` in `globalIgnores`.
- **Port conflicts**: Change the host port in compose or stop the conflicting process; document the chosen port if you change it.
- **Stale volumes**: After dependency or lockfile changes, `docker compose build --no-cache` or remove anonymous volumes per team practice.
- **Stale Next dev output**: See the **`.next` named volume** note above; `rm -rf .next` inside the **`frontend`** container (or delete the `*_frontend_apps_next` volume) before assuming code changes are missing.
- **ARM vs x86**: If base images fail on Apple Silicon, prefer official images with `linux/arm64` support or explicit platform flags only when the repo already uses them.

## Done when

- Containers start without error and the app responds on the documented URL.
- Any new env vars are reflected in `.env.example` and mentioned in `README.md` or `AGENTS.md` if agents need them.
