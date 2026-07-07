import type { AnalyticsEventName } from "./events";

/** Dedupes impression-style events within a navigation epoch (Strict Mode / remount safe). */
let navigationEpoch = 0;
let lastPathnameForEpoch = "";
const emittedByEpoch = new Map<string, number>();

/**
 * Call when the pathname changes so revisiting a route emits a fresh impression.
 * No-ops when the pathname is unchanged (e.g. React Strict Mode effect re-run).
 */
export function beginNavigationImpressionEpoch(pathname: string): void {
  if (pathname === lastPathnameForEpoch) {
    return;
  }
  lastPathnameForEpoch = pathname;
  navigationEpoch += 1;
}

export function createImpressionDedupeKey(
  event: AnalyticsEventName,
  parts: Record<string, string | undefined>,
): string {
  const normalized = Object.entries(parts)
    .filter(([, value]) => value !== undefined && value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `${event}:${normalized}`;
}

export function shouldEmitImpression(dedupeKey: string): boolean {
  const lastEpoch = emittedByEpoch.get(dedupeKey);
  if (lastEpoch === navigationEpoch) {
    return false;
  }
  emittedByEpoch.set(dedupeKey, navigationEpoch);
  return true;
}

/** @internal Test-only reset. */
export function resetImpressionDedupeForTests(): void {
  navigationEpoch = 0;
  lastPathnameForEpoch = "";
  emittedByEpoch.clear();
}
