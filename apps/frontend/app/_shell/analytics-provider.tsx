"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { routeNameFromPathname } from "@/lib/analytics/properties";
import { initPostHog, isAnalyticsEnabled } from "@/lib/analytics/posthog-client";
import { trackClickTarget } from "@/lib/analytics/click-tracking";
import { trackEvent } from "@/lib/analytics/track";

function PageViewTracker(): null {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    const syncHash = () => {
      const hash = window.location.hash;
      trackEvent(ANALYTICS_EVENTS.pageViewed, {
        pathname,
        route_name: routeNameFromPathname(pathname),
        ...(hash ? { hash } : {}),
      });
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

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
