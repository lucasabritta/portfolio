"use client";

import { useEffect } from "react";

import { GlobalErrorView, globalErrorBodyStyle } from "@portfolio/storybook";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Root error boundary caught", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={globalErrorBodyStyle}>
        <GlobalErrorView onReset={reset} />
      </body>
    </html>
  );
}
