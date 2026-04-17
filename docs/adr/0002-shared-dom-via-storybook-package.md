# ADR 0002 — Shared DOM UI lives in `@portfolio/storybook`

- **Status**: Accepted
- **Date**: 2026-04-17 (recorded retroactively; decision predates this ADR)

## Context

Presentational React components (`h1`…`h6`, `p`, `button`, `ul/ol/li`, `img`, `figure`, etc.), their CSS modules, and their Storybook documentation must live in **one** place so they are:

- visually auditable (Storybook + `@storybook/addon-vitest` interaction tests),
- testable in isolation (Vitest + atomic stories),
- and not duplicated across the Next app and future surfaces.

## Decision

`packages/storybook` (`@portfolio/storybook`) owns all shared DOM UI and its styles. The Next app **composes** those components with data.

Enforced by:

- **ESLint** (`apps/frontend/eslint.config.mjs`): `no-restricted-syntax` forbids visible-JSX primitives in `apps/frontend/app/**/*.tsx`; `no-restricted-imports` forbids local `*.module.css` in route segments.
- **Layering**: `packages/storybook` must **not** import `@portfolio/resume-content`; data shaping happens in the Next app.
- **Testing**: **exported UI components** ship a `*.stories.tsx` and a co-located `*.stories.test.ts` with a `play` function. Composition-only helpers (e.g. `home-page-shell.tsx`) are covered transitively by the stories that consume them.

## Alternatives considered

- **App-local `components/` + `@/components` alias**: rejected — defeats the purpose of a shared library and leaks data types into presentation code.
- **Split DOM and CSS into different packages**: rejected — doubles the surface without adding boundaries we need today.

## Consequences

- **Pros**: single source of truth for DOM, Storybook automatically covers anything rendered on the site, interaction tests live beside stories, the app stays a thin composition layer.
- **Cons**: `apps/frontend/app/**` feels "anemic" — intentional; data and slot composition is the app's job. New components must ship with a story and tests (mitigated by the `storybook-ui` skill).

## Related

- [ADR 0001](0001-multi-package-with-file-protocol.md) — multi-package layout that makes this boundary enforceable.
- [`docs/agents/storybook-ui.md`](../agents/storybook-ui.md) — authoring guide.
- [`.cursor/rules/nextjs-react.mdc`](../../.cursor/rules/nextjs-react.mdc).
