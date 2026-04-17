/**
 * Builds the CV PDF download filename from a person's display name.
 *
 * The algorithm is the single source of truth for the filename served by the
 * `/api/cv` route and asserted by end-to-end tests. Keeping it inside
 * `@portfolio/resume-content` lets both the Next.js app and the e2e suite
 * derive the expected name from the same data + logic instead of hardcoding
 * a literal that silently breaks when `resumeData.name` changes.
 */
export function buildCvFilename(name: string): string {
  const slug = name.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return `${slug || "resume"}_CV.pdf`;
}

/**
 * Canonical pattern that any filename produced by {@link buildCvFilename}
 * must match. The Playwright e2e spec at `apps/e2e/cv-download.spec.ts`
 * cannot import TypeScript from `node_modules` (Playwright's Node loader
 * refuses to strip types there), so it mirrors this regex as a literal
 * with a pointer back to this file. A Vitest unit test in this package
 * asserts that `buildCvFilename` output always matches the pattern, and a
 * cross-package contract test at
 * `apps/frontend/lib/cv-pdf/cv-pdf.response.test.ts` imports this constant
 * to pin the frontend side to the canonical regex.
 */
export const CV_FILENAME_PATTERN = /^[A-Za-z0-9_]+_CV\.pdf$/;
