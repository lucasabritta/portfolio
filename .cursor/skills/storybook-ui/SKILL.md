---
name: storybook-ui
description: >-
  Develops and validates shared DOM UI in packages/web-ui (@portfolio/web-ui):
  Storybook dev/build, co-located stories, Vitest + @storybook/addon-vitest,
  fixtures, and ESLint boundaries from the root config.
  Use when adding or moving React components, configuring Storybook, or fixing
  UI library boundaries.
---

# Storybook UI workflow

**`@portfolio/web-ui`** is a **Yarn workspace package** (not a folder inside the Next app): keep DOM components, stories, and web CSS here; **do not** import `apps/web/app/**` from this package. CV data/types come from **`@portfolio/cv`** only.

## Read first

- [`docs/agents/project-overview.md`](../../../docs/agents/project-overview.md) — workspaces monorepo vs monolith
- [`docs/agents/storybook-ui.md`](../../../docs/agents/storybook-ui.md) — layout, fixtures, stories contract, Vitest, Docker, PR checklist
- [`docs/agents/repository-map.md`](../../../docs/agents/repository-map.md) — path reference

## Conventions

- Put reusable DOM components in **`packages/web-ui/src/`**; the Next app imports from **`@portfolio/web-ui`** (public API in `src/index.ts`). **`HomePageView`** uses **relative** imports inside the package so Next does not need a `@ui` alias.
- Put shared story args and viewport helpers in **`packages/web-ui/src/fixtures/`**; stories must not duplicate large `cvData` shapes.
- Add **`*.stories.tsx`** next to the component; titles **`Foundations/<Category>/<Name>`** (primitives), **`UI/Sections/<Name>`** / **`UI/Hero/<Name>`**, or **`Pages/<Route>`**.
- Put Storybook **`play`** functions in a co-located **`*.stories.test.ts`** file; use **`StoryPlayFn`** from **`packages/web-ui/src/storybook-play-types.ts`** and assign **`play: exportedPlay`** in **`*.stories.tsx`**. Every story with non-trivial rendered output should have a **`play`**.
- Every story file: **`tags: ['autodocs']`**, **`Default`**, semantic variants (`Empty`, `LongContent`, `ManyItems`, `NarrowViewport`, …), **`narrowMobileStory`** from fixtures where responsive coverage is required.
- Use **`play`** + **`storybook/test`** when the story renders focusable elements (links, buttons) or when asserting structure (headings, **`role="status"`**, visible copy).
- Share cross-page styles via co-located modules under **`packages/web-ui/src/`**, not `apps/web/app/*.module.css`.
- Résumé PDF stays in **`apps/web/lib/cv-pdf/**`** (react-pdf); do not move PDF sections into Storybook.

## Commands

**Host** (requires Node **22.12+** per `package.json` `engines` for Storybook CLI / CI parity):

```bash
yarn storybook
yarn build-storybook
yarn test:storybook
```

**Docker** (same scripts as CI; Playwright browsers live in the image at `PLAYWRIGHT_BROWSERS_PATH`):

```bash
docker compose run --rm web yarn lint
docker compose run --rm web yarn typecheck
docker compose run --rm web yarn test:storybook
docker compose run --rm web yarn build
docker compose run --rm web yarn build-storybook
docker compose run --rm --service-ports web yarn storybook
```

After UI changes, also run the **`nextjs-change-checklist`** skill where applicable.

## Done when

- `yarn lint`, `yarn typecheck`, `yarn test:storybook`, and `yarn build-storybook` pass (prefer Docker `web` service for parity with CI); app changes also need `yarn test:unit`.
- New components follow the PR checklist in `docs/agents/storybook-ui.md`.
