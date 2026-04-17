import { stat, writeFile } from "node:fs/promises";

import { expect, test } from "playwright/test";

/**
 * Expected filename shape served by `/api/cv`. The Next.js app builds the
 * actual string via `buildCvFilename(resumeData.name)` from
 * `@portfolio/resume-content`. Playwright's Node loader cannot strip types
 * from TS sources under `node_modules`, so instead of importing the helper
 * we mirror the canonical `CV_FILENAME_PATTERN` defined in
 * `packages/resume-content/src/cv-filename.ts` — DO NOT edit this regex
 * without updating that file and the frontend contract test at
 * `apps/frontend/lib/__tests__/cv-filename-contract.test.ts`, which both
 * reference the same canonical pattern.
 */
const CV_FILENAME_PATTERN = /^[A-Za-z0-9_]+_CV\.pdf$/;

/**
 * Extracts the filename from a `Content-Disposition` header without
 * requiring a specific overall shape so the test tolerates future header
 * additions (e.g. RFC 5987 `filename*=` for non-ASCII names).
 */
const CONTENT_DISPOSITION_FILENAME =
  /filename="([A-Za-z0-9_]+_CV\.pdf)"/;

test.describe("CV download", () => {
  test("serves the generated PDF from the CV endpoint", async ({ request }, testInfo) => {
    test.setTimeout(120_000);

    const response = await request.get("/api/cv");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");

    const disposition = response.headers()["content-disposition"] ?? "";
    expect(disposition.toLowerCase()).toContain("attachment");
    const match = CONTENT_DISPOSITION_FILENAME.exec(disposition);
    expect(match, `unexpected content-disposition: ${disposition}`).not.toBeNull();

    const filename = match![1];
    expect(filename).toMatch(CV_FILENAME_PATTERN);

    const responseBuffer = await response.body();
    const savedPath = testInfo.outputPath(filename);
    await writeFile(savedPath, responseBuffer);
    const downloadedFile = await stat(savedPath);
    expect(downloadedFile.size).toBeGreaterThan(0);
  });
});
