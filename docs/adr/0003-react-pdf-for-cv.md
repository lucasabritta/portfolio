# ADR 0003 — CV was rendered via `react-pdf` inside `apps/frontend`

- **Status**: Superseded
- **Date**: 2026-04-17 (recorded retroactively; decision predates this ADR)
- **Superseded by**: 2026-05-07 CV download removal.

## Supersession note

The public CV download was removed from the portfolio. The `/api/cv` route,
`apps/frontend/lib/cv-pdf/**`, PDF dump scripts, and CV filename helpers no
longer exist. The site now presents résumé information through the home page and
machine-readable text endpoints.

## Context

The site previously needed to serve a downloadable CV that stayed in sync with the data shown on `/` (and other surfaces). Options considered:

1. Pre-compile a PDF from a LaTeX or docx source and serve it as a static asset.
2. Generate at request time from HTML via a headless browser (Puppeteer, Playwright print).
3. Generate at request time with `@react-pdf/renderer` from the same typed `resumeData`.

## Decision

Option **3** was chosen: the CV was built at request time with `@react-pdf/renderer` from `@portfolio/resume-content`.

- Source of truth: `packages/resume-content/src/resumeData`.
- Layout: `apps/frontend/lib/cv-pdf/**` (react-pdf `StyleSheet`, **not** web CSS).
- Delivery: `GET /api/cv` streamed a PDF response with a deterministic filename (`<name>_CV.pdf`) per `packages/resume-content/src/cv-filename.ts`.
- Invariants (stable keys, pagination, URL wrapping) were covered by unit tests in `apps/frontend/lib/cv-pdf/**.test.ts` and `packages/resume-content/src/resume-invariants.test.ts`.

## Alternatives considered

- **Static PDF**: rejected — drifts from on-site content, needs a separate authoring tool.
- **Headless browser**: rejected — heavy runtime on Vercel, fragile fonts, non-deterministic layout, slower cold start.

## Consequences

- **Pros**: single data source, deterministic output, testable as plain units, cheap to run on Vercel, no binary assets in git.
- **Cons**: react-pdf had a separate styling model from web CSS (`StyleSheet` only). Fonts and line-height tuning required dedicated dump tooling.
