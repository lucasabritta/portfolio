export type PostHogCapturedEvent = {
  event: string;
  properties: Record<string, unknown>;
};

export type PostHogIngestPosts = {
  posts: Array<{ json: unknown }>;
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

/** Parses PostHog `/ingest` request bodies captured during e2e runs. */
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

export function findPostHogEvent(
  state: PostHogIngestPosts,
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
  state: PostHogIngestPosts,
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

export function parseIngestRequestBody(postData: string | null): unknown {
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
