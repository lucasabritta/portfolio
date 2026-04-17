import { expect, test } from "@playwright/test";

import { PAGE_COPY } from "./fixtures/strings";

test.describe("Projects page", () => {
  test("loads flagship and GitHub sections", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: PAGE_COPY.projectsHeading })).toBeVisible();
    await expect(page.getByRole("heading", { name: PAGE_COPY.projectsFlagshipTitle })).toBeVisible();
    await expect(page.getByRole("heading", { name: PAGE_COPY.projectsPinnedHeading })).toBeVisible();
    await expect(page.getByRole("heading", { name: PAGE_COPY.projectsHardestHeading })).toBeVisible();
  });
});
