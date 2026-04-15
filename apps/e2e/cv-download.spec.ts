import { stat } from "node:fs/promises";

import { expect, test } from "playwright/test";

test.describe("CV download", () => {
  test("downloads the generated PDF", async ({ page }, testInfo) => {
    await page.goto("/");

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("link", { name: "Download CV" }).click(),
    ]);

    await expect(download.failure()).resolves.toBeNull();
    expect(download.suggestedFilename()).toBe("Lucas_Abritta_CV.pdf");

    const savedPath = testInfo.outputPath(download.suggestedFilename());
    await download.saveAs(savedPath);

    const downloadedFile = await stat(savedPath);
    expect(downloadedFile.size).toBeGreaterThan(0);
  });
});
