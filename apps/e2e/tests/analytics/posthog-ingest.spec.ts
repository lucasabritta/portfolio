import { expect, test } from "@playwright/test";

import { expectPageQueryParams, PRESERVED_QUERY_FIXTURE } from "../../support/helpers/query-params";
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
    await expectPostHogEvent(ingest, "page_viewed", {
      utm_source: preserved.utm_source,
      utm_medium: preserved.utm_medium,
      route_name: "projects",
    });
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
