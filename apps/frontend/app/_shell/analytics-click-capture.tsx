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

    const handlers = {
      track: trackClickTarget,
      push: (href: string) => router.push(href),
    };

    const onPointerActivation = (event: MouseEvent) => {
      handleCapturedNavigationClick(event, handlers, window.location.pathname);
    };

    document.addEventListener("click", onPointerActivation, true);
    document.addEventListener("auxclick", onPointerActivation, true);
    return () => {
      document.removeEventListener("click", onPointerActivation, true);
      document.removeEventListener("auxclick", onPointerActivation, true);
    };
  }, [router]);

  return null;
}
