"use client";

import { useEffect } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

export function NotFoundAnalytics(): null {
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.notFoundViewed, {
      pathname: window.location.pathname,
    });
  }, []);

  return null;
}
