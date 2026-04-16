import { expect, test } from "playwright/test";

test.describe("Projects page", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("loads flagship and GitHub sections", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Echoes: Missing Cat" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pinned GitHub repositories" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hardest problem" })).toBeVisible();
  });
});
