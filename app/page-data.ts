import type { ExperienceEntry } from "@/lib/cv-data";

export function buildPhoneHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function buildWorkEntryKey(entry: ExperienceEntry): string {
  return `${entry.company}-${entry.role}`;
}
