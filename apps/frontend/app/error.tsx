"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";

import { decorateStatusPageActions } from "@/app/_shell/decorate-status-actions";
import { shouldTrackErrorBoundary } from "@/lib/analytics/analytics-shell-lifecycle";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { isAnalyticsEnabled } from "@/lib/analytics/posthog-client";
import { trackEvent } from "@/lib/analytics/track";
import { usePreservedHrefDecorator } from "@/lib/analytics/use-preserve-internal-href";

import { StatusPageView } from "@portfolio/storybook/status-page";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const preserveHref = usePreservedHrefDecorator();
  const actions = useMemo(
    () =>
      decorateStatusPageActions(
        [
          { kind: "button", label: "Try again", onClick: reset },
          { kind: "link", label: "Back to home", href: "/" },
        ],
        preserveHref,
      ),
    [preserveHref, reset],
  );

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    console.error("App segment error boundary caught", error);
    if (shouldTrackErrorBoundary("segment", error.digest)) {
      trackEvent(ANALYTICS_EVENTS.errorBoundaryShown, {
        context: "segment",
        ...(error.digest ? { digest: error.digest } : {}),
      });
    }
  }, [error]);

  return (
    <StatusPageView
      heading="Something went wrong"
      body="An unexpected error interrupted this page. Try again, or return home."
      actions={actions}
      linkComponent={Link}
    />
  );
}
