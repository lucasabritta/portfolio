import { expect, test } from "@playwright/test";

import { CRAWLER_TEXT_ROUTES } from "../../support/fixtures/crawler-text-routes";

const nonEmptyBodyExpectation = {
  message: "should return visible content",
  minLength: 20,
} as const;

test.describe("Crawler and agent text routes", () => {
  for (const { path, contentType, expectedContent } of CRAWLER_TEXT_ROUTES) {
    test(`${path} is visible and has content`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status(), `${path} should be visible`).toBe(200);
      expect(response.headers()["content-type"] ?? "").toMatch(contentType);

      const body = (await response.text()).trim();
      expect(body.length, `${path} ${nonEmptyBodyExpectation.message}`).toBeGreaterThan(
        nonEmptyBodyExpectation.minLength,
      );
      for (const marker of expectedContent) {
        expect(body, `${path} should include ${marker}`).toMatch(marker);
      }
    });
  }
});
