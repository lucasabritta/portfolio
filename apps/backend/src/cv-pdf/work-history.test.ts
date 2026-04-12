import { describe, expect, it } from "vitest";

import { buildPdfWorkEntryKey, buildWorkHistoryLayout } from "@cv-pdf/work-history";
import { resumeData } from "@portfolio/resume-content";

describe("work-history helper", () => {
  it("builds first page entries and overflow achievements", () => {
    const layout = buildWorkHistoryLayout(resumeData);

    expect(layout.firstPageEntries).toEqual([
      { entry: resumeData.workHistory[0], showAchievements: true },
      { entry: resumeData.workHistory[1], showAchievements: true },
      { entry: resumeData.workHistory[2], showAchievements: false },
    ]);
    expect(layout.firstOverflowAchievements).toEqual(resumeData.workHistory[2]?.achievements ?? []);
    expect(layout.remainingEntries).toEqual(resumeData.workHistory.slice(3));
    expect(layout.summaryBullets).toEqual([
      ...resumeData.summaryHighlights,
      `Tech stack: ${resumeData.techStack.join(", ")}.`,
    ]);
    expect(layout.summaryBullets).not.toBe(resumeData.summaryHighlights);
  });

  it("returns empty overflow achievements when there is no third entry", () => {
    const layout = buildWorkHistoryLayout({
      ...resumeData,
      workHistory: resumeData.workHistory.slice(0, 2),
    });

    expect(layout.firstPageEntries).toHaveLength(2);
    expect(layout.firstOverflowAchievements).toEqual([]);
    expect(layout.remainingEntries).toEqual([]);
  });

  it("creates stable work entry key with period", () => {
    const key = buildPdfWorkEntryKey({
      company: "Alpha",
      role: "Lead",
      location: "Remote",
      period: "2021-2023",
      summary: "Summary",
      achievements: [],
    });

    expect(key).toBe("Alpha-Lead-2021-2023");
  });
});
