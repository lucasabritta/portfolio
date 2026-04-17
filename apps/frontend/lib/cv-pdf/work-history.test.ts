import { describe, expect, it } from "vitest";

import { buildWorkEntryStableKey, resumeData } from "@portfolio/resume-content";
import { presentationWorkEntryKey } from "@portfolio/storybook";

import { buildPdfWorkEntryKey } from "./work-history";

/**
 * Cross-package contract: `@portfolio/storybook` must not import
 * `@portfolio/resume-content` (ESLint-enforced boundary), so it mirrors the
 * work-entry key algorithm. This file lives alongside `work-history.ts` —
 * which owns the PDF-side `buildPdfWorkEntryKey` delegate — and pins the
 * three implementations (canonical, PDF wrapper, Storybook mirror) together
 * for every real résumé entry.
 */
describe("buildPdfWorkEntryKey", () => {
  it("delegates to the canonical buildWorkEntryStableKey", () => {
    for (const entry of resumeData.workHistory) {
      expect(buildPdfWorkEntryKey(entry)).toBe(buildWorkEntryStableKey(entry));
    }
  });
});

describe("work-entry key contract across resume-content and storybook", () => {
  it("produces identical keys for every entry in resumeData.workHistory", () => {
    for (const entry of resumeData.workHistory) {
      const canonical = buildWorkEntryStableKey(entry);
      const mirrored = presentationWorkEntryKey(entry);
      expect(mirrored).toBe(canonical);
    }
  });

  it("produces unique keys across the whole work history", () => {
    const keys = resumeData.workHistory.map((entry) =>
      buildWorkEntryStableKey(entry),
    );
    const unique = new Set(keys);
    expect(unique.size).toBe(keys.length);
  });
});
