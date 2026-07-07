"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { routeNameFromPathname } from "@/lib/analytics/properties";
import {
  initPostHog,
  isAnalyticsEnabled,
  registerAnalyticsQueryProperties,
} from "@/lib/analytics/posthog-client";
import { trackEvent } from "@/lib/analytics/track";

function PageViewTracker(): null {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    registerAnalyticsQueryProperties();
  }, [searchParams]);

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
  }, [pathname]);

  return null;
}

function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function AnalyticsProvider(): ReactNode {
  const isClient = useIsClient();

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    initPostHog();
  }, []);

  if (!isClient || !isAnalyticsEnabled()) {
    return null;
  }

  return <PageViewTracker />;
}
