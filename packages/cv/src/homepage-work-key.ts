import type { ExperienceEntry } from "./types";

/** Stable unique key for homepage work cards (disambiguates repeated company/role). */
export function buildHomepageWorkEntryKey(entry: ExperienceEntry): string {
  return `${entry.company}-${entry.role}-${entry.period}`;
}
