import { describe, expect, it } from "vitest";

import { CV_FILENAME_PATTERN, buildCvFilename, resumeData } from "@portfolio/resume-content";

/**
 * Cross-surface contract for `cv-pdf.response.ts`: the Playwright spec at
 * `apps/e2e/cv-download.spec.ts` cannot import `@portfolio/resume-content`
 * because Playwright's Node loader will not strip TypeScript types from
 * sources under `node_modules`. The canonical {@link CV_FILENAME_PATTERN}
 * therefore lives in resume-content and the e2e spec mirrors it as a
 * literal with a file pointer; this test pins
 * `buildCvFilename(resumeData.name)` — which `cv-pdf.response.ts` embeds in
 * the `Content-Disposition` header — against the canonical regex so either
 * side failing fails the build.
 */
describe("CV filename contract (shared with e2e)", () => {
  it("matches the canonical CV_FILENAME_PATTERN", () => {
    const filename = buildCvFilename(resumeData.name);
    expect(filename).toMatch(CV_FILENAME_PATTERN);
  });

  it("falls back to a non-empty slug when the name slugifies to empty", () => {
    const filename = buildCvFilename("!!!");
    expect(filename).toMatch(CV_FILENAME_PATTERN);
    expect(filename).toBe("resume_CV.pdf");
  });
});
