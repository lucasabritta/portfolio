# Repository Map

Use this file when you need to locate common code or configuration.

## Monorepo vs monolith

This repository is a **Yarn workspaces monorepo**: a root `package.json` with **`apps/*`** and **`packages/*`** so the **Next app**, **Storybook UI library**, **résumé data**, and **PDF backend** stay **separate packages**—not a monolith where layers freely entangle.

- **`apps/frontend/`**, **`packages/storybook/`**, **`packages/resume-content/`**, and **`apps/backend/src/cv-pdf/`** are distinct concerns: preserve **correct import direction** (app → `@portfolio/storybook` / `@portfolio/resume-content` / `@portfolio/backend`; storybook → **no** `@portfolio/resume-content`; backend → `@portfolio/resume-content`), **ESLint boundaries**, and **CI splits** (`yarn test:unit:*` vs `yarn test:storybook`).
- Avoid cross-layer shortcuts (web CSS or Storybook-only UI inside PDF code; **no** imports from `apps/frontend/app/**` inside `packages/storybook`).

| Path | Purpose |
|------|---------|
| Root `package.json` | Workspaces, aggregate scripts, shared `devDependencies` (ESLint, Vitest, TypeScript, Playwright), `resolutions` |
| `apps/frontend/` | Next.js App Router app (`app/`, `public/`, `next.config.ts`) — package **`@portfolio/frontend`** |
| `packages/storybook/` | Shared DOM UI, co-located CSS, Storybook config (`.storybook/`), Vitest Storybook project — package **`@portfolio/storybook`** |
| `packages/storybook/src/` | Components, `*.stories.tsx`, `globals.css`, `layout.module.css` |
| `packages/storybook/src/fixtures/` | Typed Storybook args helpers (synthetic presentation data, viewport globals) |
| `packages/storybook/src/primitives/` | Shared presentation primitives (`Card`, `Chip`, `ActionLink`, typography); **`Foundations/*`** Storybook titles; re-exported from **`@portfolio/storybook`** |
| `packages/storybook/src/**/*.stories.test.ts` | Storybook interaction tests (`play`); typed as **`StoryPlayFn`** in **`storybook-play-types.ts`** |
| `packages/resume-content/` | Résumé types, `resumeData`, `buildPhoneHref`, `buildHomepageWorkEntryKey` — package **`@portfolio/resume-content`** |
| `apps/backend/` | CV PDF pipeline (react-pdf, pdf.js helpers, Vitest) — workspace **`@portfolio/backend`**; public API in `src/index.ts` |
| `packages/storybook/.storybook/` | Storybook `main.ts`, `preview.tsx` |
| Root `vitest.config.mjs` | Vitest **unit** projects: `apps/frontend`, `apps/backend`, `packages/resume-content` |
| `packages/storybook/vitest.config.mjs` | Vitest **storybook** project (`@storybook/addon-vitest`, Playwright Chromium) |
| `apps/frontend/postcss.config.cjs` | PostCSS (Tailwind v4) for Next |
| `apps/backend/src/cv-pdf/` | CV PDF (react-pdf document, sections, pdf.js helpers, Vitest) |
| `**/*.tsx` in `apps/frontend/app/` | Next views and route modules |
| `apps/frontend/next.config.*` | Next.js configuration (`transpilePackages`, `outputFileTracingRoot` for monorepo) |
| `Dockerfile` | Container image for local or deploy-related workflows |
| `docker-compose.yml` | Local Docker Compose stack (`frontend`, `cv-tools` profile) |
| `.github/workflows/` | CI pipelines for lint, test, typecheck, and build |
| `vercel.json` | Vercel build/install commands for the workspace |
| `.cursor/rules/`, `.cursor/skills/` | Cursor rules and skills |
| User `~/.cursor/mcp.json` | MCP servers (e.g. Vercel OAuth); keep out of the repo — see [`docs/agents/cursor-mcp.md`](cursor-mcp.md) |

If a path is missing, prefer the active rules and skills for guidance before scaffolding new structure.
