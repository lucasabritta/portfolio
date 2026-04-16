# Portfolio

Portfolio site with a Next.js frontend. CV PDF generation runs inside the frontend API route.

Each directory under `apps/*` and `packages/*` is treated as a standalone project with its own `package.json` and lockfile.

## Requirements

- **Node.js** **22.12 or newer** (`package.json` `engines`). Storybook 10 and Vitest (including `@storybook/addon-vitest`) expect a current Node 22 runtime; **`.nvmrc`** pins `22`.
- **Yarn** classic (v1) in each project folder.
- `@portfolio/resume-content` and `@portfolio/storybook` are consumed through local `file:` dependencies so frontend/backend install without publishing packages.

## Local development (host)

```bash
cd apps/frontend && yarn install && yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script        | Description                                      |
|---------------|--------------------------------------------------|
| `cd apps/frontend && yarn dev` | Next.js dev server                               |
| `cd apps/frontend && yarn build` | Production build                                 |
| `cd apps/frontend && yarn start` | Serve production build locally                   |
| `cd apps/frontend && yarn lint` | Frontend ESLint checks |
| `cd packages/resume-content && yarn lint` | Resume-content ESLint checks |
| `cd packages/storybook && yarn lint` | Storybook ESLint checks |
| `cd apps/e2e && yarn lint` | Playwright spec ESLint checks |
| `cd apps/frontend && yarn test:unit` | Frontend unit tests (Vitest/jsdom) |
| `cd packages/resume-content && yarn test:unit` | Resume-content unit tests |
| `cd packages/storybook && yarn test:storybook` | Storybook browser/UI tests |
| `cd apps/e2e && yarn test:e2e` | Playwright end-to-end tests |

## Docker-first workflow

The default local path uses **Docker Compose** (`docker-compose.yml`) from the repository root. Runtime builds from `apps/frontend/Dockerfile`.

App Dockerfiles default to **AWS Public ECR**’s mirror of the official Node image (`public.ecr.aws/docker/library/node:22-bookworm-slim`) so image pulls work when Docker Hub’s CDN hits TLS issues on some networks.

### Development (hot reload, bind mount)

```bash
docker compose up --build frontend
```

The app listens on [http://localhost:3000](http://localhost:3000). Storybook is available on **6006** inside the container; run it with published ports, for example:

```bash
docker compose run --rm --service-ports frontend yarn dev:docker
```

Then open [http://localhost:6006](http://localhost:6006). Source is mounted from the host; `node_modules` live in a named volume. Playwright browsers for component tests are baked into the image at **`PLAYWRIGHT_BROWSERS_PATH=/ms-playwright`** (see `Dockerfile`).

The frontend serves CV downloads through `/api/cv` directly (no separate backend service).

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

Override commands per service folder if needed, for example:

```bash
docker compose run --rm frontend yarn lint
```

Run e2e from the e2e folder:

```bash
cd apps/e2e && yarn test:e2e
cd apps/e2e && yarn test:e2e cv-download.spec.ts
```

### CV PDF (Docker-first)

- **Dump the CV PDF** through Docker Compose service commands from repo root.
- **Full notes** (Python compare, PNG preview, fonts, docx extract): [`docs/agents/cv-pdf-docker.md`](docs/agents/cv-pdf-docker.md)
- **Shell equivalent**: `scripts/cv/docker-dump.sh`

Profile `cv` runs a slim Python image with the repo mounted (no Node). Examples:

```bash
docker compose --profile cv run --rm cv-tools python scripts/download_cv_fonts.py
docker compose --profile cv run --rm -v "$HOME/Downloads:/docs:ro" cv-tools \
  python scripts/extract_docx_cv_styles.py /docs/Lucas_Abritta_EM.docx
```

## Linting and tests

- **Lint**: run per folder (`apps/frontend`, `packages/resume-content`, `packages/storybook`, `apps/e2e`).
- **Tests**: run per folder (`apps/frontend` unit, `packages/resume-content` unit, `packages/storybook` browser tests, `apps/e2e` Playwright).
- **Storybook**: design-system package **`packages/storybook`** (`@portfolio/storybook`), fixtures under `packages/storybook/src/fixtures/`, full notes in [`docs/agents/storybook-ui.md`](docs/agents/storybook-ui.md).

CI runs install/lint/typecheck/tests in each folder's working directory; `ci-build.yml` runs `apps/frontend` production build.

## GitHub Actions

Workflows: **`ci-frontend.yml`**, **`ci-resume-content.yml`**, **`ci-storybook.yml`**, **`ci-e2e.yml`** (per package/concern), plus **`ci-build.yml`** for the production build.

Triggers on pushes to `main` and on pull requests. Workflows use Node 22 and Yarn cache with per-folder installs.

## Deploying on Vercel

1. Import this repository in the [Vercel dashboard](https://vercel.com/new).
2. **Recommended:** **Project → Settings → General → Root Directory** → **`apps/frontend`**, and enable **Include files outside the Root Directory in the Build Step** (for `file:../../packages/...`). Optional overrides: **`apps/frontend/vercel.json`**. See [`docs/agents/cursor-mcp.md`](docs/agents/cursor-mcp.md).
3. **If Root Directory stays the repo root:** root **`vercel.json`** and a minimal root **`package.json`** / **`yarn.lock`** are kept so Vercel can detect Next.js and install/build under **`apps/frontend`** until you apply step 2.
4. Enable **Analytics** and **Speed Insights** in the Vercel project dashboard if you want first-party traffic and performance reporting for deployed environments.
5. Set any required environment variables under **Project → Settings → Environment Variables**.

Preview deployments are created automatically for pull requests when the Git integration is enabled.

This repo includes `@vercel/analytics` and `@vercel/speed-insights` through `apps/frontend/app/observability.tsx`, rendered from the root layout, so the integration stays centralized and automatically covers all routes. Metrics appear after a Vercel deployment receives traffic.

## Project layout

- `apps/frontend/` — Next.js app (`app/`, `public/`)
- `packages/storybook/` — Shared DOM UI (`@portfolio/storybook`), Storybook, web CSS
- `packages/resume-content/` — Résumé data and types (`@portfolio/resume-content`)
- `apps/frontend/lib/cv-pdf/` — CV PDF layout (`*.css`, `*.ts`, `*.tsx`) and `cv-pdf-download-response.ts` barrel used by `/api/cv`
- `apps/frontend/Dockerfile`, `docker-compose.yml` (repo root) — Container workflows
- `.github/workflows/` — CI

## Frontend layering convention

All frontend changes should keep a clear separation of responsibilities:

- **View (`.tsx`)**: JSX markup and composition only.
- **Logic (`.ts`)**: pure helpers, formatters, selectors, and assembly logic.
- **Styles (`.css` / `.module.css`)**: web UI styling.

For CV PDF generation (`apps/frontend/lib/**`, consumed by frontend API route), keep this equivalent split:

- **View (`.tsx`)** for react-pdf render trees (`Document`, `Page`, `View`, `Text`).
- **Logic (`.ts`)** for pagination/data partition helpers.
- **Styles (`styles.ts`)** with `@react-pdf/renderer` `StyleSheet` (do not replace with web CSS).
