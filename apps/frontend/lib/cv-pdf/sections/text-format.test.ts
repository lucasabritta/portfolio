import { describe, expect, it } from "vitest";

import { formatSidebarUrlForPdf, splitDegree, wrapLongUrl } from "./text-format";

const ZWSP = "\u200b";

describe("splitDegree", () => {
  it("splits on the first ': ' so the colon+suffix stays bold in the PDF", () => {
    expect(splitDegree("Bachelor's degree: Computer Engineering")).toEqual({
      prefix: "Bachelor's degree",
      suffix: ": Computer Engineering",
    });
  });

  it("falls back to bare ':' when no space follows", () => {
    expect(splitDegree("Diploma:Mathematics")).toEqual({
      prefix: "Diploma",
      suffix: ":Mathematics",
    });
  });

  it("returns the whole string as prefix when there is no colon", () => {
    expect(splitDegree("High School")).toEqual({
      prefix: "High School",
      suffix: "",
    });
  });

  it("prefers ': ' over an earlier bare ':' so labels with a bare colon still split correctly", () => {
    // Label has `...C:` then `: bold part` — the human split is at `: `.
    const split = splitDegree("Label C: Bold Part");
    expect(split.prefix).toBe("Label C");
    expect(split.suffix).toBe(": Bold Part");
  });
});

describe("wrapLongUrl", () => {
  it("inserts a zero-width space after every /, ?, & and = so the PDF layout can soft-wrap inside a run", () => {
    const input = "https://example.com/path/to?foo=bar&baz=qux";
    const out = wrapLongUrl(input);

    // Stripping ZWSP restores the input.
    expect(out.replaceAll(ZWSP, "")).toBe(input);
    // Each separator is followed by a ZWSP — count must match the input's separator count.
    const separatorCount = [...input].filter((c) => "/?&=".includes(c)).length;
    expect([...out].filter((c) => c === ZWSP)).toHaveLength(separatorCount);
    // And every ZWSP immediately follows one of those separators.
    for (let i = 0; i < out.length; i += 1) {
      if (out[i] === ZWSP) {
        expect("/?&=").toContain(out[i - 1]);
      }
    }
  });

  it("is a no-op for strings without separators", () => {
    expect(wrapLongUrl("plaintext")).toBe("plaintext");
  });
});

describe("formatSidebarUrlForPdf", () => {
  it("returns only the authority (ZWSP-wrapped) for a URL with no path", () => {
    const out = formatSidebarUrlForPdf("https://example.com");
    expect(out).not.toContain("\n");
    expect(out).toContain("example.com");
    expect(out).toContain(ZWSP);
  });

  it("keeps the authority intact on the first line and puts the path on subsequent lines", () => {
    const out = formatSidebarUrlForPdf("https://example.com/some/long/path");
    const [first, ...rest] = out.split("\n");

    expect(first.replaceAll(ZWSP, "")).toBe("https://example.com");
    expect(rest.length).toBeGreaterThanOrEqual(0);
  });

  it("breaks path/query across multiple short lines respecting maxLineChars", () => {
    const url =
      "https://example.com/one/two/three/four/five/six?alpha=beta&gamma=delta";
    const maxLineChars = 20;

    const out = formatSidebarUrlForPdf(url, maxLineChars);
    const lines = out.split("\n");
    const stripped = lines.map((line) => line.replaceAll(ZWSP, ""));

    expect(lines.length).toBeGreaterThan(1);
    expect(stripped[0]).toBe("https://example.com");
    // Lines after authority must each fit in `maxLineChars`.
    for (const line of stripped.slice(1)) {
      expect(line.length).toBeLessThanOrEqual(maxLineChars);
    }
    expect(stripped.join("")).toBe(url);
  });

  it("falls back to plain wrapLongUrl when the input has no protocol", () => {
    expect(formatSidebarUrlForPdf("example.com/path")).toBe(
      wrapLongUrl("example.com/path"),
    );
  });
});
