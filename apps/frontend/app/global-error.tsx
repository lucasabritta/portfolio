"use client";

import { useEffect } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

import { GlobalErrorView, globalErrorBodyStyle } from "@portfolio/storybook/status-page";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Root error boundary caught", error);
    trackEvent(ANALYTICS_EVENTS.errorBoundaryShown, {
      context: "global",
      ...(error.digest ? { digest: error.digest } : {}),
    });
  }, [error]);

  return (
    <html lang="en">
      <body style={globalErrorBodyStyle}>
        <GlobalErrorView onReset={reset} />
      </body>
    </html>
  );
}
