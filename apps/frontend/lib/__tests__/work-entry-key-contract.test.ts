import { describe, expect, it } from "vitest";

import { buildWorkEntryStableKey, resumeData } from "@portfolio/resume-content";
import { presentationWorkEntryKey } from "@portfolio/storybook";

/**
 * Cross-package contract: `@portfolio/storybook` must not import
 * `@portfolio/resume-content` (ESLint-enforced boundary), so it mirrors the
 * work-entry key algorithm. This test lives in the frontend app — the only
 * surface that depends on both packages — and pins the two implementations
 * together for every real résumé entry.
 */
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
