# Repository Map

Use this file when you need to locate common code or configuration.

## Monorepo vs monolith

This repository is a **multi-package TypeScript repo**: several **`apps/*`** and **`packages/*`** directories, each with its own **`package.json`** and **`yarn.lock`**, linked by **`file:`** dependencies where needed. The **Next app**, **Storybook UI library**, **résumé data**, and **e2e specs** are **separate packages** — not a monolith where layers freely entangle.

- **`apps/frontend/`**, **`apps/e2e/`**, **`packages/storybook/`**, and **`packages/resume-content/`** are distinct concerns: preserve **correct import direction** (app → `@portfolio/storybook` / `@portfolio/resume-content`; storybook → **no** `@portfolio/resume-content`), **ESLint boundaries**, and **CI splits** (per-workflow jobs under `.github/workflows/`).
- Avoid cross-layer shortcuts (web CSS or Storybook-only UI inside PDF code; **no** imports from `apps/frontend/app/**` inside `packages/storybook`).

| Path | Purpose |
|------|---------|
| Root `package.json` | Minimal stub for Vercel when the project root is the git root (see [`docs/agents/cursor-mcp.md`](cursor-mcp.md)); **not** the primary workspace manifest |
| `apps/frontend/` | Next.js App Router app (`app/`, `public/`, `next.config.ts`) — **`@portfolio/frontend`** |
| `apps/frontend/lib/cv-pdf/` | CV PDF react-pdf document, sections, `StyleSheet` styles, fonts; used by `app/api/cv/` |
| `apps/e2e/` | Playwright end-to-end spec directory |
| `packages/storybook/` | Shared DOM UI, co-located CSS, Storybook config (`.storybook/`), Vitest Storybook project — **`@portfolio/storybook`** |
| `@portfolio/storybook/projects-page-view` | **`ProjectsPageView`** is a client component; the Next app must import this **subpath** (not the package root barrel) so the App Router keeps the `"use client"` boundary for flagship image `onError`. Types stay on **`@portfolio/storybook`** (`ProjectsPageViewProps`). |
| `packages/storybook/src/` | Components, `*.stories.tsx`, `globals.css`, `layout.module.css` |
| `packages/storybook/src/fixtures/` | Typed Storybook args helpers (synthetic presentation data, viewport globals) |
| `packages/storybook/src/primitives/` | Shared presentation primitives; re-exported from **`@portfolio/storybook`** |
| `packages/storybook/src/**/*.stories.test.ts` | Storybook interaction tests (`play`); typed as **`StoryPlayFn`** in **`storybook-play-types.ts`** |
| `packages/resume-content/` | Résumé types, `resumeData`, `buildPhoneHref`, `buildHomepageWorkEntryKey` — **`@portfolio/resume-content`** |
| `packages/storybook/.storybook/` | Storybook `main.ts`, `preview.tsx` |
| `apps/frontend/vitest.config.ts` | Frontend unit tests (Vitest, jsdom / node as configured) |
| `packages/storybook/vitest.config.mjs` | Vitest **storybook** project (`@storybook/addon-vitest`, Playwright Chromium) |
| `packages/resume-content/vitest.config.ts` | Resume-content unit tests |
| `apps/frontend/postcss.config.cjs` | PostCSS (Tailwind v4) for Next |
| `**/*.tsx` in `apps/frontend/app/` | Next views and route modules |
| `apps/frontend/next.config.*` | Next.js configuration (`transpilePackages`, `outputFileTracingRoot` for monorepo) |
| `apps/frontend/Dockerfile` | Multi-stage image (`development`, `builder`, `runner`) for local dev and production-like runs |
| `docker-compose.yml` | Root Compose stack (`frontend`, `frontend-prod` profile, `cv-tools` profile) |
| `.github/workflows/` | CI pipelines (frontend, resume-content, Storybook, e2e, production Docker build) |
| `vercel.json` (repo root) | Fallback install/build when Vercel **Root Directory** is the repo root (see `docs/agents/cursor-mcp.md`) |
| `apps/frontend/vercel.json` | Optional Vercel overrides when **Root Directory** is `apps/frontend` |
| `.cursor/rules/`, `.cursor/skills/` | Cursor rules and skills |
| User `~/.cursor/mcp.json` | MCP servers (e.g. Vercel OAuth); keep out of the repo — see [`docs/agents/cursor-mcp.md`](cursor-mcp.md) |

If a path is missing, prefer the active rules and skills for guidance before scaffolding new structure.
