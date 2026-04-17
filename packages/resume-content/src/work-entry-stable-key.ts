import type { ResumeExperienceEntry } from "./types";

/**
 * Canonical stable key for a work-history entry.
 *
 * Disambiguates repeated company/role tuples across the résumé (web cards,
 * PDF sections, and Storybook previews). This is the single source of truth
 * for the key algorithm; presentation packages that cannot import this module
 * (e.g. `@portfolio/storybook`) must mirror the same `${company}-${role}-${period}`
 * composition and are covered by a cross-package contract test in
 * `apps/frontend`.
 */
export function buildWorkEntryStableKey(
  entry: Pick<ResumeExperienceEntry, "company" | "role" | "period">,
): string {
  return `${entry.company}-${entry.role}-${entry.period}`;
}
