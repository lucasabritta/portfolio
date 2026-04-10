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

The default local path uses **Docker Compose** so installs and Node version match CI and production images.

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

## Linting and tests

- **Lint**: `yarn lint` uses the flat ESLint config from `eslint.config.mjs` (Next.js presets).
- **Tests**: `yarn test` runs a small [Vitest](https://vitest.dev/) suite with [Testing Library](https://testing-library.com/) for a focused UI smoke test (`components/portfolio-hero.test.tsx`).

CI runs install, lint, typecheck, test, and build in that order.

## GitHub Actions

Workflow: `.github/workflows/ci.yml`

Triggers on pushes to `main` and `master`, plus pull requests. Uses Node 22, Yarn cache, and `yarn install --frozen-lockfile`.

## Deploying on Vercel

1. Import this repository in the [Vercel dashboard](https://vercel.com/new).
2. Framework preset: **Next.js**. Install command: `yarn install`. Build command: `yarn build`. Output: default (Vercel handles Next.js).
3. Set any required environment variables under **Project → Settings → Environment Variables** (this template does not require secrets for the static landing content).

Preview deployments are created automatically for pull requests when the Git integration is enabled.

## Project layout

- `app/` — App Router routes, layout, and global styles
- `components/` — Shared UI (including the hero component covered by tests)
- `public/` — Static assets
- `Dockerfile` / `compose.yml` — Container workflows
- `.github/workflows/` — CI
