"use client";

import { useEffect } from "react";
import Link from "next/link";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

import { StatusPageView } from "@portfolio/storybook/status-page";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("App segment error boundary caught", error);
    trackEvent(ANALYTICS_EVENTS.errorBoundaryShown, {
      ...(error.digest ? { digest: error.digest } : {}),
    });
  }, [error]);

  return (
    <StatusPageView
      heading="Something went wrong"
      body="An unexpected error interrupted this page. Try again, or return home."
      actions={[
        { kind: "button", label: "Try again", onClick: reset },
        { kind: "link", label: "Back to home", href: "/" },
      ]}
      linkComponent={Link}
    />
  );
}
