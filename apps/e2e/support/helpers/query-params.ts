import { expect, type Page } from "@playwright/test";

/** Stable query fixture for attribution preservation tests. */
export const PRESERVED_QUERY_FIXTURE = {
  utm_source: "e2e",
  utm_medium: "test",
} as const;

export type PreservedQueryFixture = typeof PRESERVED_QUERY_FIXTURE;

export function queryStringFrom(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

export async function expectPageQueryParams(
  page: Page,
  expected: Record<string, string>,
): Promise<void> {
  const url = new URL(page.url());
  for (const [key, value] of Object.entries(expected)) {
    expect(url.searchParams.get(key), `query param "${key}" on ${page.url()}`).toBe(value);
  }
}

export async function expectStoredPreservedParams(
  page: Page,
  expected: Record<string, string>,
): Promise<void> {
  await expect
    .poll(async () => {
      const raw = await page.evaluate(() => sessionStorage.getItem("pf:params"));
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as Record<string, string>;
    })
    .toMatchObject(expected);
}
