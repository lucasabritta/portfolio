import { expect, test } from "playwright/test";

test.describe("Build and Storybook HTTP routes", () => {
  test("GET /build returns HTML", async ({ request }) => {
    const res = await request.get("/build");
    expect(res.status()).toBe(200);
    const ct = res.headers()["content-type"] ?? "";
    expect(ct).toMatch(/text\/html/i);
    const body = await res.text();
    expect(body).toMatch(/How this site is built/i);
  });

  test("GET /storybook and /storybook/ return Storybook shell", async ({ request }) => {
    for (const path of ["/storybook", "/storybook/"] as const) {
      const res = await request.get(path);
      expect(res.status(), `${path} should be served`).toBe(200);
      const ct = res.headers()["content-type"] ?? "";
      expect(ct).toMatch(/text\/html/i);
      const body = await res.text();
      expect(body).toMatch(/storybook/i);
    }
  });
});
