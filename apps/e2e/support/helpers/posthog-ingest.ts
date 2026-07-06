import { expect, type Page } from "@playwright/test";

/** Fake project key — must look like a real `phc_*` token so posthog-js initializes in the client bundle. */
export const E2E_POSTHOG_KEY = "phc_e2e012345678901234567890123456789012345";

export type IngestPost = {
  url: string;
  json: unknown;
};

export type PostHogCapturedEvent = {
  event: string;
  properties: Record<string, unknown>;
};

export type IngestCaptureState = {
  posts: IngestPost[];
};

function decodeIngestDataField(data: string): unknown {
  try {
    return JSON.parse(Buffer.from(data, "base64").toString("utf8")) as unknown;
  } catch {
    try {
      return JSON.parse(data) as unknown;
    } catch {
      return null;
    }
  }
}

function flattenIngestPayload(body: unknown): Record<string, unknown>[] {
  if (!body) {
    return [];
  }

  if (Array.isArray(body)) {
    return body.flatMap((item) => flattenIngestPayload(item));
  }

  if (typeof body !== "object") {
    return [];
  }

  const record = body as Record<string, unknown>;

  if (typeof record.data === "string") {
    const decoded = decodeIngestDataField(record.data);
    return decoded ? flattenIngestPayload(decoded) : [];
  }

  if (Array.isArray(record.batch)) {
    return record.batch.flatMap((item) => flattenIngestPayload(item));
  }

  if (typeof record.event === "string") {
    return [record];
  }

  return [];
}

function mergeEventProperties(properties: Record<string, unknown>): Record<string, unknown> {
  const set = properties.$set;
  if (set && typeof set === "object" && !Array.isArray(set)) {
    return { ...(set as Record<string, unknown>), ...properties };
  }
  return properties;
}

export function parsePostHogEvents(body: unknown): PostHogCapturedEvent[] {
  const events: PostHogCapturedEvent[] = [];

  for (const entry of flattenIngestPayload(body)) {
    if (typeof entry.event !== "string") {
      continue;
    }
    const properties =
      entry.properties && typeof entry.properties === "object"
        ? mergeEventProperties(entry.properties as Record<string, unknown>)
        : {};
    events.push({ event: entry.event, properties });
  }

  return events;
}

function parseIngestRequestBody(postData: string | null): unknown {
  if (!postData) {
    return null;
  }

  try {
    return JSON.parse(postData) as unknown;
  } catch {
    const params = new URLSearchParams(postData);
    const data = params.get("data");
    if (data) {
      return decodeIngestDataField(data);
    }
  }

  return null;
}

export function findPostHogEvent(
  state: IngestCaptureState,
  eventName: string,
  predicate?: (properties: Record<string, unknown>) => boolean,
): PostHogCapturedEvent | null {
  let lastMatch: PostHogCapturedEvent | null = null;
  for (const post of state.posts) {
    for (const captured of parsePostHogEvents(post.json)) {
      if (captured.event !== eventName) {
        continue;
      }
      if (predicate && !predicate(captured.properties)) {
        continue;
      }
      lastMatch = captured;
    }
  }
  return lastMatch;
}

export function countPostHogEvents(
  state: IngestCaptureState,
  eventName: string,
  predicate?: (properties: Record<string, unknown>) => boolean,
): number {
  let count = 0;
  for (const post of state.posts) {
    for (const captured of parsePostHogEvents(post.json)) {
      if (captured.event !== eventName) {
        continue;
      }
      if (predicate && !predicate(captured.properties)) {
        continue;
      }
      count += 1;
    }
  }
  return count;
}

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
    Object.defineProperty(navigator, "globalPrivacyControl", { get: () => false, configurable: true });
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
    .poll(() => state.posts.some((post) => isPostHogCaptureIngestUrl(post.url)), { timeout: 15_000 })
    .toBe(true);
}

export async function expectPostHogEvent(
  state: IngestCaptureState,
  eventName: string,
  assertProperties?: Record<string, string>,
): Promise<PostHogCapturedEvent> {
  await expect.poll(() => findPostHogEvent(state, eventName), { timeout: 15_000 }).not.toBeNull();

  const captured = findPostHogEvent(state, eventName);
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
