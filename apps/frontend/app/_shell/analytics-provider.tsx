"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { routeNameFromPathname } from "@/lib/analytics/properties";
import {
  initPostHog,
  isAnalyticsEnabled,
  registerAnalyticsQueryProperties,
} from "@/lib/analytics/posthog-client";
import { trackClickTarget } from "@/lib/analytics/click-tracking";
import { trackEvent } from "@/lib/analytics/track";

function PageViewTracker(): null {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    const trackPageView = () => {
      registerAnalyticsQueryProperties();
      const hash = window.location.hash;
      trackEvent(ANALYTICS_EVENTS.pageViewed, {
        pathname,
        route_name: routeNameFromPathname(pathname),
        ...(hash ? { hash } : {}),
      });
    };

    trackPageView();
    window.addEventListener("hashchange", trackPageView);
    window.addEventListener("popstate", registerAnalyticsQueryProperties);
    return () => {
      window.removeEventListener("hashchange", trackPageView);
      window.removeEventListener("popstate", registerAnalyticsQueryProperties);
    };
  }, [pathname, searchParams]);

  return null;
}

function handleDocumentClick(event: MouseEvent): void {
  if (!isAnalyticsEnabled()) {
    return;
  }

  trackClickTarget(event.target, window.location.pathname);
}

export function AnalyticsProvider(): ReactNode {
  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    initPostHog();
    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  if (!isAnalyticsEnabled()) {
    return null;
  }

  return <PageViewTracker />;
}
