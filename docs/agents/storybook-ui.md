# Storybook — shared web UI

## Where UI lives

- **DOM components** (anything that renders browser JSX) belong in **`storybook/ui/`** and are imported from the app as `@/storybook/ui/...`.
- **Global web CSS** (Tailwind entry, design tokens, `body` rules) lives in **`storybook/ui/globals.css`**. Root layout surface classes use **`storybook/ui/layout.module.css`**, imported from **`app/layout.tsx`** alongside the same globals Storybook loads in preview.
- **Page views** stay in **`app/**/*.view.tsx`** (or route files) and compose storybook UI with route-specific data and layout classes.
- **Résumé PDF** (react-pdf) lives in **`lib/cv-pdf/**`** — not in Storybook; it uses `StyleSheet`, not web CSS.

## Running Storybook

From the repo root (same Node as CI):

```bash
yarn storybook
```

Static build (CI uses this):

```bash
yarn build-storybook
```

Output defaults to **`storybook-static/`** (ignored by ESLint and git if listed in `.gitignore`).

## Stories and composition

- Co-locate **`*.stories.tsx`** next to the component under `storybook/ui/`.
- Co-locate **`*.module.css`** next to the component (for example `storybook/ui/home/summary-section.module.css`). Share small patterns via a sibling module (for example `section-heading.module.css`) instead of a single large stylesheet — avoid importing `app/**/*.module.css` from the library layer so new routes can reuse the same tokens without coupling to a single page file.
- **Page-level stories** may import `app/*.view.tsx` to document full-screen compositions; keep those stories thin (no business logic in the story file beyond args).

## ESLint boundary

Rule **`portfolio/storybook-ui-boundary`** (see `tools/eslint-plugin-portfolio/`) fails if a **`.tsx`** file contains JSX but is **not** under:

- `storybook/ui/`
- `app/`
- `lib/cv-pdf/`
- `.storybook/`

Plain **`.ts`** modules stay unrestricted for logic, tests, and mappers.

## Framework

This project uses **`@storybook/nextjs-vite`** with **`@storybook/addon-docs`** and **`@storybook/addon-a11y`**. Preview loads **`storybook/ui/globals.css`** and applies the same Geist font CSS variables as the Next.js root layout.
