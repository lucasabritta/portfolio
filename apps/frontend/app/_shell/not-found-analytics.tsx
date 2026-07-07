"use client";

import { useEffect } from "react";

import { shouldTrackNotFoundView } from "@/lib/analytics/analytics-shell-lifecycle";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { isAnalyticsEnabled } from "@/lib/analytics/posthog-client";
import { trackEvent } from "@/lib/analytics/track";

export function NotFoundAnalytics(): null {
  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    const pathname = window.location.pathname;
    if (shouldTrackNotFoundView(pathname)) {
      trackEvent(ANALYTICS_EVENTS.notFoundViewed, { pathname });
    }
  }, []);

  return null;
}
