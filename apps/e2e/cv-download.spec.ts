import { stat, writeFile } from "node:fs/promises";

import { expect, test } from "@playwright/test";

import { CONTENT_DISPOSITION_FILENAME, CV_FILENAME_PATTERN } from "./fixtures/strings";

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
