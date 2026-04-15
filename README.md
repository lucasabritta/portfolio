# Portfolio

Frontend-only portfolio site built with **Next.js** (App Router), **React**, and **TypeScript**. Package management uses **Yarn**.

## Requirements

- **Node.js** **22.12 or newer** (`package.json` `engines`). Storybook 10 and Vitest (including `@storybook/addon-vitest`) expect a current Node 22 runtime; **`.nvmrc`** pins `22`.
- **Yarn** classic (v1). The committed `.yarnrc` may enable `ignore-engines` for edge transitive packages; still use **Node 22.12+** locally so `yarn storybook`, `yarn test:storybook`, and `yarn build-storybook` match CI (plus `yarn test:unit` for workspace unit tests).

## Local development (host)

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script        | Description                                      |
|---------------|--------------------------------------------------|
| `yarn dev`    | Next.js dev server                               |
| `yarn build`  | Production build                                 |
| `yarn start`  | Serve production build locally                   |
| `yarn lint`   | ESLint (Next core-web-vitals + TypeScript)       |
| `yarn lint:e2e` | ESLint scoped to **`apps/e2e`** Playwright specs |
| `yarn typecheck` | `tsc --noEmit` across workspaces            |
| `yarn test`   | Vitest **unit** projects (same as `test:unit`)   |
| `yarn test:unit` | All Vitest unit projects (frontend, backend, resume-content) |
| `yarn test:unit:frontend` | Vitest **`apps/frontend`** (jsdom)        |
| `yarn test:unit:backend` | Vitest **`apps/backend`** (node)          |
| `yarn test:unit:resume-content` | Vitest **`packages/resume-content`** |
| `yarn test:storybook` | Vitest Storybook project in **`@portfolio/storybook`** (`@storybook/addon-vitest`, Chromium) |
| `yarn test:e2e` | Playwright e2e tests from **`apps/e2e`** (runner command used inside Docker) |
| `yarn test:e2e:docker` | Docker-first e2e wrapper (`docker compose run --rm frontend yarn test:e2e`) |
| `yarn test:watch` | Vitest watch mode                          |
| `yarn storybook` | Storybook dev server on port **6006** (`--host 0.0.0.0` for Docker) |
| `yarn build-storybook` | Static Storybook build for **`@portfolio/storybook`** |

## Docker-first workflow

The default local path uses **Docker Compose** (`docker-compose.yml`) so installs and Node version match CI and production images. The **`frontend`** image prepares **Yarn 1.22.22** at build time (`Dockerfile`), so container commands do not prompt for a Corepack/Yarn download.

The `Dockerfile` defaults to **AWS Public ECR**’s mirror of the official Node image (`public.ecr.aws/docker/library/node:22-bookworm-slim`) so image pulls work when Docker Hub’s CDN hits TLS issues on some networks. The dev stage extends the **deps** stage so **Playwright**’s Chromium has required system libraries for **`yarn test:storybook`** (and **`yarn test`**) inside the container.

### Development (hot reload, bind mount)

```bash
docker compose up --build frontend
```

The app listens on [http://localhost:3000](http://localhost:3000). Storybook is available on **6006** inside the container; run it with published ports, for example:

```bash
docker compose run --rm --service-ports frontend yarn storybook
```

Then open [http://localhost:6006](http://localhost:6006). Source is mounted from the host; `node_modules` live in a named volume. Playwright browsers for component tests are baked into the image at **`PLAYWRIGHT_BROWSERS_PATH=/ms-playwright`** (see `Dockerfile`).

### Production-like image (standalone output)

```bash
docker compose --profile prod up --build frontend-prod
```

Serve on [http://localhost:3001](http://localhost:3001).

### Docker build targets

| Stage         | Purpose                                      |
|---------------|----------------------------------------------|
| `development` | Installs deps, runs `yarn dev:docker`        |
| `runner`      | Minimal image from `next build` standalone   |

Override the dev command if needed, for example:

```bash
docker compose run --rm frontend yarn lint
```

Run e2e in Docker only:

```bash
docker compose run --rm frontend yarn test:e2e
docker compose run --rm frontend yarn test:e2e apps/e2e/cv-download.spec.ts
```

### CV PDF (Docker-first)

- **Dump the CV PDF** (same Node as the `frontend` service): `yarn cv:dump:docker` → `tmp-cv-compare/docker-latest-cv.pdf`
- **Full notes** (Python compare, PNG preview, fonts, docx extract): [`docs/agents/cv-pdf-docker.md`](docs/agents/cv-pdf-docker.md)
- **Shell equivalent**: `scripts/cv/docker-dump.sh`

Profile `cv` runs a slim Python image with the repo mounted (no Node). Examples:

```bash
docker compose --profile cv run --rm cv-tools python scripts/download_cv_fonts.py
docker compose --profile cv run --rm -v "$HOME/Downloads:/docs:ro" cv-tools \
  python scripts/extract_docx_cv_styles.py /docs/Lucas_Abritta_EM.docx
```

## Linting and tests

- **Lint**: `yarn lint` uses the flat ESLint config from `eslint.config.mjs` (Next.js presets).
- **Tests**: **`yarn test:unit`** runs **`apps/frontend`**, **`apps/backend`**, and **`packages/resume-content`** specs in Node (frontend project uses jsdom). **`yarn test:storybook`** runs stories in **`packages/storybook`** via headless Chromium (Playwright). **`yarn test:e2e`** runs Playwright specs in **`apps/e2e`** and is intended to run via **`yarn test:e2e:docker`**. **`yarn test`** runs the unit suite. CI uses **one workflow per workspace/concern** (`ci-frontend`, `ci-backend`, `ci-resume-content`, `ci-storybook`, `ci-e2e` under `.github/workflows/`), each running scoped checks, and a separate **`ci-build.yml`** runs production **`yarn build`**.
- **Storybook**: design-system package **`packages/storybook`** (`@portfolio/storybook`), fixtures under `packages/storybook/src/fixtures/`, full notes in [`docs/agents/storybook-ui.md`](docs/agents/storybook-ui.md).

CI runs the same stages per module (install → lint → typecheck → tests); **`ci-build.yml`** runs **`yarn build`** (Storybook static bundle + Next production build).

## GitHub Actions

Workflows: **`ci-frontend.yml`**, **`ci-backend.yml`**, **`ci-resume-content.yml`**, **`ci-storybook.yml`**, **`ci-e2e.yml`** (per package/concern), plus **`ci-build.yml`** for the production build. Scoped lint/typecheck scripts live in root **`package.json`** (`lint:frontend`, `typecheck:backend`, etc.).

Triggers on pushes to `main` and on pull requests. Workflows use Node 22, Yarn cache, and `yarn install --frozen-lockfile`; `ci-e2e.yml` installs Playwright Chromium on the runner, while Docker remains available for local e2e via `yarn test:e2e:docker`.

## Deploying on Vercel

1. Import this repository in the [Vercel dashboard](https://vercel.com/new).
2. Framework preset: **Next.js**. Install command: `yarn install`. Build command: `yarn workspace @portfolio/frontend build` (or rely on root **`vercel.json`**). Set the Vercel project **root directory** to the **repository root** so workspaces resolve.
3. Enable **Analytics** and **Speed Insights** in the Vercel project dashboard if you want first-party traffic and performance reporting for deployed environments.
4. Set any required environment variables under **Project → Settings → Environment Variables** (this template does not require secrets for the static landing content).

Preview deployments are created automatically for pull requests when the Git integration is enabled.

This repo includes `@vercel/analytics` and `@vercel/speed-insights` through `apps/frontend/app/observability.tsx`, rendered from the root layout, so the integration stays centralized and automatically covers all routes. Metrics appear after a Vercel deployment receives traffic.

## Project layout

- `apps/frontend/` — Next.js app (`app/`, `public/`)
- `packages/storybook/` — Shared DOM UI (`@portfolio/storybook`), Storybook, web CSS
- `packages/resume-content/` — Résumé data and types (`@portfolio/resume-content`)
- `apps/backend/` — CV PDF pipeline (`@portfolio/backend`), consumed by the Next API route
- `Dockerfile` / `docker-compose.yml` — Container workflows
- `.github/workflows/` — CI

## Frontend layering convention

All frontend changes should keep a clear separation of responsibilities:

- **View (`.tsx`)**: JSX markup and composition only.
- **Logic (`.ts`)**: pure helpers, formatters, selectors, and assembly logic.
- **Styles (`.css` / `.module.css`)**: web UI styling.

For CV PDF generation (`apps/backend/src/cv-pdf/**`), keep this equivalent split:

- **View (`.tsx`)** for react-pdf render trees (`Document`, `Page`, `View`, `Text`).
- **Logic (`.ts`)** for pagination/data partition helpers.
- **Styles (`styles.ts`)** with `@react-pdf/renderer` `StyleSheet` (do not replace with web CSS).
