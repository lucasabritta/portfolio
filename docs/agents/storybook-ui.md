# Storybook — shared web UI (`@portfolio/storybook`)

The **`@portfolio/storybook`** package is a **separate workspace** from **`@portfolio/frontend`** (Next) and from **`@portfolio/resume-content`** (résumé data). Shared DOM UI must stay **library-owned** and **consumable by the app** via the package name — **no** imports from `apps/frontend/app/**` inside the UI package, and **no** `storybook/**` paths in the app. Storybook stays **presentation-only**: it must **not** import **`@portfolio/resume-content`** (ESLint enforces this); the app composes **`resumeData`** into **`HomePageView`** props and stories use **fixtures**.

## Where UI lives

- **DOM components** (anything that renders browser JSX) belong in **`packages/storybook/src/`**. The Next app imports **`HomePageView`**, **`PortfolioHero`**, etc. from **`@portfolio/storybook`** (see `packages/storybook/src/index.ts`).
- **Global web CSS** lives in **`packages/storybook/src/globals.css`**. Root layout classes use **`packages/storybook/src/layout.module.css`**, imported from **`apps/frontend/app/layout.tsx`** as **`@portfolio/storybook/globals.css`** and **`@portfolio/storybook/layout.module.css`** (package `exports`).
- **Story fixtures** live in **`packages/storybook/src/fixtures/`**. Stories use **`@ui/...`** (Vite/TS path alias); **`HomePageView`** uses **relative** imports so Next/Turbopack does not need a duplicate `@ui` alias.
- **Résumé PDF** (react-pdf) lives in **`apps/backend/src/cv-pdf/**`** — not in Storybook; it uses `StyleSheet`, not web CSS. It imports data/types from **`@portfolio/resume-content`**.

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

Output is written to **`apps/frontend/public/storybook/`** with Vite **`base: /storybook/`** so the bundle is served by Next at **`/storybook`** (see **`beforeFiles` rewrites** in `apps/frontend/next.config.ts`). After `yarn dev`, run **`yarn build-storybook`** once if you want that URL locally (the folder is gitignored).

### Docker (preferred)

The **`Dockerfile`** uses **`public.ecr.aws/docker/library/node:22-bookworm-slim`**. The **`development`** stage builds **`FROM deps`** so Playwright system libraries are present for **`yarn test:storybook`**.

The **`frontend`** service exposes **3000** (Next.js) and **6006** (Storybook). Run Storybook from the container with the root script (delegates to **`@portfolio/storybook`**):

```bash
docker compose up --build frontend
docker compose run --rm --service-ports frontend yarn storybook
```

Open [http://localhost:6006](http://localhost:6006). Checks that mirror CI:

```bash
docker compose run --rm frontend yarn lint
docker compose run --rm frontend yarn typecheck
docker compose run --rm frontend yarn test:unit
docker compose run --rm frontend yarn test:storybook
docker compose run --rm frontend yarn build
docker compose run --rm frontend yarn build-storybook
```

## Stories and composition

- **CSF3 only**: `satisfies Meta<typeof Component>`, **`tags: ['autodocs']`** on every `meta`, and **`Default`** plus semantic variants — see **`packages/storybook/src/fixtures/cv-story-args.ts`** for **`narrowMobileStory`**.
- Co-locate **`*.stories.tsx`** next to the component under **`packages/storybook/src/`**.
- **Interaction tests (`play`)** live in a sibling **`*.stories.test.ts`** file (same basename prefix as the CSF file). Each named export is a **`StoryPlayFn`** (see **`packages/storybook/src/storybook-play-types.ts`**); **`*.stories.tsx`** imports them and sets **`play: somePlay`**. Every story that renders meaningful UI (sections, hero, primitives, pages) should wire a **`play`** so **`@storybook/addon-vitest`** exercises it. (These are not root **`yarn test`** unit files; root Vitest **unit** projects cover **`apps/frontend`**, **`apps/backend`**, and **`packages/resume-content`**.)
- **Story `title` groups**: **`Foundations/<Category>/<Component>`** for design primitives under **`packages/storybook/src/primitives/`** (Typography, Buttons, Surfaces); **`UI/Sections/<Name>`** for homepage section stories; **`UI/Hero/<Name>`** for the hero; **`Pages/<Route>`** for full-page stories (e.g. **`Pages/Home`**).
- **Primitives** (`Card`, `Chip`, `ActionLink`, `SectionHeading`, `Title`, hero typography) live in **`packages/storybook/src/primitives/`** and are re-exported from **`@portfolio/storybook`** for consumers that need them; feature code inside the package typically imports via **`../primitives`** or **`../../primitives`** (the **`@ui/*`** path maps to **`./src/*`** and does not resolve **`@ui/primitives`** to the folder index).
- **Full-page stories** import **`HomePageView`** from the same package (`@ui/home/home-page-view` in stories; public API is **`@portfolio/storybook`**).

## Testing (Vitest + Storybook)

- Root **`vitest.config.mjs`**: **unit** projects **`unit-frontend`**, **`unit-backend`**, **`unit-resume-content`**.
- **`packages/storybook/vitest.config.mjs`**: **`@storybook/addon-vitest`** + Playwright Chromium.
- **`yarn test:unit`** / **`yarn test`**: all unit projects from repo root (or use **`yarn test:unit:frontend`**, **`yarn test:unit:backend`**, **`yarn test:unit:resume-content`**).
- **`yarn test:storybook`**: **`yarn workspace @portfolio/storybook test:storybook`**.
- Root **`package.json` `resolutions`** pins **`vite@^5.4.x`** so Vitest’s browser mode works on Node versions below those required by Vite 6’s `crypto.hash`; Storybook CLI still requires **Node 20.19+ or 22.12+** for **`yarn build-storybook`**.

## Preview governance

[`packages/storybook/.storybook/preview.tsx`](../../packages/storybook/.storybook/preview.tsx) applies Geist fonts, globals, viewports, layout decorators (**`Foundations/*`** padded full width; **`UI/Sections/*`** max-width column), and **`a11y.test: 'error'`**.

## Framework

**`@storybook/nextjs-vite`** with **`@storybook/addon-docs`**, **`@storybook/addon-a11y`**, and **`@storybook/addon-vitest`**. Static assets for stories come from **`apps/frontend/public/cv-fonts`** (see **`packages/storybook/.storybook/main.ts`** `staticDirs`).

## PR checklist (Storybook / UI)

1. New or changed UI uses **fixtures** for story args where data repeats.
2. **`yarn lint`**, **`yarn typecheck`**, **`yarn test:unit`**, **`yarn test:storybook`**, and **`yarn build-storybook`** pass (prefer Docker so Node and Playwright match CI).
