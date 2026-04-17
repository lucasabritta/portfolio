import { describe, expect, it } from "vitest";

import { buildCvFilename, resumeData } from "@portfolio/resume-content";

/**
 * Cross-surface contract: the Playwright spec at
 * `apps/e2e/cv-download.spec.ts` cannot import `@portfolio/resume-content`
 * because Playwright's Node loader will not strip TypeScript types from
 * sources under `node_modules`. Instead it asserts the response matches the
 * regex below. This test pins `buildCvFilename(resumeData.name)` against the
 * same pattern so either side failing fails the build.
 */
const CV_FILENAME_PATTERN = /^[A-Za-z0-9_]+_CV\.pdf$/;

describe("CV filename contract (shared with e2e)", () => {
  it("matches the pattern the e2e spec asserts against", () => {
    const filename = buildCvFilename(resumeData.name);
    expect(filename).toMatch(CV_FILENAME_PATTERN);
  });

  it("falls back to a non-empty slug when the name slugifies to empty", () => {
    const filename = buildCvFilename("!!!");
    expect(filename).toMatch(CV_FILENAME_PATTERN);
    expect(filename).toBe("resume_CV.pdf");
  });
});
