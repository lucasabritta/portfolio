import { classifyLinkKind } from "./properties";

const STORAGE_KEY = "pf:params";

let memoryParams: Record<string, string> = {};

/** Only `utm_*` query keys are preserved across in-app navigation and analytics. */
export function isPreservedQueryParam(key: string): boolean {
  return key.startsWith("utm_");
}

function filterPreservedParams(params: Record<string, string>): Record<string, string> {
  const filtered: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (isPreservedQueryParam(key)) {
      filtered[key] = value;
    }
  }
  return filtered;
}

function paramsFromSearch(search: string): Record<string, string> {
  return filterPreservedParams(paramsFromSearchRaw(search));
}

function paramsFromSearchRaw(search: string): Record<string, string> {
  const params: Record<string, string> = {};
  const parsed = new URLSearchParams(search);
  parsed.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

function readStoredParams(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return filterPreservedParams({ ...memoryParams });
    }
    const stored = JSON.parse(raw) as Record<string, string>;
    return filterPreservedParams({ ...stored, ...memoryParams });
  } catch {
    return filterPreservedParams({ ...memoryParams });
  }
}

function writeStoredParams(params: Record<string, string>): void {
  const preserved = filterPreservedParams(params);
  memoryParams = { ...preserved };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(preserved));
  } catch {
    // sessionStorage unavailable — memory fallback only
  }
}

/** Persist `utm_*` query params for the tab session (entry + later landings). */
export function captureEntryParams(): void {
  if (typeof window === "undefined") {
    return;
  }

  const current = paramsFromSearch(window.location.search);
  if (Object.keys(current).length === 0) {
    return;
  }

  writeStoredParams({ ...readStoredParams(), ...current });
}

/** Union of session-persisted params and the current URL (current wins on overlap). */
export function getPreservedParams(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }

  const stored = readStoredParams();
  const current = paramsFromSearch(window.location.search);
  return { ...stored, ...current };
}

export function isInternalNavigationHref(
  href: string | null | undefined,
  origin: string = typeof window !== "undefined" ? window.location.origin : "http://localhost",
): boolean {
  if (!href) {
    return false;
  }

  const trimmed = href.trim();
  const kind = classifyLinkKind(trimmed);
  if (kind === "mailto" || kind === "tel") {
    return false;
  }
  if (trimmed.startsWith("//")) {
    return false;
  }

  try {
    const url = new URL(trimmed, origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }
    const base = new URL(origin);
    return url.origin === base.origin;
  } catch {
    return false;
  }
}

function formatInternalHref(url: URL): string {
  const search = url.searchParams.toString();
  const query = search ? `?${search}` : "";
  return `${url.pathname}${query}${url.hash}`;
}

function navigationBaseHref(
  baseHref: string = typeof window !== "undefined" ? window.location.href : "http://localhost/",
): { baseHref: string; origin: string } {
  try {
    return { baseHref, origin: new URL(baseHref).origin };
  } catch {
    const fallback = "http://localhost/";
    return { baseHref: fallback, origin: "http://localhost" };
  }
}

/** Merge preserved params into an internal href (destination keys win). */
export function withPreservedParams(
  href: string,
  preserved: Record<string, string> = getPreservedParams(),
  baseHref: string = typeof window !== "undefined" ? window.location.href : "http://localhost/",
): string {
  const { baseHref: resolvedBase, origin } = navigationBaseHref(baseHref);
  const filtered = filterPreservedParams(preserved);
  if (!isInternalNavigationHref(href, origin) || Object.keys(filtered).length === 0) {
    return href;
  }

  const url = new URL(href.trim(), resolvedBase);
  for (const [key, value] of Object.entries(filtered)) {
    if (!url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  }

  return formatInternalHref(url);
}

/**
 * Super properties for PostHog: preserved `utm_*` params plus `entry_query`.
 */
export function getAnalyticsQueryProperties(): Record<string, string> {
  const params = getPreservedParams();
  const entryQuery = new URLSearchParams(params).toString();
  return {
    ...params,
    ...(entryQuery ? { entry_query: entryQuery } : {}),
  };
}

export type NavigationClickContext = {
  anchor: Pick<HTMLAnchorElement, "getAttribute" | "target" | "hasAttribute">;
  event: Pick<
    MouseEvent,
    "metaKey" | "ctrlKey" | "shiftKey" | "altKey" | "button" | "defaultPrevented"
  >;
  locationHref?: string;
  preserved?: Record<string, string>;
};

/** Returns merged href when navigation should be intercepted, otherwise null. */
export function shouldInterceptNavigationClick(ctx: NavigationClickContext): string | null {
  const href = ctx.anchor.getAttribute("href");
  if (!href || ctx.event.defaultPrevented) {
    return null;
  }

  if (ctx.event.metaKey || ctx.event.ctrlKey || ctx.event.shiftKey || ctx.event.altKey) {
    return null;
  }
  if (ctx.event.button !== 0) {
    return null;
  }
  if (ctx.anchor.target === "_blank") {
    return null;
  }
  if (ctx.anchor.hasAttribute("download")) {
    return null;
  }

  const rel = ctx.anchor.getAttribute("rel") ?? "";
  if (/\bexternal\b/i.test(rel)) {
    return null;
  }

  const locationHref =
    ctx.locationHref ??
    (typeof window !== "undefined" ? window.location.href : "http://localhost/");
  const { origin } = navigationBaseHref(locationHref);

  if (!isInternalNavigationHref(href, origin)) {
    return null;
  }

  const preserved = ctx.preserved ?? getPreservedParams();
  if (Object.keys(preserved).length === 0) {
    return null;
  }

  const trimmedHref = href.trim();
  const resolved = new URL(trimmedHref, locationHref);
  const currentUrl = new URL(locationHref);
  const isFragmentOnly = trimmedHref.startsWith("#");
  const destinationHasQuery = !isFragmentOnly && trimmedHref.includes("?");

  if (
    resolved.origin === currentUrl.origin &&
    resolved.pathname === currentUrl.pathname &&
    !destinationHasQuery &&
    resolved.hash
  ) {
    return null;
  }

  const hrefWithParams = withPreservedParams(href, preserved, locationHref);
  if (hrefWithParams === href) {
    return null;
  }

  return hrefWithParams;
}

/**
 * When the current URL is missing session-preserved `utm_*` params, returns a merged
 * internal href suitable for `router.replace`. Otherwise returns null.
 */
export function syncPreservedParamsToCurrentUrl(
  locationHref: string = typeof window !== "undefined" ? window.location.href : "http://localhost/",
): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const preserved = getPreservedParams();
  if (Object.keys(preserved).length === 0) {
    return null;
  }

  const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const synced = withPreservedParams(currentHref, preserved, locationHref);
  return synced !== currentHref ? synced : null;
}

/** @internal Test-only reset of in-memory param store. */
export function resetPreservedParamsForTests(): void {
  memoryParams = {};
  if (typeof sessionStorage !== "undefined") {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
