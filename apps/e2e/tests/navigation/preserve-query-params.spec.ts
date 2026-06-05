import { expect, test } from "@playwright/test";

import {
  expectPageQueryParams,
  expectStoredPreservedParams,
  PRESERVED_QUERY_FIXTURE,
  queryStringFrom,
} from "../../support/helpers/query-params";
import { HomePage } from "../../support/page-objects/home.page";
import { ProjectsPage } from "../../support/page-objects/projects.page";

const preserved = PRESERVED_QUERY_FIXTURE;

function urlHasPreservedParams(url: URL): boolean {
  return (
    url.searchParams.get("utm_source") === preserved.utm_source &&
    url.searchParams.get("foo") === preserved.foo
  );
}

test.describe("Preserve URL query params", () => {
  test("persists params when navigating via primary nav", async ({ page }) => {
    const home = new HomePage(page);
    const projects = new ProjectsPage(page);

    await home.gotoWithQueryParams(preserved);
    await expectStoredPreservedParams(page, preserved);

    await home.openProjectsFromPrimaryNav();
    await expect(projects.pageHeading).toBeVisible();
    await expectPageQueryParams(page, preserved);

    await home.openBuildFromPrimaryNav();
    await expect(page.getByRole("heading", { name: /site architecture/i })).toBeVisible();
    await expectPageQueryParams(page, preserved);
    await expectStoredPreservedParams(page, preserved);
  });

  test("persists params when navigating via hero CTA", async ({ page }) => {
    const home = new HomePage(page);
    const projects = new ProjectsPage(page);

    await home.gotoWithQueryParams(preserved);
    await home.viewProjectsFromHero();
    await expect(projects.pageHeading).toBeVisible();
    await expectPageQueryParams(page, preserved);
    await expectStoredPreservedParams(page, preserved);
  });

  test("keeps params on same-page skip link without routing to home", async ({ page }) => {
    const query = queryStringFrom(preserved);
    await page.goto(`/projects?${query}`);
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();

    await page.locator('a[href="#main"]').evaluate((anchor) => {
      (anchor as HTMLAnchorElement).click();
    });
    await expect(page).toHaveURL((url) => {
      const parsed = new URL(url);
      return parsed.pathname === "/projects" && urlHasPreservedParams(parsed);
    });
  });

  test("merges params for cross-route hash links from not-found", async ({ page }) => {
    const query = queryStringFrom(preserved);
    await page.goto(`/does-not-exist?${query}`);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();

    await page.getByRole("link", { name: "Jump to resume" }).click();
    await expect(page).toHaveURL((url) => {
      const parsed = new URL(url);
      return parsed.pathname === "/" && parsed.hash === "#resume" && urlHasPreservedParams(parsed);
    });
    await expectStoredPreservedParams(page, preserved);
  });
});
