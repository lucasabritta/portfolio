import { describe, expect, it } from "vitest";

import { buildPdfWorkEntryKey, buildWorkHistoryLayout } from "@/lib/cv-pdf/work-history";
import { cvData } from "@portfolio/cv";

describe("work-history helper", () => {
  it("builds first page entries and overflow achievements", () => {
    const layout = buildWorkHistoryLayout(cvData);

    expect(layout.firstPageEntries).toEqual([
      { entry: cvData.workHistory[0], showAchievements: true },
      { entry: cvData.workHistory[1], showAchievements: true },
      { entry: cvData.workHistory[2], showAchievements: false },
    ]);
    expect(layout.firstOverflowAchievements).toEqual(cvData.workHistory[2]?.achievements ?? []);
    expect(layout.remainingEntries).toEqual(cvData.workHistory.slice(3));
    expect(layout.summaryBullets).toEqual([
      ...cvData.summaryHighlights,
      `Tech stack: ${cvData.techStack.join(", ")}.`,
    ]);
    expect(layout.summaryBullets).not.toBe(cvData.summaryHighlights);
  });

  it("returns empty overflow achievements when there is no third entry", () => {
    const layout = buildWorkHistoryLayout({
      ...cvData,
      workHistory: cvData.workHistory.slice(0, 2),
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
