import { stat, writeFile } from "node:fs/promises";

import { expect, test } from "playwright/test";

/**
 * Expected filename shape served by `/api/cv`. The Next.js app builds the
 * actual string via `buildCvFilename(resumeData.name)` from
 * `@portfolio/resume-content`. Playwright's Node loader cannot strip types
 * from TS sources under `node_modules`, so instead of importing the helper
 * we assert against the exact shape the helper produces. A cross-package
 * contract test in `apps/frontend/lib/__tests__/cv-filename-contract.test.ts`
 * keeps this pattern in lock-step with the canonical builder.
 */
const CV_FILENAME_PATTERN = /^[A-Za-z0-9_]+_CV\.pdf$/;
const CONTENT_DISPOSITION_PATTERN =
  /^attachment; filename="([A-Za-z0-9_]+_CV\.pdf)"$/;

test.describe("CV download", () => {
  test("serves the generated PDF from the CV endpoint", async ({ request }, testInfo) => {
    test.setTimeout(120_000);

    const response = await request.get("/api/cv");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");

    const disposition = response.headers()["content-disposition"] ?? "";
    const match = CONTENT_DISPOSITION_PATTERN.exec(disposition);
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
