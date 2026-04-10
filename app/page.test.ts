import { describe, expect, it } from "vitest";

import { buildPhoneHref, buildWorkEntryKey } from "@/app/page-data";

describe("page data", () => {
  it("buildPhoneHref strips spaces", () => {
    expect(buildPhoneHref("+55 11 99999 0000")).toBe("tel:+5511999990000");
  });

  it("buildWorkEntryKey combines company and role", () => {
    const key = buildWorkEntryKey({
      company: "Example Corp",
      role: "Engineering Manager",
      location: "Remote",
      period: "2020-2024",
      summary: "Summary",
      achievements: [],
    });

    expect(key).toBe("Example Corp-Engineering Manager");
  });
});
