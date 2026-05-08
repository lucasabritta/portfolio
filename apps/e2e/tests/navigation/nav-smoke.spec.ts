import { expect, test } from "@playwright/test";

import { EXTERNAL_URLS, NAV_LINKS } from "../../support/helpers/strings";
import { BuildPage } from "../../support/page-objects/build.page";
import { HomePage } from "../../support/page-objects/home.page";
import { ProjectsPage } from "../../support/page-objects/projects.page";

test.describe("Site navigation and critical routes", () => {
  test("home exposes skip link, primary nav, hero, GitHub, and Storybook entry points", async ({
    page,
  }) => {
    const home = new HomePage(page);

    await home.goto();
    await expect(home.skipLink).toBeVisible();
    for (const { label, href } of Object.values(NAV_LINKS)) {
      await expect(home.primaryNavLink(label)).toHaveAttribute("href", href);
    }
    await expect(home.heroHeading).toBeVisible();
    await expect(home.storybookEntryLink).toBeVisible();
    await expect(home.footerGithubLink).toHaveAttribute("href", EXTERNAL_URLS.githubProfile);
  });

  test("header navigates to Projects and Build", async ({ page }) => {
    const home = new HomePage(page);
    const projects = new ProjectsPage(page);
    const build = new BuildPage(page);

    await home.goto();
    await home.openProjectsFromPrimaryNav();
    await expect(projects.pageHeading).toBeVisible();

    await home.goto({ waitUntil: "load" });
    await home.openBuildFromPrimaryNav();
    await expect(build.pageHeading).toBeVisible();
  });

  test("hash to résumé region shows résumé details", async ({ page }) => {
    const home = new HomePage(page);

    await home.gotoResumeSection();
    await expect(home.resumeSectionHeading).toBeVisible();
  });

  test("footer links include Storybook", async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await expect(home.footerStorybookLink).toHaveAttribute("href", EXTERNAL_URLS.storybookIndex);
  });
});
