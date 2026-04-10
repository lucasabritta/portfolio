# Repository Map

Use this file when you need to locate common code or configuration.

| Path | Purpose |
|------|---------|
| `package.json` | Scripts, dependencies, and Node/Yarn metadata |
| `app/` or `src/app/` | App Router routes, layouts, and server/client boundaries |
| `components/` | Reusable UI components when present |
| `**/*.view.tsx` (or route `page.tsx` / `layout.tsx`) | View layer: JSX structure and composition |
| `**/*.ts` (non-route/component files) | Logic layer: pure helpers, selectors, mappers, formatters |
| `**/*.module.css` and `app/globals.css` | Web style layer |
| `components/cv-pdf/styles.ts` | PDF style layer (`@react-pdf/renderer` `StyleSheet`) |
| `next.config.*` | Next.js configuration |
| `Dockerfile` | Container image for local or deploy-related workflows |
| `compose*.yml` / `docker-compose*.yml` | Local Docker orchestration |
| `.github/workflows/` | CI pipelines for lint, test, typecheck, and build |
| `.cursor/rules/` | Repository and file-scoped Cursor rules |
| `.cursor/skills/` | Task-specific workflows and validation checklists |
| `.cursor/mcp.json` | Project-local MCP server configuration |
| `vercel.json` | Optional Vercel overrides if the project uses them |
| `.env.example` | Optional environment variable template |

If a path is missing, prefer the active rules and skills for guidance before scaffolding new structure.
