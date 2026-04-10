import { describe, expect, it } from "vitest";

import { buildWorkEntryKey, buildWorkHistoryPartitions } from "@/components/cv-pdf/work-history";
import { cvData } from "@/lib/cv-data";

describe("cv-pdf work history", () => {
  it("partitions work history for first page and overflow pages", () => {
    const partitions = buildWorkHistoryPartitions(cvData);

    expect(partitions.firstEntry).toBe(cvData.workHistory[0]);
    expect(partitions.secondEntry).toBe(cvData.workHistory[1]);
    expect(partitions.thirdEntry).toBe(cvData.workHistory[2]);
    expect(partitions.remainingEntries).toEqual(cvData.workHistory.slice(3));
    expect(partitions.summaryBullets).toEqual(cvData.summaryHighlights);
    expect(partitions.summaryBullets).not.toBe(cvData.summaryHighlights);
  });

  it("creates stable work entry key with period", () => {
    const key = buildWorkEntryKey({
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
