# Repository Map

Use this file when you need to locate common code or configuration.

| Path | Purpose |
|------|---------|
| `package.json` | Scripts, dependencies, and Node/Yarn metadata |
| `app/` or `src/app/` | App Router routes, layouts, and server/client boundaries |
| `storybook/ui/` | Shared DOM components, co-located CSS modules, and `*.stories.tsx` |
| `.storybook/` | Storybook config (`main.ts`, `preview.tsx`) |
| `lib/cv-pdf/` | CV PDF (react-pdf document, sections, pdf.js helpers, Vitest) |
| `**/*.view.tsx` (or route `page.tsx` / `layout.tsx`) | View layer: JSX structure and composition |
| `**/*.ts` (non-route/component files) | Logic layer: pure helpers, selectors, mappers, formatters |
| `**/*.module.css` and `app/globals.css` | Web style layer |
| `lib/cv-pdf/styles.ts` | PDF style layer (`@react-pdf/renderer` `StyleSheet`) |
| `lib/cv-pdf/cv-pdf-integrity.test.ts` | CV PDF: required text fragments + sidebar URL geometry (pdf.js) |
| `lib/cv-pdf/cv-pdf-pdfjs.ts` | Bundled pdf.js + `pdf-parse` implementation (text + positioned runs) |
| `lib/cv-pdf/cv-pdf-vitest-helpers.ts` | Shared `renderToBuffer(CvPdfDocument)` for Vitest |
| `lib/cv-pdf/pdf-text-normalize.ts` | Generic `normalizePdfExtractLines` + CV `normalizeCvPdfExtractedText` |
| `tools/eslint-plugin-portfolio/` | Local ESLint plugin (`portfolio/storybook-ui-boundary`) |
| `lib/cv/pdf-text-expectations.ts` | Substrings the integrity test expects from `cvData` |
| `lib/cv/pdf-text-postprocess.ts` | CV-only tweaks after generic PDF text normalization |
| `next.config.*` | Next.js configuration |
| `Dockerfile` | Container image for local or deploy-related workflows |
| `docker-compose.yml` | Local Docker Compose stack (`web`, `cv-tools` profile) |
| `.github/workflows/` | CI pipelines for lint, test, typecheck, and build |
| `.cursor/rules/` | Repository and file-scoped Cursor rules |
| `.cursor/skills/` | Task-specific workflows and validation checklists |
| `.cursor/mcp.json` | Project-local MCP server configuration |
| `vercel.json` | Optional Vercel overrides if the project uses them |
| `.env.example` | Optional environment variable template |

If a path is missing, prefer the active rules and skills for guidance before scaffolding new structure.
