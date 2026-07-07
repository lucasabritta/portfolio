import { expect, type Page } from "@playwright/test";

import {
  countPostHogEvents,
  findPostHogEvent,
  parseIngestRequestBody,
  parsePostHogEvents,
  type PostHogCapturedEvent,
} from "../../../frontend/lib/analytics/posthog-ingest-parse";

/** Fake project key — must look like a real `phc_*` token so posthog-js initializes in the client bundle. */
export const E2E_POSTHOG_KEY = "phc_e2e012345678901234567890123456789012345";

export type IngestPost = {
  url: string;
  json: unknown;
};

export type IngestCaptureState = {
  posts: IngestPost[];
};

export type { PostHogCapturedEvent };

export { countPostHogEvents, findPostHogEvent, parsePostHogEvents };

function isPostHogCaptureIngestUrl(url: string): boolean {
  const { pathname } = new URL(url);
  if (pathname.startsWith("/ingest/static") || pathname === "/ingest/decide") {
    return false;
  }
  return /\/ingest\/(e|batch|i\/v0\/e)(\/|$)/i.test(pathname);
}

function recordIngestPost(state: IngestCaptureState, url: string, postData: string | null): void {
  if (!isPostHogCaptureIngestUrl(url)) {
    return;
  }
  state.posts.push({
    url,
    json: parseIngestRequestBody(postData),
  });
}

/** Disable DNT and record capture POST bodies without blocking the SDK. */
export async function installPostHogIngestCapture(page: Page): Promise<IngestCaptureState> {
  const state: IngestCaptureState = { posts: [] };

  await page.context().addInitScript((key: string) => {
    window.__PF_POSTHOG_KEY__ = key;
    Object.defineProperty(navigator, "doNotTrack", { get: () => null, configurable: true });
    Object.defineProperty(navigator, "msDoNotTrack", { get: () => null, configurable: true });
    Object.defineProperty(window, "doNotTrack", { get: () => null, configurable: true });
    Object.defineProperty(navigator, "globalPrivacyControl", {
      get: () => false,
      configurable: true,
    });
  }, E2E_POSTHOG_KEY);

  await page.context().route(/\/ingest\/decide/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        config: {
          enable_collect_everything: true,
          cookielessMode: "always",
        },
        supportedCompression: ["gzip-js"],
      }),
    });
  });

  await page.context().route(/\/ingest\//, async (route) => {
    const request = route.request();
    if (request.method() === "POST") {
      recordIngestPost(state, request.url(), request.postData());
    }
    await route.continue();
  });

  return state;
}

export async function expectPostHogIngestPost(state: IngestCaptureState): Promise<void> {
  await expect
    .poll(() => state.posts.some((post) => isPostHogCaptureIngestUrl(post.url)), {
      timeout: 15_000,
    })
    .toBe(true);
}

export async function expectPostHogEvent(
  state: IngestCaptureState,
  eventName: string,
  assertProperties?: Record<string, string>,
  predicate?: (properties: Record<string, unknown>) => boolean,
): Promise<PostHogCapturedEvent> {
  await expect
    .poll(() => findPostHogEvent(state, eventName, predicate), { timeout: 15_000 })
    .not.toBeNull();

  const captured = findPostHogEvent(state, eventName, predicate);
  if (!captured) {
    const seen = state.posts.flatMap((post) =>
      parsePostHogEvents(post.json).map((item) => item.event),
    );
    throw new Error(
      `Expected PostHog event "${eventName}" in ingest payloads; saw ${seen.length ? seen.join(", ") : "no parsed events"} (${state.posts.length} POSTs)`,
    );
  }

  if (assertProperties) {
    for (const [key, value] of Object.entries(assertProperties)) {
      expect(captured.properties[key], `property "${key}" on ${eventName}`).toBe(value);
    }
  }

  return captured;
}
