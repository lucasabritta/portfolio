import { describe, expect, it } from "vitest";

import { buildHomepageWorkEntryKey } from "./homepage-work-key";

describe("buildHomepageWorkEntryKey", () => {
  it("combines company, role, and period", () => {
    const key = buildHomepageWorkEntryKey({
      company: "Example Corp",
      role: "Engineering Manager",
      location: "Remote",
      period: "2020-2024",
      summary: "Summary",
      achievements: [],
    });

    expect(key).toBe("Example Corp-Engineering Manager-2020-2024");
  });
});
