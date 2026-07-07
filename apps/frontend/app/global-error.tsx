"use client";

import { useEffect } from "react";

import { shouldTrackErrorBoundary } from "@/lib/analytics/analytics-shell-lifecycle";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { isAnalyticsEnabled } from "@/lib/analytics/posthog-client";
import { trackEvent } from "@/lib/analytics/track";

import { GlobalErrorView, globalErrorBodyStyle } from "@portfolio/storybook/status-page";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    console.error("Root error boundary caught", error);
    if (shouldTrackErrorBoundary("global", error.digest)) {
      trackEvent(ANALYTICS_EVENTS.errorBoundaryShown, {
        context: "global",
        ...(error.digest ? { digest: error.digest } : {}),
      });
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={globalErrorBodyStyle}>
        <GlobalErrorView onReset={reset} />
      </body>
    </html>
  );
}
