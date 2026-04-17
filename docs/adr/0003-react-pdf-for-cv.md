# ADR 0003 — CV is rendered via `react-pdf` inside `apps/frontend`

- **Status**: Accepted
- **Date**: 2026-04-17 (recorded retroactively; decision predates this ADR)

## Context

The site must serve a downloadable CV that stays in sync with the data shown on `/` (and other surfaces). Options considered:

1. Pre-compile a PDF from a LaTeX or docx source and serve it as a static asset.
2. Generate at request time from HTML via a headless browser (Puppeteer, Playwright print).
3. Generate at request time with `@react-pdf/renderer` from the same typed `resumeData`.

## Decision

Option **3**: the CV is built at request time with `@react-pdf/renderer` from `@portfolio/resume-content`.

- Source of truth: `packages/resume-content/src/resumeData`.
- Layout: `apps/frontend/lib/cv-pdf/**` (react-pdf `StyleSheet`, **not** web CSS).
- Delivery: `GET /api/cv` streams a PDF response with a deterministic filename (`<name>_CV.pdf`) per `packages/resume-content/src/cv-filename.ts`.
- Invariants (stable keys, pagination, URL wrapping) are covered by unit tests in `apps/frontend/lib/cv-pdf/**.test.ts` and `packages/resume-content/src/resume-invariants.test.ts` (see P2).

## Alternatives considered

- **Static PDF**: rejected — drifts from on-site content, needs a separate authoring tool.
- **Headless browser**: rejected — heavy runtime on Vercel, fragile fonts, non-deterministic layout, slower cold start.

## Consequences

- **Pros**: single data source, deterministic output, testable as plain units, cheap to run on Vercel, no binary assets in git.
- **Cons**: react-pdf has a separate styling model from web CSS (`StyleSheet` only). Rule [`nextjs-react.mdc`](../../.cursor/rules/nextjs-react.mdc) calls this out, and `apps/frontend/lib/cv-pdf/**` is kept isolated from web styles. Fonts and line-height tuning require care; covered by the CV Docker dump tooling (see [`docs/agents/cv-pdf-docker.md`](../agents/cv-pdf-docker.md)).
