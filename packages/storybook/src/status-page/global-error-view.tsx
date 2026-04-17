import type { CSSProperties } from "react";

/**
 * Inline styles for the `<body>` of Next.js `global-error.tsx`. Kept inline so
 * the last-resort boundary can render even when the root stylesheet failed to
 * load. Consumers apply this to `<body style={globalErrorBodyStyle}>`.
 */
export const globalErrorBodyStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1.5rem",
  fontFamily: "system-ui, sans-serif",
  color: "#1a202c",
  background: "#ffffff",
};

const CARD_STYLE: CSSProperties = {
  maxWidth: "32rem",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
};

const HEADING_STYLE: CSSProperties = {
  fontSize: "1.75rem",
  margin: 0,
};

const BODY_STYLE: CSSProperties = {
  margin: 0,
};

const BUTTON_STYLE: CSSProperties = {
  alignSelf: "center",
  padding: "0.55rem 1.1rem",
  borderRadius: "0.5rem",
  border: "1px solid currentColor",
  background: "transparent",
  color: "inherit",
  fontWeight: 600,
  cursor: "pointer",
};

const FOCUS_CLASS = "portfolio-global-error-button";

const FOCUS_RING_STYLES = `
  .${FOCUS_CLASS}:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

export type GlobalErrorViewProps = {
  /** Retry handler from Next.js `global-error.tsx` (`reset`). */
  onReset: () => void;
  heading?: string;
  body?: string;
  actionLabel?: string;
};

export function GlobalErrorView({
  onReset,
  heading = "Portfolio is temporarily unavailable",
  body = "An unexpected error interrupted the page. Please try again in a moment.",
  actionLabel = "Try again",
}: GlobalErrorViewProps) {
  return (
    <>
      <style>{FOCUS_RING_STYLES}</style>
      <main style={CARD_STYLE}>
        <h1 style={HEADING_STYLE}>{heading}</h1>
        <p style={BODY_STYLE}>{body}</p>
        <button type="button" onClick={onReset} style={BUTTON_STYLE} className={FOCUS_CLASS}>
          {actionLabel}
        </button>
      </main>
    </>
  );
}
