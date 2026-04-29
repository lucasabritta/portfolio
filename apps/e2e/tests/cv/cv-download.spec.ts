import { stat } from "node:fs/promises";

import { expect, test } from "@playwright/test";

import { CV_FILENAME_PATTERN } from "../../support/helpers/strings";
import { HomePage } from "../../support/page-objects/home.page";

test.describe("CV download", () => {
  test("downloads the generated PDF from the home page CV button", async ({ page }, testInfo) => {
    const home = new HomePage(page);

    await home.goto();
    await expect(home.downloadCvLink).toBeVisible();

    const download = await home.downloadCv();
    const filename = download.suggestedFilename();
    expect(filename).toMatch(CV_FILENAME_PATTERN);

    const savedPath = testInfo.outputPath(filename);
    await download.saveAs(savedPath);
    expect(await download.failure()).toBeNull();

    const downloadedFile = await stat(savedPath);
    expect(downloadedFile.size).toBeGreaterThan(0);
  });
});
