import { describe, expect, it } from "vitest";

import { buildWorkEntryStableKey } from "./work-entry-stable-key";

describe("buildWorkEntryStableKey", () => {
  it("combines company, role, and period", () => {
    const key = buildWorkEntryStableKey({
      company: "Example Corp",
      role: "Engineering Manager",
      period: "2020-2024",
    });

    expect(key).toBe("Example Corp-Engineering Manager-2020-2024");
  });

  it("disambiguates otherwise identical company/role pairs by period", () => {
    const base = { company: "Acme", role: "Senior Engineer" };
    const first = buildWorkEntryStableKey({ ...base, period: "2018-2020" });
    const second = buildWorkEntryStableKey({ ...base, period: "2022-2024" });

    expect(first).not.toBe(second);
  });
});
