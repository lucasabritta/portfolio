# Repository Map

Use this file when you need to locate common code or configuration.

## Monorepo vs monolith

This repository is a **Yarn workspaces monorepo**: a root `package.json` with **`apps/*`** and **`packages/*`** so the **Next app**, **web UI library**, and **CV data** stay **separate packages**—not a monolith where layers freely entangle.

- **`apps/web/`**, **`packages/web-ui/`**, **`packages/cv/`**, and **`apps/web/lib/cv-pdf/`** are distinct concerns: preserve **correct import direction** (app → `@portfolio/web-ui` / `@portfolio/cv`; web-ui → `@portfolio/cv` only), **ESLint boundaries**, and **CI splits** (`yarn test:unit` vs `yarn test:storybook`).
- Avoid cross-layer shortcuts (web CSS or Storybook-only UI inside PDF code; **no** imports from `apps/web/app/**` inside `packages/web-ui`).

| Path | Purpose |
|------|---------|
| Root `package.json` | Workspaces, aggregate scripts, shared `devDependencies` (ESLint, Vitest, TypeScript, Playwright), `resolutions` |
| `apps/web/` | Next.js App Router app (`app/`, `public/`, `next.config.ts`, `lib/cv-pdf/`) — package **`@portfolio/web`** |
| `packages/web-ui/` | Shared DOM UI, co-located CSS, Storybook config (`.storybook/`), Vitest Storybook project — package **`@portfolio/web-ui`** |
| `packages/web-ui/src/` | Components, `*.stories.tsx`, `globals.css`, `layout.module.css` |
| `packages/web-ui/src/fixtures/` | Typed Storybook args helpers (CV-derived defaults, viewport globals) |
| `packages/web-ui/src/primitives/` | Shared presentation primitives (`Card`, `Chip`, `ActionLink`, typography); **`Foundations/*`** Storybook titles; re-exported from **`@portfolio/web-ui`** |
| `packages/web-ui/src/**/*.stories.test.ts` | Storybook interaction tests (`play`); typed as **`StoryPlayFn`** in **`storybook-play-types.ts`** |
| `packages/cv/` | CV types, `cvData`, PDF text helpers, `buildPhoneHref`, `buildHomepageWorkEntryKey` — package **`@portfolio/cv`** |
| `packages/web-ui/.storybook/` | Storybook `main.ts`, `preview.tsx` |
| Root `vitest.config.mjs` | Vitest **unit** project: `apps/web/**` and `packages/cv/**` tests |
| `packages/web-ui/vitest.config.mjs` | Vitest **storybook** project (`@storybook/addon-vitest`, Playwright Chromium) |
| `apps/web/postcss.config.cjs` | PostCSS (Tailwind v4) for Next |
| `apps/web/lib/cv-pdf/` | CV PDF (react-pdf document, sections, pdf.js helpers, Vitest) |
| `**/*.tsx` in `apps/web/app/` | Next views and route modules |
| `apps/web/next.config.*` | Next.js configuration (`transpilePackages`, `outputFileTracingRoot` for monorepo) |
| `Dockerfile` | Container image for local or deploy-related workflows |
| `docker-compose.yml` | Local Docker Compose stack (`web`, `cv-tools` profile) |
| `.github/workflows/` | CI pipelines for lint, test, typecheck, and build |
| `vercel.json` | Vercel build/install commands for the workspace |
| `.cursor/rules/`, `.cursor/skills/` | Cursor rules and skills |
| User `~/.cursor/mcp.json` | MCP servers (e.g. Vercel OAuth); keep out of the repo — see [`docs/agents/cursor-mcp.md`](cursor-mcp.md) |

If a path is missing, prefer the active rules and skills for guidance before scaffolding new structure.
