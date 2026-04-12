import type { PresentationWorkEntry } from "./presentation-types";

/** Stable key for work cards (disambiguates repeated company/role). */
export function presentationWorkEntryKey(entry: PresentationWorkEntry): string {
  return `${entry.company}-${entry.role}-${entry.period}`;
}
