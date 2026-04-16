import { stat, writeFile } from "node:fs/promises";

import { expect, test } from "playwright/test";

test.describe("CV download", () => {
  test("serves the generated PDF from the CV endpoint", async ({ request }, testInfo) => {
    test.setTimeout(120_000);

    const response = await request.get("/api/cv");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect(response.headers()["content-disposition"]).toContain('filename="Lucas_Abritta_CV.pdf"');

    const responseBuffer = await response.body();
    const savedPath = testInfo.outputPath("Lucas_Abritta_CV.pdf");
    await writeFile(savedPath, responseBuffer);
    const downloadedFile = await stat(savedPath);
    expect(downloadedFile.size).toBeGreaterThan(0);
  });
});
