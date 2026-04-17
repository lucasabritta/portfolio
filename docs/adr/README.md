# Architecture Decision Records

This directory captures **architecture decisions** that apply across the repository. Each ADR is short, dated, and records the context, the decision, the alternatives considered, and the consequences — not a to-do list.

## Why ADRs

The repo is a logical monorepo with intentional boundaries (see [`docs/agents/project-overview.md`](../agents/project-overview.md) and [`docs/agents/repository-map.md`](../agents/repository-map.md)). Those boundaries have been re-derived across several phases of work; ADRs exist so future contributors (and agents) can find the **why** without re-reading PRs.

## Format

- File name: `NNNN-kebab-case-title.md` starting at `0001`.
- Keep it under ~1 page when possible.
- Sections: **Status**, **Context**, **Decision**, **Alternatives considered**, **Consequences**.
- Update **Status** if a decision is superseded; do not delete old ADRs.

## Index

| ADR                                              | Title                                                         | Status   |
| ------------------------------------------------ | ------------------------------------------------------------- | -------- |
| [0001](0001-multi-package-with-file-protocol.md) | Multi-package repo with Yarn `file:` protocol (no workspaces) | Accepted |
| [0002](0002-shared-dom-via-storybook-package.md) | Shared DOM UI lives in `@portfolio/storybook`                 | Accepted |
| [0003](0003-react-pdf-for-cv.md)                 | CV is rendered via `react-pdf` inside `apps/frontend`         | Accepted |
| [0004](0004-docker-compose-local-dev-parity.md)  | Docker Compose is the canonical local dev and CI runtime      | Accepted |

## Related

- [`AGENTS.md`](../../AGENTS.md) — agent entry point.
- [`.cursor/rules/project-core.mdc`](../../.cursor/rules/project-core.mdc) — always-on constraints.
- [`docs/agents/repository-map.md`](../agents/repository-map.md) — where code and config live.
