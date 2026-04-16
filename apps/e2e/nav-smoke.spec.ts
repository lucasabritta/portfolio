import { expect, test } from "playwright/test";

test.describe("Site navigation and critical routes", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("home exposes skip link, primary nav, hero, CV, GitHub, and Storybook entry points", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /skip to content/i })).toBeVisible();
    const primary = page.getByRole("navigation", { name: "Primary" });
    await expect(primary.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    await expect(primary.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    await expect(primary.getByRole("link", { name: "Build" })).toHaveAttribute("href", "/build");
    await expect(primary.getByRole("link", { name: "CV" })).toHaveAttribute("href", "/#resume");
    await expect(page.getByRole("heading", { level: 1, name: "Lucas Abritta" })).toBeVisible();
    const homeLeadHeader = page.locator("header").filter({
      has: page.getByRole("heading", { level: 1, name: "Lucas Abritta" }),
    });
    await expect(homeLeadHeader.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/api/cv");
    await expect(page.getByRole("link", { name: "Open Storybook" }).first()).toBeVisible();
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", /^https:\/\/github\.com\/lucasabritta\/?$/);
  });

  test("header navigates to Projects and Build", async ({ page }) => {
    test.setTimeout(120_000);

    await page.goto("/");
    await Promise.all([
      page.waitForURL(/\/projects$/),
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click(),
    ]);
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();

    await page.goto("/", { waitUntil: "load" });
    await Promise.all([
      page.waitForURL(/\/build$/),
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Build" }).click(),
    ]);
    // `next dev` may compile `/build` on first hit in CI; allow well beyond the default 5s locator timeout.
    const buildMain = page.locator("main#main");
    await expect(buildMain.getByRole("heading", { level: 2, name: /How this site is built/ })).toBeVisible({
      timeout: 60_000,
    });
  });

  test("hash to résumé region shows professional summary", async ({ page }) => {
    await page.goto("/#resume");
    await expect(page.getByRole("heading", { name: /professional summary/i })).toBeVisible();
  });

  test("footer links include Storybook and résumé PDF", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: /Component library \(Storybook\)/i })).toHaveAttribute(
      "href",
      "/storybook",
    );
    await expect(footer.getByRole("link", { name: "Résumé PDF" })).toHaveAttribute("href", "/api/cv");
  });
});
