import type { ExperienceEntry } from "@/lib/cv-data";

export function buildHomepageWorkEntryKey(entry: ExperienceEntry): string {
  return `${entry.company}-${entry.role}`;
}
