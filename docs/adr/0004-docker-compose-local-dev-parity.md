# ADR 0004 — Docker Compose is the canonical local dev and CI runtime

- **Status**: Accepted
- **Date**: 2026-04-17 (recorded retroactively; decision predates this ADR)

## Context

Across contributors, CI, and Vercel builds we need identical Node/Yarn versions and matching system dependencies (fonts, Playwright browsers, react-pdf runtime). Host setups drift; pinning `.nvmrc` alone has repeatedly produced "works on my machine" gaps.

## Decision

**Docker Compose is the default runtime for local dev and GitHub Actions CI.**

- `docker-compose.yml` at the repo root defines `frontend` (development image) and `frontend-prod` (runner).
- `apps/frontend/Dockerfile` is the single source of Node/Yarn versions and system deps for local dev and CI.
- GitHub Actions inherits the Dockerfile by invoking `docker compose build` / `docker compose run --rm frontend ...` in every workflow.
- Vercel production builds are **not** containerized from this Dockerfile — they run on Vercel's own build image using the `installCommand` / `buildCommand` / `outputDirectory` in `vercel.json` plus the Next.js framework preset. Node version is aligned via `apps/frontend/package.json#engines` and `.nvmrc`; parity is by contract, not by image inheritance.
- `.cursor/rules/project-core.mdc` requires Docker for local workflows; host `yarn`/`node` are a fallback only when Docker is unavailable.
- Yarn cache is persisted via BuildKit cache mounts (`--mount=type=cache,target=/usr/local/share/.cache/yarn`) to keep rebuilds fast without leaking into the image.

## Alternatives considered

- **Pinned Node via `.nvmrc` only**: rejected — does not cover Playwright system deps or react-pdf font rendering, and drifts on Windows/macOS/Linux hosts.
- **Dev containers (`.devcontainer`)**: deferred — adds editor-specific configuration; the Compose setup already runs everywhere without editor coupling. Revisit if contributors request it.

## Consequences

- **Pros**: one runtime definition, CI and local parity, Playwright browsers and fonts pre-installed, cache mounts keep installs fast.
- **Cons**: requires Docker Desktop on contributor machines; first build is slow. Mitigated by BuildKit cache mounts and the `docker-local-dev` skill.

## Related

- [`docs/agents/cv-pdf-docker.md`](../agents/cv-pdf-docker.md).
- [`.cursor/skills/docker-local-dev/SKILL.md`](../../.cursor/skills/docker-local-dev/SKILL.md).
- [`.cursor/skills/ci-github-actions/SKILL.md`](../../.cursor/skills/ci-github-actions/SKILL.md).
