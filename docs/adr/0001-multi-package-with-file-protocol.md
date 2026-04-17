# ADR 0001 — Multi-package repo with Yarn `file:` protocol (no workspaces)

- **Status**: Accepted
- **Date**: 2026-04-17 (recorded retroactively; decision predates this ADR)

## Context

The portfolio ships a Next.js site, a shared DOM UI library, typed résumé content, and a Playwright e2e suite. These four surfaces have different release cadences, different dependency surfaces (e.g. `react-pdf` vs. Storybook tooling vs. Playwright), and different CI needs.

Candidate layouts:

1. A single Next.js app ("monolith") with internal folders (`components/`, `content/`).
2. A **Yarn workspaces** monorepo with a shared root `node_modules` and a single `yarn.lock`.
3. **Separate packages with their own `package.json` + `yarn.lock`**, linked via the Yarn `file:` protocol.

## Decision

Adopt option **3**: the repository is a **logical multi-package repo**, not a monolith and not a Yarn workspaces monorepo.

- Each of `apps/frontend`, `apps/e2e`, `packages/storybook`, `packages/resume-content` keeps its own `package.json` and `yarn.lock`.
- Cross-package linkage uses `"@portfolio/<pkg>": "file:../../packages/<pkg>"` style entries.
- CI workflows are **package-scoped** (`.github/workflows/ci-frontend.yml`, `ci-storybook.yml`, `ci-resume-content.yml`, `ci-e2e.yml`, `ci-build.yml`).

## Alternatives considered

- **Monolith**: rejected — mixes unrelated dependency graphs (react-pdf, Storybook, Playwright), blocks Vercel deploy granularity, makes ESLint/CI boundaries harder.
- **Yarn workspaces**: rejected for now — a single `yarn.lock` complicates Vercel's build for `apps/frontend`, and hoisted `node_modules` can leak types between packages we want strictly separated. Revisit if Vercel's workspace story improves or duplication cost grows.

## Consequences

- **Pros**: independent dependency graphs, sharp ESLint/CI boundaries, Vercel build focuses on `apps/frontend`, each package is self-hostable.
- **Cons**: more `yarn install` invocations, slightly slower cold CI, occasional duplicate packages across lockfiles. Accepted tradeoff; mitigated by Docker BuildKit cache mounts (see P2) and `ci-build.yml` caching.
