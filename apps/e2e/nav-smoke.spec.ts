import { expect, test } from "@playwright/test";

import { EXTERNAL_URLS, NAV_LINKS, PAGE_COPY } from "./fixtures/strings";

test.describe("Site navigation and critical routes", () => {
  test("home exposes skip link, primary nav, hero, CV, GitHub, and Storybook entry points", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /skip to content/i })).toBeVisible();
    const primary = page.getByRole("navigation", { name: "Primary" });
    for (const { label, href } of Object.values(NAV_LINKS)) {
      await expect(primary.getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
    await expect(
      page.getByRole("heading", { level: 1, name: PAGE_COPY.homeHeroName }),
    ).toBeVisible();
    const homeLeadHeader = page.locator("header").filter({
      has: page.getByRole("heading", { level: 1, name: PAGE_COPY.homeHeroName }),
    });
    await expect(homeLeadHeader.getByRole("link", { name: "Download CV" })).toHaveAttribute(
      "href",
      EXTERNAL_URLS.cvApi,
    );
    await expect(page.getByRole("link", { name: "Open Storybook" }).first()).toBeVisible();
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      EXTERNAL_URLS.githubProfile,
    );
  });

  test("header navigates to Projects and Build", async ({ page }) => {
    test.setTimeout(120_000);

    await page.goto("/");
    await Promise.all([
      page.waitForURL(/\/projects$/),
      page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: NAV_LINKS.projects.label })
        .click(),
    ]);
    await expect(page.getByRole("heading", { name: PAGE_COPY.projectsHeading })).toBeVisible();

    await page.goto("/", { waitUntil: "load" });
    await Promise.all([
      page.waitForURL(/\/build$/),
      page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: NAV_LINKS.build.label })
        .click(),
    ]);
    // `next dev` may compile `/build` on first hit in CI; allow well beyond the default 5s locator timeout.
    const buildMain = page.getByRole("main");
    await expect(
      buildMain.getByRole("heading", { level: 2, name: PAGE_COPY.buildHeading }),
    ).toBeVisible({
      timeout: 60_000,
    });
  });

  test("hash to résumé region shows professional summary", async ({ page }) => {
    await page.goto("/#resume");
    await expect(page.getByRole("heading", { name: PAGE_COPY.resumeSectionHeading })).toBeVisible();
  });

  test("footer links include Storybook and résumé PDF", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(
      footer.getByRole("link", { name: /Component library \(Storybook\)/i }),
    ).toHaveAttribute("href", EXTERNAL_URLS.storybookIndex);
    await expect(footer.getByRole("link", { name: "Résumé PDF" })).toHaveAttribute(
      "href",
      EXTERNAL_URLS.cvApi,
    );
  });
});
