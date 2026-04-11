import type { CvData, ExperienceEntry } from "@portfolio/cv";

type FirstPageEntry = {
  entry: ExperienceEntry;
  showAchievements: boolean;
};

type WorkHistoryLayout = {
  firstPageEntries: readonly FirstPageEntry[];
  firstOverflowAchievements: readonly string[];
  remainingEntries: readonly ExperienceEntry[];
  summaryBullets: readonly string[];
};

export function buildWorkHistoryLayout(cvData: CvData): WorkHistoryLayout {
  const firstPageEntries = cvData.workHistory.slice(0, 3).map((entry, index) => ({
    entry,
    showAchievements: index < 2,
  }));
  const finalFirstPageEntry = firstPageEntries[firstPageEntries.length - 1];

  return {
    firstPageEntries,
    firstOverflowAchievements: finalFirstPageEntry?.showAchievements
      ? []
      : [...finalFirstPageEntry.entry.achievements],
    remainingEntries: cvData.workHistory.slice(3),
    summaryBullets: [
      ...cvData.summaryHighlights,
      `Tech stack: ${cvData.techStack.join(", ")}.`,
    ],
  };
}

export function buildPdfWorkEntryKey(entry: ExperienceEntry): string {
  return `${entry.company}-${entry.role}-${entry.period}`;
}
