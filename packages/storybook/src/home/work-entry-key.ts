import type { PresentationWorkEntry } from "./presentation-types";

/**
 * Stable key for work cards (disambiguates repeated company/role).
 *
 * Mirrors the canonical `buildWorkEntryStableKey` from `@portfolio/resume-content`.
 * This package cannot import that module (see `eslint.config.mjs` boundary), so
 * the composition `${company}-${role}-${period}` is duplicated here and covered
 * by a cross-package contract test at
 * `apps/frontend/lib/cv-pdf/work-history.test.ts`.
 */
export function presentationWorkEntryKey(entry: PresentationWorkEntry): string {
  return `${entry.company}-${entry.role}-${entry.period}`;
}
