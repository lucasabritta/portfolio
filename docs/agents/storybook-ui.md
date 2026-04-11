# Storybook — shared web UI (`@portfolio/web-ui`)

The **`@portfolio/web-ui`** package is a **separate workspace** from **`@portfolio/web`** (Next) and from **`@portfolio/cv`** (data/types). Shared DOM UI must stay **library-owned** and **consumable by the app** via the package name — **no** imports from `apps/web/app/**` inside the UI package, and **no** `storybook/**` paths in the app.

## Where UI lives

- **DOM components** (anything that renders browser JSX) belong in **`packages/web-ui/src/`**. The Next app imports **`HomePageView`**, **`PortfolioHero`**, etc. from **`@portfolio/web-ui`** (see `packages/web-ui/src/index.ts`).
- **Global web CSS** lives in **`packages/web-ui/src/globals.css`**. Root layout classes use **`packages/web-ui/src/layout.module.css`**, imported from **`apps/web/app/layout.tsx`** as **`@portfolio/web-ui/globals.css`** and **`@portfolio/web-ui/layout.module.css`** (package `exports`).
- **Story fixtures** live in **`packages/web-ui/src/fixtures/`**. Stories use **`@ui/...`** and **`@portfolio/cv`** (Vite/TS path aliases); **`HomePageView`** uses **relative** imports so Next/Turbopack does not need a duplicate `@ui` alias.
- **Résumé PDF** (react-pdf) lives in **`apps/web/lib/cv-pdf/**`** — not in Storybook; it uses `StyleSheet`, not web CSS. It imports CV data/types from **`@portfolio/cv`**.

## Running Storybook

Use **Node.js 22.12+** (see `package.json` `engines` and `.nvmrc`) so Storybook 10 and Vitest match CI. Storybook’s CLI enforces **20.19+ or 22.12+**.

From the repo root:

```bash
yarn storybook
```

Static build (also runs automatically before **`next build`** / Vercel production build):

```bash
yarn build-storybook
```

Output is written to **`apps/web/public/storybook/`** with Vite **`base: /storybook/`** so the bundle is served by Next at **`/storybook`** (see **`beforeFiles` rewrites** in `apps/web/next.config.ts`). After `yarn dev`, run **`yarn build-storybook`** once if you want that URL locally (the folder is gitignored).

### Docker (preferred)

The **`Dockerfile`** uses **`public.ecr.aws/docker/library/node:22-bookworm-slim`**. The **`development`** stage builds **`FROM deps`** so Playwright system libraries are present for **`yarn test:storybook`**.

The **`web`** service exposes **3000** (Next.js) and **6006** (Storybook). Run Storybook from the container with the root script (delegates to **`@portfolio/web-ui`**):

```bash
docker compose up --build web
docker compose run --rm --service-ports web yarn storybook
```

Open [http://localhost:6006](http://localhost:6006). Checks that mirror CI:

```bash
docker compose run --rm web yarn lint
docker compose run --rm web yarn typecheck
docker compose run --rm web yarn test:unit
docker compose run --rm web yarn test:storybook
docker compose run --rm web yarn build
docker compose run --rm web yarn build-storybook
```

## Stories and composition

- **CSF3 only**: `satisfies Meta<typeof Component>`, **`tags: ['autodocs']`** on every `meta`, and **`Default`** plus semantic variants — see **`packages/web-ui/src/fixtures/cv-story-args.ts`** for **`narrowMobileStory`**.
- Co-locate **`*.stories.tsx`** next to the component under **`packages/web-ui/src/`**.
- **Interaction tests (`play`)** live in a sibling **`*.stories.test.ts`** file (same basename prefix as the CSF file). Each named export is a **`StoryPlayFn`** (see **`packages/web-ui/src/storybook-play-types.ts`**); **`*.stories.tsx`** imports them and sets **`play: somePlay`**. Every story that renders meaningful UI (sections, hero, primitives, pages) should wire a **`play`** so **`@storybook/addon-vitest`** exercises it. (These are not root **`yarn test`** unit files; root Vitest only includes **`apps/web`** and **`packages/cv`**.)
- **Story `title` groups**: **`Foundations/<Category>/<Component>`** for design primitives under **`packages/web-ui/src/primitives/`** (Typography, Buttons, Surfaces); **`UI/Sections/<Name>`** for homepage section stories; **`UI/Hero/<Name>`** for the hero; **`Pages/<Route>`** for full-page stories (e.g. **`Pages/Home`**).
- **Primitives** (`Card`, `Chip`, `ActionLink`, `SectionHeading`, `Title`, hero typography) live in **`packages/web-ui/src/primitives/`** and are re-exported from **`@portfolio/web-ui`** for consumers that need them; feature code inside the package typically imports via **`../primitives`** or **`../../primitives`** (the **`@ui/*`** path maps to **`./src/*`** and does not resolve **`@ui/primitives`** to the folder index).
- **Full-page stories** import **`HomePageView`** from the same package (`@ui/home/home-page-view` in stories; public API is **`@portfolio/web-ui`**).

## Testing (Vitest + Storybook)

- Root **`vitest.config.mjs`**: **unit** tests only (`apps/web/**`, `packages/cv/**`).
- **`packages/web-ui/vitest.config.mjs`**: **`@storybook/addon-vitest`** + Playwright Chromium.
- **`yarn test:unit`** / **`yarn test`**: unit project from repo root.
- **`yarn test:storybook`**: **`yarn workspace @portfolio/web-ui test:storybook`**.
- Root **`package.json` `resolutions`** pins **`vite@^5.4.x`** so Vitest’s browser mode works on Node versions below those required by Vite 6’s `crypto.hash`; Storybook CLI still requires **Node 20.19+ or 22.12+** for **`yarn build-storybook`**.

## Preview governance

[`packages/web-ui/.storybook/preview.tsx`](../../packages/web-ui/.storybook/preview.tsx) applies Geist fonts, globals, viewports, layout decorators (**`Foundations/*`** padded full width; **`UI/Sections/*`** max-width column), and **`a11y.test: 'error'`**.

## Framework

**`@storybook/nextjs-vite`** with **`@storybook/addon-docs`**, **`@storybook/addon-a11y`**, and **`@storybook/addon-vitest`**. Static assets for stories come from **`apps/web/public`** (see **`packages/web-ui/.storybook/main.ts`** `staticDirs`).

## PR checklist (Storybook / UI)

1. New or changed UI uses **fixtures** for story args where data repeats.
2. **`yarn lint`**, **`yarn typecheck`**, **`yarn test:unit`**, **`yarn test:storybook`**, and **`yarn build-storybook`** pass (prefer Docker so Node and Playwright match CI).
