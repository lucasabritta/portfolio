import { expect, test } from "@playwright/test";

import { ProjectsPage } from "../../support/page-objects/projects.page";

test.describe("Projects page", () => {
  test("loads flagship and GitHub sections", async ({ page }) => {
    const projects = new ProjectsPage(page);

    await projects.goto();
    await expect(projects.pageHeading).toBeVisible();
    await expect(projects.flagshipHeading).toBeVisible();
    await expect(projects.pinnedRepositoriesHeading).toBeVisible();
    await expect(projects.hardestProblemHeading).toBeVisible();
  });
});
