import { describe, expect, it } from "vitest";

import { buildPhoneHref } from "./contact";

describe("contact helpers", () => {
  it("strips spaces from phone before building tel href", () => {
    expect(buildPhoneHref("+55 11 99999 0000")).toBe("tel:+5511999990000");
  });

  it("keeps already compact phone numbers intact", () => {
    expect(buildPhoneHref("+34999999999")).toBe("tel:+34999999999");
  });
});
