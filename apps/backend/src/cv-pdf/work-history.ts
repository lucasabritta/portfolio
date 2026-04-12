import type { ResumeData, ResumeExperienceEntry } from "@portfolio/resume-content";

type FirstPageEntry = {
  entry: ResumeExperienceEntry;
  showAchievements: boolean;
};

type WorkHistoryLayout = {
  firstPageEntries: readonly FirstPageEntry[];
  firstOverflowAchievements: readonly string[];
  remainingEntries: readonly ResumeExperienceEntry[];
  summaryBullets: readonly string[];
};

export function buildWorkHistoryLayout(resumeData: ResumeData): WorkHistoryLayout {
  const firstPageEntries = resumeData.workHistory.slice(0, 3).map((entry, index) => ({
    entry,
    showAchievements: index < 2,
  }));
  const finalFirstPageEntry = firstPageEntries[firstPageEntries.length - 1];

  return {
    firstPageEntries,
    firstOverflowAchievements: finalFirstPageEntry?.showAchievements
      ? []
      : [...finalFirstPageEntry.entry.achievements],
    remainingEntries: resumeData.workHistory.slice(3),
    summaryBullets: [
      ...resumeData.summaryHighlights,
      `Tech stack: ${resumeData.techStack.join(", ")}.`,
    ],
  };
}

export function buildPdfWorkEntryKey(entry: ResumeExperienceEntry): string {
  return `${entry.company}-${entry.role}-${entry.period}`;
}
