import type { AnalyticsProperties } from "./properties";
import { classifyLinkKind } from "./properties";

const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeStringValue(key: string, value: string): string {
  const kind = classifyLinkKind(value);
  if (kind === "mailto" || kind === "tel") {
    return kind;
  }
  if ((key === "target" || key === "label") && EMAIL_LIKE.test(value)) {
    return "email";
  }
  if (value.startsWith("mailto:") || value.startsWith("tel:")) {
    return classifyLinkKind(value);
  }
  return value;
}

/** Redacts contact-info-shaped property values before capture. */
export function sanitizeAnalyticsProperties(
  properties: AnalyticsProperties,
): AnalyticsProperties {
  const sanitized: AnalyticsProperties = {};
  for (const [key, value] of Object.entries(properties)) {
    sanitized[key] =
      typeof value === "string" ? sanitizeStringValue(key, value) : value;
  }
  return sanitized;
}
