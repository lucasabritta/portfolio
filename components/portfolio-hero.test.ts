import { describe, expect, it } from "vitest";

import { buildPhoneHref } from "@/components/portfolio-hero-phone";

describe("portfolio hero phone link", () => {
  it("removes spaces from phone for tel links", () => {
    expect(buildPhoneHref("+49 123 456 789")).toBe("tel:+49123456789");
  });
});
