"use client";

import { useEffect } from "react";
import Link from "next/link";

import { StatusPageView } from "@portfolio/storybook";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("App segment error boundary caught", error);
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
