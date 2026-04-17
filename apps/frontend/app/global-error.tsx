"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ROOT_STYLE = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1.5rem",
  fontFamily: "system-ui, sans-serif",
  color: "#1a202c",
  background: "#ffffff",
} as const;

const CARD_STYLE = {
  maxWidth: "32rem",
  textAlign: "center" as const,
  display: "flex",
  flexDirection: "column" as const,
  gap: "0.75rem",
};

const BUTTON_STYLE = {
  alignSelf: "center" as const,
  padding: "0.55rem 1.1rem",
  borderRadius: "0.5rem",
  border: "1px solid currentColor",
  background: "transparent",
  color: "inherit",
  fontWeight: 600,
  cursor: "pointer",
};

// Inlined `:focus-visible` ring so the last-resort boundary keeps a visible
// focus cue even when the root layout (and its CSS modules) failed to load.
const FOCUS_RING_STYLES = `
  .cursor-global-error-button:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Root error boundary caught", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={ROOT_STYLE}>
        <style>{FOCUS_RING_STYLES}</style>
        <main role="main" style={CARD_STYLE}>
          <h1 style={{ fontSize: "1.75rem", margin: 0 }}>Portfolio is temporarily unavailable</h1>
          <p style={{ margin: 0 }}>
            An unexpected error interrupted the page. Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={BUTTON_STYLE}
            className="cursor-global-error-button"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
