"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { trackClickTarget } from "@/lib/analytics/click-tracking";
import { handleCapturedNavigationClick } from "@/lib/analytics/navigation-click";
import { initPostHog, isAnalyticsEnabled } from "@/lib/analytics/posthog-client";

/**
 * Eager capture-phase click listener mounted outside Suspense so fast post-landing
 * clicks still record analytics and preserve UTMs before useSearchParams resolves.
 */
export function AnalyticsClickCapture(): ReactNode {
  const router = useRouter();

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    initPostHog();

    const listener = (event: MouseEvent) => {
      handleCapturedNavigationClick(
        event,
        {
          track: trackClickTarget,
          push: (href) => router.push(href),
        },
        window.location.pathname,
      );
    };

    document.addEventListener("click", listener, true);
    return () => document.removeEventListener("click", listener, true);
  }, [router]);

  return null;
}
