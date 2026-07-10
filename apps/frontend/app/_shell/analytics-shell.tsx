"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";

import { preparePageViewTracking } from "@/lib/analytics/analytics-shell-lifecycle";
import { rotateClientPageInstanceId } from "@/lib/analytics/client-context";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import {
  initPostHog,
  isAnalyticsEnabled,
  registerAnalyticsQueryProperties,
} from "@/lib/analytics/posthog-client";
import { consumePendingClickIntent } from "@/lib/analytics/pending-click-intent";
import { captureEntryParams, syncPreservedParamsToCurrentUrl } from "@/lib/analytics/query-params";
import { trackEvent } from "@/lib/analytics/track";

function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function AnalyticsShellEffects(): null {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const router = useRouter();
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    initPostHog();
    captureEntryParams();
    if (previousPathnameRef.current !== null && previousPathnameRef.current !== pathname) {
      rotateClientPageInstanceId();
    }
    previousPathnameRef.current = pathname;
    registerAnalyticsQueryProperties();
    const pendingClickIntent = consumePendingClickIntent();
    if (pendingClickIntent) {
      trackEvent(pendingClickIntent.event, pendingClickIntent.properties);
    }
    const synced = syncPreservedParamsToCurrentUrl();
    if (synced) {
      router.replace(synced, { scroll: false });
    }
  }, [pathname, router]);

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
      const { shouldTrack, payload } = preparePageViewTracking(pathname);
      if (shouldTrack) {
        trackEvent(ANALYTICS_EVENTS.pageViewed, payload);
      }
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

/**
 * Suspense-gated analytics shell: PostHog init registration, UTM URL sync, and pageviews.
 * Document click capture lives in `AnalyticsClickCapture` (outside Suspense) for fast clicks.
 */
export function AnalyticsShell(): ReactNode {
  const isClient = useIsClient();

  if (!isClient || !isAnalyticsEnabled()) {
    return null;
  }

  return <AnalyticsShellEffects />;
}
