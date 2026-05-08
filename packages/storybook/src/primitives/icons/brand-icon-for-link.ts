import type { BrandIconName } from "./brand-icon-types";

export type BrandIconLinkInput = {
  href: string;
  label?: string;
};

/**
 * Maps outbound résumé/marketing links to a brand icon when unambiguous.
 * Prefer `href` hostnames; falls back to `label` keywords for relative links
 * (e.g. “View on GitHub”) or mailto-adjacent marketing copy.
 */
export function brandIconForLink({ href, label }: BrandIconLinkInput): BrandIconName | undefined {
  const trimmed = href.trim();
  const labelLower = (label ?? "").toLowerCase();

  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();
    if (host === "github.com" || host.endsWith(".github.com")) {
      return "github";
    }
    if (host === "linkedin.com" || host.endsWith(".linkedin.com")) {
      return "linkedin";
    }
    if (host === "medium.com" || host.endsWith(".medium.com")) {
      return "medium";
    }
    if (host === "play.google.com" || host.endsWith(".play.google.com")) {
      return "googlePlay";
    }
  } catch {
    // Relative or invalid URL — try label heuristics only.
  }

  if (/\bgithub\b/i.test(labelLower)) {
    return "github";
  }
  if (/\blinkedin\b/i.test(labelLower)) {
    return "linkedin";
  }
  if (/\bmedium\b/i.test(labelLower)) {
    return "medium";
  }
  if (/\bgoogle\s*play\b/i.test(labelLower)) {
    return "googlePlay";
  }

  return undefined;
}
