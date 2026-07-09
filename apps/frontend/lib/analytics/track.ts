import type { AnalyticsEventName } from "./events";
import { getClientAnalyticsContext } from "./client-context";
import { createImpressionDedupeKey, shouldEmitImpression } from "./impression-dedupe";
import type { AnalyticsProperties } from "./properties";
import { getPostHog, initPostHog } from "./posthog-client";
import { getAnalyticsQueryProperties } from "./query-params";
import { sanitizeAnalyticsProperties } from "./sanitize-properties";

function isProtectedAttributionKey(key: string): boolean {
  return key === "entry_query" || key.startsWith("utm_");
}

function stripAttributionOverrides(
  properties: AnalyticsProperties | undefined,
): AnalyticsProperties | undefined {
  if (!properties) {
    return undefined;
  }

  const stripped: AnalyticsProperties = {};
  for (const [key, value] of Object.entries(properties)) {
    if (!isProtectedAttributionKey(key)) {
      stripped[key] = value;
    }
  }

  return Object.keys(stripped).length > 0 ? stripped : undefined;
}

export function trackEvent(event: AnalyticsEventName, properties?: AnalyticsProperties): void {
  if (typeof window === "undefined") {
    return;
  }

  const client = getPostHog() ?? initPostHog();
  if (!client) {
    return;
  }

  const queryProperties = getAnalyticsQueryProperties();
  const clientContext = getClientAnalyticsContext();
  const sanitized = properties ? sanitizeAnalyticsProperties(properties) : undefined;
  const eventProperties = stripAttributionOverrides(sanitized);
  client.capture(event, { ...queryProperties, ...clientContext, ...eventProperties });
}

/** Tracks an impression-style event once per navigation epoch (page views, 404, errors). */
export function trackImpression(
  event: AnalyticsEventName,
  dedupeParts: Record<string, string | undefined>,
  properties?: AnalyticsProperties,
): void {
  const dedupeKey = createImpressionDedupeKey(event, dedupeParts);
  if (!shouldEmitImpression(dedupeKey)) {
    return;
  }
  trackEvent(event, properties);
}
