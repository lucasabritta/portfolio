import { describe, expect, it } from "vitest";

import {
  buildWorkEntryStableKey,
  resumeData,
  type ResumeData,
  type ResumeExperienceEntry,
} from "@portfolio/resume-content";
import { presentationWorkEntryKey } from "@portfolio/storybook";

import {
  FIRST_PAGE_ENTRIES_WITH_ACHIEVEMENTS,
  FIRST_PAGE_ENTRY_COUNT,
  buildPdfWorkEntryKey,
  buildWorkHistoryLayout,
} from "./work-history";

/**
 * Cross-package contract: `@portfolio/storybook` must not import
 * `@portfolio/resume-content` (ESLint-enforced boundary), so it mirrors the
 * work-entry key algorithm. This file lives alongside `work-history.ts` —
 * which owns the PDF-side `buildPdfWorkEntryKey` delegate — and pins the
 * three implementations (canonical, PDF wrapper, Storybook mirror) together
 * for every real résumé entry.
 */
describe("buildPdfWorkEntryKey", () => {
  it("delegates to the canonical buildWorkEntryStableKey", () => {
    for (const entry of resumeData.workHistory) {
      expect(buildPdfWorkEntryKey(entry)).toBe(buildWorkEntryStableKey(entry));
    }
  });
});

describe("work-entry key contract across resume-content and storybook", () => {
  it("produces identical keys for every entry in resumeData.workHistory", () => {
    for (const entry of resumeData.workHistory) {
      const canonical = buildWorkEntryStableKey(entry);
      const mirrored = presentationWorkEntryKey(entry);
      expect(mirrored).toBe(canonical);
    }
  });

  it("produces unique keys across the whole work history", () => {
    const keys = resumeData.workHistory.map((entry) => buildWorkEntryStableKey(entry));
    const unique = new Set(keys);
    expect(unique.size).toBe(keys.length);
  });
});

/**
 * `buildWorkHistoryLayout` drives the first-page pagination of the CV PDF. The
 * reference layout keeps exactly `FIRST_PAGE_ENTRY_COUNT` entries on page 1,
 * shows full achievements for the first `FIRST_PAGE_ENTRIES_WITH_ACHIEVEMENTS`,
 * and spills the remaining achievements onto page 2 so the second page opens
 * with a bullet list — any regression in these invariants reshapes the PDF.
 */
const buildEntry = (
  index: number,
  overrides: Partial<ResumeExperienceEntry> = {},
): ResumeExperienceEntry => ({
  company: `Company ${index}`,
  role: `Role ${index}`,
  location: "Remote",
  period: `20${20 + index}`,
  summary: `Summary ${index}`,
  achievements: [`Ach ${index}.1`, `Ach ${index}.2`],
  ...overrides,
});

const buildResume = (
  workHistory: readonly ResumeExperienceEntry[],
  overrides: Partial<ResumeData> = {},
): ResumeData => ({
  ...resumeData,
  summaryHighlights: ["Highlight A", "Highlight B"],
  techStack: ["TypeScript", "React"],
  workHistory,
  ...overrides,
});

describe("buildWorkHistoryLayout", () => {
  it("derives well-known pagination constants", () => {
    expect(FIRST_PAGE_ENTRY_COUNT).toBe(3);
    expect(FIRST_PAGE_ENTRIES_WITH_ACHIEVEMENTS).toBe(2);
    expect(FIRST_PAGE_ENTRIES_WITH_ACHIEVEMENTS).toBeLessThan(FIRST_PAGE_ENTRY_COUNT);
  });

  it("keeps the first FIRST_PAGE_ENTRY_COUNT entries on page 1 and shows full achievements for the first FIRST_PAGE_ENTRIES_WITH_ACHIEVEMENTS", () => {
    const work = [0, 1, 2, 3, 4].map((i) => buildEntry(i));
    const layout = buildWorkHistoryLayout(buildResume(work));

    expect(layout.firstPageEntries).toHaveLength(FIRST_PAGE_ENTRY_COUNT);
    expect(layout.firstPageEntries.map((e) => e.entry)).toEqual(
      work.slice(0, FIRST_PAGE_ENTRY_COUNT),
    );
    expect(layout.firstPageEntries.map((e) => e.showAchievements)).toEqual([true, true, false]);
  });

  it("spills the last page-1 entry's achievements to page 2 when it is not allowed to show them", () => {
    const work = [0, 1, 2, 3].map((i) => buildEntry(i));
    const layout = buildWorkHistoryLayout(buildResume(work));

    expect(layout.firstOverflowAchievements).toEqual(work[2].achievements);
  });

  it("keeps firstOverflowAchievements empty when the last page-1 entry does show its achievements", () => {
    const work = [0, 1].map((i) => buildEntry(i, { achievements: [`only-${i}`] }));
    const layout = buildWorkHistoryLayout(buildResume(work));

    expect(layout.firstPageEntries).toHaveLength(work.length);
    expect(layout.firstPageEntries[layout.firstPageEntries.length - 1].showAchievements).toBe(true);
    expect(layout.firstOverflowAchievements).toEqual([]);
  });

  it("returns the remainder past page 1 in order", () => {
    const work = [0, 1, 2, 3, 4].map((i) => buildEntry(i));
    const layout = buildWorkHistoryLayout(buildResume(work));

    expect(layout.remainingEntries).toEqual(work.slice(FIRST_PAGE_ENTRY_COUNT));
  });

  it("composes summaryBullets from summaryHighlights followed by a tech-stack line", () => {
    const work = [buildEntry(0)];
    const resume = buildResume(work, {
      summaryHighlights: ["H1", "H2"],
      techStack: ["TS", "React", "Next"],
    });

    const layout = buildWorkHistoryLayout(resume);

    expect(layout.summaryBullets).toEqual(["H1", "H2", "Tech stack: TS, React, Next."]);
  });

  it("is stable on real resumeData — asserts the shipped layout contract", () => {
    const layout = buildWorkHistoryLayout(resumeData);

    expect(layout.firstPageEntries.length).toBeLessThanOrEqual(FIRST_PAGE_ENTRY_COUNT);
    const withAchievements = layout.firstPageEntries.filter((e) => e.showAchievements).length;
    expect(withAchievements).toBeLessThanOrEqual(FIRST_PAGE_ENTRIES_WITH_ACHIEVEMENTS);
    expect(layout.firstPageEntries.length + layout.remainingEntries.length).toBe(
      resumeData.workHistory.length,
    );
    expect(layout.summaryBullets.at(-1)).toMatch(/^Tech stack: /);
  });
});
