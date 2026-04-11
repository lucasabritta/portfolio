import { describe, expect, it } from "vitest";

import {
  formatSidebarUrlForPdf,
  splitDegree,
  wrapLongUrl,
} from "@/components/cv-pdf/sections/text-format";

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

  it("splitDegree prefers ': ' so labels match Word degree lines", () => {
    expect(splitDegree("Bachelor's degree: Computer Engineering")).toEqual({
      prefix: "Bachelor's degree",
      suffix: ": Computer Engineering",
    });
  });

  it("wrapLongUrl injects zero-width break opportunities", () => {
    expect(wrapLongUrl("https://example.com/a?b=c&d=e")).toContain("/\u200b");
    expect(wrapLongUrl("https://example.com/a?b=c&d=e")).toContain("?\u200b");
    expect(wrapLongUrl("https://example.com/a?b=c&d=e")).toContain("&\u200b");
    expect(wrapLongUrl("https://example.com/a?b=c&d=e")).toContain("=\u200b");
  });

  it("formatSidebarUrlForPdf uses newlines + ZWSP without dropping characters", () => {
    const url = "https://play.google.com/store/apps/details?id=com.echoes.missingcat";
    const s = formatSidebarUrlForPdf(url);
    expect(s).toContain("\n");
    expect(s.replaceAll("\n", "").replaceAll("\u200b", "")).toBe(url);
  });
});
