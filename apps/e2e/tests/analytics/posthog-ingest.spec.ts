import { expect, test } from "@playwright/test";

import { expectPageQueryParams, PRESERVED_QUERY_FIXTURE } from "../../support/helpers/query-params";
import { PAGE_COPY } from "../../support/helpers/strings";
import { PRESERVED_PARAMS_STORAGE_KEY } from "../../../frontend/lib/analytics/query-params-storage-key";
import {
  E2E_POSTHOG_KEY,
  countPostHogEvents,
  expectPostHogEvent,
  expectPostHogIngestPost,
  installPostHogIngestCapture,
} from "../../support/helpers/posthog-ingest";
import { HomePage } from "../../support/page-objects/home.page";
import { ProjectsPage } from "../../support/page-objects/projects.page";

const preserved = PRESERVED_QUERY_FIXTURE;

test.describe("PostHog ingest", () => {
  test("initializes with the e2e project key and POSTs to /ingest", async ({ page }) => {
    const ingest = await installPostHogIngestCapture(page);

    await page.goto(`/?${new URLSearchParams(preserved).toString()}`);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => window.__PF_POSTHOG_KEY__ ?? null))
      .toBe(E2E_POSTHOG_KEY);

    await expectPostHogIngestPost(ingest);
    await expectPostHogEvent(ingest, "page_viewed", {
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
      entry_query: `utm_source=${preserved.utm_source}&utm_medium=${preserved.utm_medium}`,
    });
  });

  test("keeps query super properties on page_viewed after in-app navigation", async ({ page }) => {
    const ingest = await installPostHogIngestCapture(page);
    const home = new HomePage(page);
    const projects = new ProjectsPage(page);

    await home.gotoWithQueryParams(preserved);
    await expectPostHogEvent(ingest, "page_viewed", {
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });

    const postsBeforeNav = ingest.posts.length;
    await home.openProjectsFromPrimaryNavWithPreservedParams();
    await expect(projects.pageHeading).toBeVisible();
    await expectPageQueryParams(page, preserved);

    await expectPostHogEvent(ingest, "nav_clicked", {
      label: "Projects",
      target: "/projects",
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });

    await expect.poll(() => ingest.posts.length).toBeGreaterThan(postsBeforeNav);
    await expectPostHogEvent(
      ingest,
      "page_viewed",
      {
        utm_source: preserved.utm_source,
        utm_medium: preserved.utm_medium,
        route_name: "projects",
      },
      (properties) => properties.route_name === "projects",
    );
  });

  test("emits cta_clicked from the hero CTA with preserved UTMs", async ({ page }) => {
    const ingest = await installPostHogIngestCapture(page);
    const home = new HomePage(page);
    const projects = new ProjectsPage(page);

    await home.gotoWithQueryParams(preserved);
    await home.viewProjectsFromHero();
    await expect(projects.pageHeading).toBeVisible();
    await expectPageQueryParams(page, preserved);

    await expectPostHogEvent(ingest, "cta_clicked", {
      location: "home_hero",
      target: "/projects",
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });
  });

  test("emits theme_changed once without a duplicate click event", async ({ page }) => {
    const ingest = await installPostHogIngestCapture(page);
    const home = new HomePage(page);

    await home.gotoWithQueryParams(preserved);
    await page.getByRole("button", { name: "Dark" }).first().click();

    await expectPostHogEvent(ingest, "theme_changed", {
      preference: "dark",
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });
    expect(countPostHogEvents(ingest, "cta_clicked")).toBe(0);
  });

  test("does not emit theme_changed on initial landing", async ({ page }) => {
    const ingest = await installPostHogIngestCapture(page);
    const home = new HomePage(page);

    await home.gotoWithQueryParams(preserved);
    await expectPostHogEvent(ingest, "page_viewed", {
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });
    expect(countPostHogEvents(ingest, "theme_changed")).toBe(0);
  });

  test("emits cta_clicked with open_target new_tab on middle-click View Projects", async ({
    page,
    context,
  }) => {
    const ingest = await installPostHogIngestCapture(page);
    const home = new HomePage(page);

    await home.gotoWithQueryParams(preserved);

    const newPagePromise = context.waitForEvent("page");
    await home.leadHeader.getByRole("link", { name: "View Projects" }).click({ button: "middle" });
    const newPage = await newPagePromise;
    await newPage.waitForLoadState("domcontentloaded");
    await newPage.close();

    await expectPostHogEvent(
      ingest,
      "cta_clicked",
      {
        location: "home_hero",
        target: "/projects",
        open_target: "new_tab",
        utm_source: preserved.utm_source,
        utm_medium: preserved.utm_medium,
      },
      (properties) =>
        typeof properties.client_window_id === "string" &&
        properties.client_window_id.length > 0 &&
        typeof properties.client_page_instance_id === "string" &&
        properties.client_page_instance_id.length > 0,
    );
  });

  test("emits cta_clicked with open_target new_tab on middle-click Contact", async ({
    page,
    context,
  }) => {
    const ingest = await installPostHogIngestCapture(page);
    const home = new HomePage(page);

    await home.gotoWithQueryParams(preserved);

    const newPagePromise = context.waitForEvent("page");
    await home.leadHeader.getByRole("link", { name: "Contact" }).click({ button: "middle" });
    const newPage = await newPagePromise;
    await newPage.waitForLoadState("domcontentloaded");
    await newPage.close();

    await expectPostHogEvent(
      ingest,
      "cta_clicked",
      {
        location: "home_hero",
        target: "#contact-heading",
        open_target: "new_tab",
        link_kind: "hash",
        utm_source: preserved.utm_source,
        utm_medium: preserved.utm_medium,
      },
      (properties) =>
        typeof properties.client_window_id === "string" &&
        properties.client_window_id.length > 0 &&
        typeof properties.client_page_instance_id === "string" &&
        properties.client_page_instance_id.length > 0,
    );
  });

  test("rotates client_page_instance_id on in-app navigation while client_window_id stays stable", async ({
    page,
  }) => {
    const ingest = await installPostHogIngestCapture(page);
    const home = new HomePage(page);
    const projects = new ProjectsPage(page);

    await home.gotoWithQueryParams(preserved);

    const landingEvent = await expectPostHogEvent(
      ingest,
      "page_viewed",
      {
        utm_source: preserved.utm_source,
        utm_medium: preserved.utm_medium,
      },
      (properties) =>
        typeof properties.client_window_id === "string" &&
        typeof properties.client_page_instance_id === "string",
    );

    const landingWindowId = landingEvent.properties.client_window_id as string;
    const landingPageInstanceId = landingEvent.properties.client_page_instance_id as string;

    await home.openProjectsFromPrimaryNavWithPreservedParams();
    await expect(projects.pageHeading).toBeVisible();

    await expectPostHogEvent(
      ingest,
      "page_viewed",
      {
        utm_source: preserved.utm_source,
        utm_medium: preserved.utm_medium,
        route_name: "projects",
      },
      (properties) =>
        properties.client_window_id === landingWindowId &&
        properties.client_page_instance_id !== landingPageInstanceId &&
        properties.route_name === "projects",
    );
  });

  test("emits nav_menu_toggled when opening and closing the mobile navigation menu", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const ingest = await installPostHogIngestCapture(page);
    const home = new HomePage(page);

    await home.gotoWithQueryParams(preserved);
    await page.getByRole("button", { name: /open navigation menu/i }).click();

    await expectPostHogEvent(ingest, "nav_menu_toggled", {
      menu_state: "open",
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });

    await page
      .getByRole("button", { name: /close navigation menu/i })
      .evaluate((button) => {
        button.click();
      });

    await expectPostHogEvent(
      ingest,
      "nav_menu_toggled",
      {
        menu_state: "close",
        utm_source: preserved.utm_source,
        utm_medium: preserved.utm_medium,
      },
      (properties) => properties.menu_state === "close",
    );
  });

  test("tags events with client_window_id and client_page_instance_id", async ({ page }) => {
    const ingest = await installPostHogIngestCapture(page);
    const home = new HomePage(page);

    await home.gotoWithQueryParams(preserved);

    await expectPostHogEvent(
      ingest,
      "page_viewed",
      {
        utm_source: preserved.utm_source,
        utm_medium: preserved.utm_medium,
      },
      (properties) =>
        typeof properties.client_window_id === "string" &&
        properties.client_window_id.length > 0 &&
        typeof properties.client_page_instance_id === "string" &&
        properties.client_page_instance_id.length > 0,
    );
  });

  test("emits not_found_viewed and page_viewed for a missing route", async ({ page }) => {
    const ingest = await installPostHogIngestCapture(page);

    await page.goto(`/does-not-exist?${new URLSearchParams(preserved).toString()}`);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();

    await expectPostHogEvent(ingest, "not_found_viewed", {
      pathname: "/does-not-exist",
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });
    await expectPostHogEvent(
      ingest,
      "page_viewed",
      {
        route_name: "other",
        utm_source: preserved.utm_source,
        utm_medium: preserved.utm_medium,
      },
      (properties) => properties.route_name === "other",
    );
  });

  test("records nav_clicked with UTMs on an immediate post-landing click", async ({ page }) => {
    test.setTimeout(60_000);
    const ingest = await installPostHogIngestCapture(page);
    const query = new URLSearchParams(preserved).toString();

    await page.goto(`/?${query}`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction((key) => {
      const raw = sessionStorage.getItem(key);
      return Boolean(raw && JSON.parse(raw).utm_source === "e2e");
    }, PRESERVED_PARAMS_STORAGE_KEY);
    await expect
      .poll(() => page.evaluate(() => window.__PF_POSTHOG_KEY__ ?? null))
      .toBe(E2E_POSTHOG_KEY);
    await expect(page.getByRole("heading", { level: 1, name: PAGE_COPY.homeHeroName })).toBeVisible();
    await expectPostHogEvent(ingest, "page_viewed", {
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });

    const projectsLink = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Projects" });
    await expect(projectsLink).toBeVisible();
    await projectsLink.click();

    await expectPostHogEvent(ingest, "nav_clicked", {
      label: "Projects",
      target: "/projects",
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });
    await expect(page).toHaveURL(/\/projects/);
  });

  test("does not emit another page_viewed when UTMs are synced onto the URL after a direct landing", async ({
    page,
  }) => {
    const ingest = await installPostHogIngestCapture(page);

    await page.goto(`/?${new URLSearchParams(preserved).toString()}`);
    await expectPostHogEvent(ingest, "page_viewed", {
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
    });

    await page.goto("/projects");
    await expect
      .poll(() =>
        countPostHogEvents(
          ingest,
          "page_viewed",
          (properties) => properties.route_name === "projects",
        ),
      )
      .toBeGreaterThan(0);

    const pageViewsBeforeSync = countPostHogEvents(
      ingest,
      "page_viewed",
      (properties) => properties.route_name === "projects",
    );

    await expect
      .poll(() => new URL(page.url()).searchParams.get("utm_source"))
      .toBe(preserved.utm_source);
    await expectPageQueryParams(page, preserved);

    expect(
      countPostHogEvents(
        ingest,
        "page_viewed",
        (properties) => properties.route_name === "projects",
      ),
    ).toBe(pageViewsBeforeSync);
  });
});
