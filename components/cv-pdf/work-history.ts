import type { CvData, ExperienceEntry } from "@/lib/cv-data";

type WorkHistoryPartitions = {
  firstEntry: ExperienceEntry | undefined;
  secondEntry: ExperienceEntry | undefined;
  thirdEntry: ExperienceEntry | undefined;
  remainingEntries: readonly ExperienceEntry[];
  summaryBullets: readonly string[];
};

export function buildWorkHistoryPartitions(cvData: CvData): WorkHistoryPartitions {
  return {
    firstEntry: cvData.workHistory[0],
    secondEntry: cvData.workHistory[1],
    thirdEntry: cvData.workHistory[2],
    remainingEntries: cvData.workHistory.slice(3),
    summaryBullets: [...cvData.summaryHighlights],
  };
}

export function buildWorkEntryKey(entry: ExperienceEntry): string {
  return `${entry.company}-${entry.role}-${entry.period}`;
}
