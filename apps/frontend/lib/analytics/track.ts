import type { AnalyticsEventName } from "./events";
import type { AnalyticsProperties } from "./properties";
import { getPostHog, initPostHog } from "./posthog-client";

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

  client.capture(event, properties);
}
