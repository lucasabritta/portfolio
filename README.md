# Portfolio

Frontend-only portfolio site built with **Next.js** (App Router), **React**, and **TypeScript**. Package management uses **Yarn**.

## Requirements

- **Node.js** 20.19 or newer (`package.json` `engines`). **Node 22** matches Docker, CI, and `.nvmrc`.
- **Yarn** classic (v1). The committed `.yarnrc` enables `ignore-engines` so installs are not blocked when a transitive package’s `engines` field is stricter than your local Node patch; use Node 22 when you can for parity with CI.

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
| `yarn typecheck` | `tsc --noEmit`                              |
| `yarn test`   | Vitest + Testing Library (single run)            |
| `yarn test:watch` | Vitest watch mode                          |

## Docker-first workflow

The default local path uses **Docker Compose** (`docker-compose.yml`) so installs and Node version match CI and production images. The `web` image prepares **Yarn 1.22.22** at build time (`Dockerfile`), so container commands do not prompt for a Corepack/Yarn download.

### Development (hot reload, bind mount)

```bash
docker compose up --build web
```

The app listens on [http://localhost:3000](http://localhost:3000). Source is mounted from the host; `node_modules` live in a named volume.

### Production-like image (standalone output)

```bash
docker compose --profile prod up --build web-prod
```

Serve on [http://localhost:3001](http://localhost:3001).

### Docker build targets

| Stage         | Purpose                                      |
|---------------|----------------------------------------------|
| `development` | Installs deps, runs `yarn dev:docker`        |
| `runner`      | Minimal image from `next build` standalone   |

Override the dev command if needed, for example:

```bash
docker compose run --rm web yarn lint
```

### CV PDF (Docker-first)

- **Dump the CV PDF** (same Node as the `web` service): `yarn cv:dump:docker` → `tmp-cv-compare/docker-latest-cv.pdf`
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
- **Tests**: `yarn test` runs [Vitest](https://vitest.dev/) tests focused on extracted logic modules (for example: `*.test.ts` under `app/`, `lib/`, and `storybook/ui/`).
- **Storybook**: `yarn storybook` for local UI development; `yarn build-storybook` for a static build (see `docs/agents/storybook-ui.md`).

CI runs install, lint, typecheck, test, and build in that order.

## GitHub Actions

Workflow: `.github/workflows/ci.yml`

Triggers on pushes to `main` and `master`, plus pull requests. Uses Node 22, Yarn cache, and `yarn install --frozen-lockfile`.

## Deploying on Vercel

1. Import this repository in the [Vercel dashboard](https://vercel.com/new).
2. Framework preset: **Next.js**. Install command: `yarn install`. Build command: `yarn build`. Output: default (Vercel handles Next.js).
3. Enable **Analytics** and **Speed Insights** in the Vercel project dashboard if you want first-party traffic and performance reporting for deployed environments.
4. Set any required environment variables under **Project → Settings → Environment Variables** (this template does not require secrets for the static landing content).

Preview deployments are created automatically for pull requests when the Git integration is enabled.

This repo includes `@vercel/analytics` and `@vercel/speed-insights` through `app/observability.tsx`, rendered from the root layout, so the integration stays centralized and automatically covers all routes. Metrics appear after a Vercel deployment receives traffic.

## Project layout

- `app/` — App Router routes, layout, global styles, and page views (`*.view.tsx`)
- `storybook/ui/` — Shared DOM components, CSS modules, and Storybook stories
- `lib/cv-pdf/` — Résumé PDF (react-pdf) and related tests
- `public/` — Static assets
- `Dockerfile` / `docker-compose.yml` — Container workflows
- `.github/workflows/` — CI

## Frontend layering convention

All frontend changes should keep a clear separation of responsibilities:

- **View (`.tsx`)**: JSX markup and composition only.
- **Logic (`.ts`)**: pure helpers, formatters, selectors, and assembly logic.
- **Styles (`.css` / `.module.css`)**: web UI styling.

For CV PDF generation (`lib/cv-pdf/**`), keep this equivalent split:

- **View (`.tsx`)** for react-pdf render trees (`Document`, `Page`, `View`, `Text`).
- **Logic (`.ts`)** for pagination/data partition helpers.
- **Styles (`styles.ts`)** with `@react-pdf/renderer` `StyleSheet` (do not replace with web CSS).
