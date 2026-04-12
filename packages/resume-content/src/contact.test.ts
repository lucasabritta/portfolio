import { describe, expect, it } from "vitest";

import { buildPhoneHref } from "./contact";

describe("buildPhoneHref", () => {
  it("strips spaces", () => {
    expect(buildPhoneHref("+55 11 99999 0000")).toBe("tel:+5511999990000");
  });
});
