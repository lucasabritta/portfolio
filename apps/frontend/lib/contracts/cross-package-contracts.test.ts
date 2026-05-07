import { describe, expect, it } from "vitest";

import { buildWorkEntryStableKey, resumeData } from "@portfolio/resume-content";
import { presentationWorkEntryKey } from "@portfolio/storybook/home";

describe("cross-package presentation contracts", () => {
  it("keeps Storybook work-entry keys aligned with resume-content", () => {
    for (const entry of resumeData.workHistory) {
      expect(presentationWorkEntryKey(entry)).toBe(buildWorkEntryStableKey(entry));
    }
  });
});
