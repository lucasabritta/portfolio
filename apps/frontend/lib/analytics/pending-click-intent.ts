import { ANALYTICS_EVENTS, type AnalyticsEventName } from "./events";
import type { AnalyticsProperties, AnalyticsPropertyValue } from "./properties";

export const PENDING_CLICK_INTENT_STORAGE_KEY = "pf:pending_click_intent";

const PENDING_CLICK_INTENT_MAX_AGE_MS = 5 * 60 * 1000;

const CLICK_EVENT_NAMES = new Set<AnalyticsEventName>([
  ANALYTICS_EVENTS.ctaClicked,
  ANALYTICS_EVENTS.navClicked,
  ANALYTICS_EVENTS.wordmarkClicked,
  ANALYTICS_EVENTS.footerLinkClicked,
  ANALYTICS_EVENTS.contactClicked,
  ANALYTICS_EVENTS.projectCardClicked,
  ANALYTICS_EVENTS.repoClicked,
  ANALYTICS_EVENTS.sectionFlowClicked,
  ANALYTICS_EVENTS.linkClicked,
  ANALYTICS_EVENTS.statusActionClicked,
]);

export type PendingClickIntent = {
  event: AnalyticsEventName;
  properties: AnalyticsProperties;
  created_at: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAnalyticsPropertyValue(value: unknown): value is AnalyticsPropertyValue {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

function normalizeProperties(value: unknown): AnalyticsProperties | null {
  if (!isRecord(value)) {
    return null;
  }

  const properties: AnalyticsProperties = {};
  for (const [key, propertyValue] of Object.entries(value)) {
    if (!isAnalyticsPropertyValue(propertyValue)) {
      return null;
    }
    properties[key] = propertyValue;
  }
  return properties;
}

function parsePendingClickIntent(raw: string, now: number): PendingClickIntent | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!isRecord(parsed)) {
    return null;
  }

  const { event, properties, created_at: createdAt } = parsed;
  if (typeof event !== "string" || !CLICK_EVENT_NAMES.has(event as AnalyticsEventName)) {
    return null;
  }
  if (typeof createdAt !== "number" || now - createdAt > PENDING_CLICK_INTENT_MAX_AGE_MS) {
    return null;
  }

  const normalized = normalizeProperties(properties);
  if (!normalized) {
    return null;
  }

  return {
    event: event as AnalyticsEventName,
    properties: normalized,
    created_at: createdAt,
  };
}

export function consumePendingClickIntent(now: number = Date.now()): PendingClickIntent | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(PENDING_CLICK_INTENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    sessionStorage.removeItem(PENDING_CLICK_INTENT_STORAGE_KEY);
    return parsePendingClickIntent(raw, now);
  } catch {
    return null;
  }
}
