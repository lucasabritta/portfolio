import type { AnalyticsEventName } from "./events";
import type { AnalyticsProperties } from "./properties";
import { getPostHog, initPostHog } from "./posthog-client";
import { getAnalyticsQueryProperties } from "./query-params";

export function trackEvent(
  event: AnalyticsEventName | string,
  properties?: AnalyticsProperties,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const client = getPostHog() ?? initPostHog();
  if (!client) {
    return;
  }

  const queryProperties = getAnalyticsQueryProperties();
  client.capture(event, { ...queryProperties, ...properties });
}
