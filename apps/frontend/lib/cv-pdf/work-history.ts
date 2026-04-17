import {
  buildWorkEntryStableKey,
  type ResumeData,
  type ResumeExperienceEntry,
} from "@portfolio/resume-content";

/**
 * Maximum number of experience entries that fit on the first CV page alongside
 * the summary/contact band. Overflow entries render on page 2.
 */
export const FIRST_PAGE_ENTRY_COUNT = 3;

/**
 * The first N entries on page 1 get their full achievements bullet list.
 * Any remaining first-page entry keeps only its header; its achievements spill
 * to the top of page 2 as a bullet list to preserve the reference PDF's layout.
 */
export const FIRST_PAGE_ENTRIES_WITH_ACHIEVEMENTS = 2;

export type FirstPageEntry = {
  entry: ResumeExperienceEntry;
  showAchievements: boolean;
};

export type WorkHistoryLayout = {
  firstPageEntries: readonly FirstPageEntry[];
  firstOverflowAchievements: readonly string[];
  remainingEntries: readonly ResumeExperienceEntry[];
  summaryBullets: readonly string[];
};

export function buildWorkHistoryLayout(resumeData: ResumeData): WorkHistoryLayout {
  const firstPageEntries = resumeData.workHistory
    .slice(0, FIRST_PAGE_ENTRY_COUNT)
    .map((entry, index) => ({
      entry,
      showAchievements: index < FIRST_PAGE_ENTRIES_WITH_ACHIEVEMENTS,
    }));
  const finalFirstPageEntry = firstPageEntries[firstPageEntries.length - 1];

  return {
    firstPageEntries,
    firstOverflowAchievements: finalFirstPageEntry?.showAchievements
      ? []
      : [...finalFirstPageEntry.entry.achievements],
    remainingEntries: resumeData.workHistory.slice(FIRST_PAGE_ENTRY_COUNT),
    summaryBullets: [
      ...resumeData.summaryHighlights,
      `Tech stack: ${resumeData.techStack.join(", ")}.`,
    ],
  };
}

export function buildPdfWorkEntryKey(entry: ResumeExperienceEntry): string {
  return buildWorkEntryStableKey(entry);
}
