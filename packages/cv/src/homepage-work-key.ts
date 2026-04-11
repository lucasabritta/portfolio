import type { ExperienceEntry } from "./types";

export function buildHomepageWorkEntryKey(entry: ExperienceEntry): string {
  return `${entry.company}-${entry.role}`;
}
