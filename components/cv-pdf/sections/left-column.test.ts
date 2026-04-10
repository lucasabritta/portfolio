import { describe, expect, it } from "vitest";

import { splitDegree, wrapLongUrl } from "@/components/cv-pdf/sections/text-format";

describe("left-column text format", () => {
  it("splitDegree splits at the first colon", () => {
    expect(splitDegree("Bachelor: Computer Science")).toEqual({
      prefix: "Bachelor",
      suffix: ": Computer Science",
    });
  });

  it("splitDegree keeps full text when there is no colon", () => {
    expect(splitDegree("MBA")).toEqual({ prefix: "MBA", suffix: "" });
  });

  it("wrapLongUrl injects zero-width break opportunities", () => {
    expect(wrapLongUrl("https://example.com/a?b=c&d=e")).toContain("/\u200b");
    expect(wrapLongUrl("https://example.com/a?b=c&d=e")).toContain("?\u200b");
    expect(wrapLongUrl("https://example.com/a?b=c&d=e")).toContain("&\u200b");
    expect(wrapLongUrl("https://example.com/a?b=c&d=e")).toContain("=\u200b");
  });
});
