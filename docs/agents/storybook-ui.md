# Storybook — shared web UI (`@portfolio/storybook`)

The **`@portfolio/storybook`** package is a **separate workspace** from **`@portfolio/frontend`** (Next) and from **`@portfolio/resume-content`** (résumé data). Shared DOM UI must stay **library-owned** and **consumable by the app** via the package name — **no** imports from `apps/frontend/app/**` inside the UI package, and **no** `storybook/**` paths in the app. Storybook stays **presentation-only**: it must **not** import **`@portfolio/resume-content`** (ESLint enforces this); the app composes **`resumeData`** into Storybook-presentational props while Storybook owns all classes/CSS.

### Presentational JSX lives in this package — the Next app composes

**`apps/frontend/app/**/*.tsx`** (route segments — `page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`, `global-error.tsx`, and sibling view files like `site-chrome-client.tsx`) must be **pure composition**: import components from **`@portfolio/storybook`**, pass them data/handlers, and return the tree. They **must not** render visible DOM primitives — specifically **`h1`–`h6`**, **`p`**, **`button`**, **`label`**, **`ul`/`ol`/`li`/`dl`**, **`img`**, **`figure`**, **`blockquote`**, **`input`/`select`/`textarea`/`form`**. Structural/landmark elements (**`main`**, **`section`**, **`article`**, **`header`**, **`footer`**, **`nav`**, **`aside`**, **`div`**, **`span`**, **`html`**, **`body`**) remain allowed because the app is responsible for composition, layout, and landmarks (e.g. `global-error.tsx` must render its own `<html><body>`).

Patterns for things a pure UI package can't know about:

- **Internal navigation** (e.g. `next/link`): the Storybook component accepts a `linkComponent` prop typed as **`SiteShellLinkComponent`** (`packages/storybook/src/site-chrome/site-link-component.ts`); external anchors stay plain `<a>`. The app passes `Link` at the composition site (see `app/site-chrome-client.tsx`).
- **Handlers** (e.g. App Router `reset()` in `error.tsx`, `global-error.tsx`): declare them as action props (see `StatusPageAction` / `GlobalErrorViewProps`).
- **Last-resort boundaries** (`global-error.tsx`): the view exports inline styles (e.g. **`globalErrorBodyStyle`**) the app applies to `<body>`, so the component still owns the look even when CSS fails to load.

This rule is enforced by **`no-restricted-syntax`** in **`apps/frontend/eslint.config.mjs`** (`*.test.tsx` under `app/` is excluded). If a lint error points here, extract a component into **`packages/storybook/src/<feature>/`** (with co-located story + `*.stories.test.ts` `play`), export it from **`packages/storybook/src/index.ts`**, and compose it from the app.

## Where UI lives

- **DOM components** (anything that renders browser JSX) belong in **`packages/storybook/src/`**. The Next app imports composition pieces like **`HomePageShell`**, **`PortfolioHero`**, and section components from **`@portfolio/storybook`** (see `packages/storybook/src/index.ts`).
- **Global web CSS** lives in **`packages/storybook/src/globals.css`**. Root layout classes use **`packages/storybook/src/layout.module.css`**, imported from **`apps/frontend/app/layout.tsx`** as **`@portfolio/storybook/globals.css`** and **`@portfolio/storybook/layout.module.css`** (package `exports`).
- **Story fixtures** live in **`packages/storybook/src/fixtures/`**. Stories use **`@ui/...`** (Vite/TS path alias); package components consumed by Next should use relative imports internally where needed so Next/Turbopack does not require duplicate `@ui` aliases.
- **Résumé PDF** (react-pdf) lives in **`apps/frontend/lib/cv-pdf/**`** (served via **`/api/cv`**) — not in Storybook; it uses `StyleSheet`, not web CSS. It imports data/types from **`@portfolio/resume-content`**.

## Running Storybook

Use **Node.js 22.12+** (see `package.json` `engines` and `.nvmrc`) so Storybook 10 and Vitest match CI. Storybook’s CLI enforces **20.19+ or 22.12+**.

From **`packages/storybook`** (after `yarn install` in that directory):

```bash
cd packages/storybook && yarn storybook
```

Static build (also runs automatically before **`next build`** / Vercel production build when wired in the frontend toolchain):

```bash
cd packages/storybook && yarn build-storybook
```

Output is written to **`apps/frontend/public/storybook/`** with Vite **`base: /storybook/`** so the bundle is served by Next at **`/storybook`** (see **`beforeFiles` rewrites** in `apps/frontend/next.config.ts`). After `yarn dev`, run **`yarn build-storybook`** once if you want that URL locally (the folder is gitignored).

### Docker (preferred)

The **`Dockerfile`** uses **`public.ecr.aws/docker/library/node:22-bookworm-slim`**. The **`development`** stage builds **`FROM deps`** so Playwright system libraries are present for **`yarn test:storybook`**.

The **`frontend`** service exposes **3000** (Next.js) and **6006** (Storybook). Run Storybook from the container (working directory is **`apps/frontend`**):

```bash
docker compose up --build frontend
docker compose run --rm --service-ports frontend sh -lc "cd ../../packages/storybook && yarn install --frozen-lockfile && yarn storybook"
```

Open [http://localhost:6006](http://localhost:6006). Checks that mirror CI:

```bash
docker compose run --rm frontend sh -lc "yarn --cwd ../../packages/storybook install --frozen-lockfile && yarn --cwd ../../packages/storybook lint"
docker compose run --rm frontend yarn --cwd ../../packages/storybook typecheck
docker compose run --rm frontend yarn --cwd ../../packages/storybook test:storybook
docker compose run --rm frontend yarn --cwd ../../packages/storybook build-storybook
docker compose run --rm frontend yarn lint
docker compose run --rm frontend yarn typecheck
docker compose run --rm frontend yarn test:unit
docker compose run --rm frontend yarn build
```

## Stories and composition

- **CSF3 only**: `satisfies Meta<typeof Component>`, **`tags: ['autodocs']`** on every `meta`, and **`Default`** plus semantic variants — see **`packages/storybook/src/fixtures/cv-story-args.ts`** for **`narrowMobileStory`**.
- Co-locate **`*.stories.tsx`** next to the component under **`packages/storybook/src/`**.
- **Interaction tests (`play`)** live in a sibling **`*.stories.test.ts`** file (same basename prefix as the CSF file). Each named export is a **`StoryPlayFn`** (see **`packages/storybook/src/storybook-play-types.ts`**); **`*.stories.tsx`** imports them and sets **`play: somePlay`**. Every story that renders meaningful UI (sections, hero, primitives, pages) should wire a **`play`** so **`@storybook/addon-vitest`** exercises it. **Unit** tests for the app and résumé package live in **`apps/frontend`** and **`packages/resume-content`** respectively (separate Vitest configs), not in a single root Vitest workspace.
- **Story `title` groups**: **`Foundations/<Category>/<Component>`** for design primitives under **`packages/storybook/src/primitives/`** (Typography, Buttons, Surfaces); **`UI/Sections/<Name>`** for homepage section stories; **`UI/Hero/<Name>`** for the hero; **`Pages/<Route>`** for full-page stories (e.g. **`Pages/Home`**).
- **Primitives** (`Card`, `Chip`, `ActionLink`, `SectionHeading`, `Title`, hero typography) live in **`packages/storybook/src/primitives/`** and are re-exported from **`@portfolio/storybook`** for consumers that need them; feature code inside the package typically imports via **`../primitives`** or **`../../primitives`** (the **`@ui/*`** path maps to **`./src/*`** and does not resolve **`@ui/primitives`** to the folder index).
- **Full-page stories** compose page-level views from Storybook exports such as **`HomePageShell`**, **`PortfolioHero`**, and home sections.

## Testing (Vitest + Storybook)

- **`apps/frontend/vitest.config.ts`**: frontend unit tests (including API route tests where present).
- **`packages/resume-content/vitest.config.ts`**: résumé package unit tests.
- **`packages/storybook/vitest.config.mjs`**: **`@storybook/addon-vitest`** + Playwright Chromium (`yarn test:storybook` in that package).
- Storybook’s **`package.json`** pins compatible **`vite`** / Vitest browser tooling; Storybook CLI requires **Node 20.19+ or 22.12+** for **`yarn build-storybook`**.

## Preview governance

[`packages/storybook/.storybook/preview.tsx`](../../packages/storybook/.storybook/preview.tsx) applies Geist fonts, globals, viewports, layout decorators (**`Foundations/*`** padded full width; **`UI/Sections/*`** max-width column), and **`a11y.test: 'error'`**.

## Framework

**`@storybook/nextjs-vite`** with **`@storybook/addon-docs`**, **`@storybook/addon-a11y`**, and **`@storybook/addon-vitest`**. Static assets for stories come from **`apps/frontend/public/cv-fonts`** (see **`packages/storybook/.storybook/main.ts`** `staticDirs`).

## PR checklist (Storybook / UI)

1. New or changed UI uses **fixtures** for story args where data repeats.
2. In **`packages/storybook`**: **`yarn lint`**, **`yarn typecheck`**, **`yarn test:storybook`**, **`yarn build-storybook`**. If the Next app or shared data changed, run the matching scripts in **`apps/frontend`** and **`packages/resume-content`** too (prefer Docker so Node and Playwright match CI).
