import { ANALYTICS_EVENTS } from "./events";
import {
  beginNavigationImpressionEpoch,
  createImpressionDedupeKey,
  shouldEmitImpression,
} from "./impression-dedupe";
import { routeNameFromPathname } from "./properties";

export type PageViewPayload = {
  pathname: string;
  route_name: string;
  hash?: string;
};

export function buildPageViewPayload(pathname: string, hash: string): PageViewPayload {
  return {
    pathname,
    route_name: routeNameFromPathname(pathname),
    ...(hash ? { hash } : {}),
  };
}

export function pageViewDedupeKey(pathname: string, hash: string): string {
  return createImpressionDedupeKey(ANALYTICS_EVENTS.pageViewed, { pathname, hash });
}

export function notFoundDedupeKey(pathname: string): string {
  return createImpressionDedupeKey(ANALYTICS_EVENTS.notFoundViewed, { pathname });
}

export function errorBoundaryDedupeKey(context: string, digest?: string): string {
  return createImpressionDedupeKey(ANALYTICS_EVENTS.errorBoundaryShown, {
    context,
    digest,
  });
}

export function preparePageViewTracking(pathname: string): {
  dedupeKey: string;
  payload: PageViewPayload;
  shouldTrack: boolean;
} {
  beginNavigationImpressionEpoch(pathname);
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const payload = buildPageViewPayload(pathname, hash);
  const dedupeKey = pageViewDedupeKey(pathname, hash);
  return {
    dedupeKey,
    payload,
    shouldTrack: shouldEmitImpression(dedupeKey),
  };
}

export function shouldTrackNotFoundView(pathname: string): boolean {
  return shouldEmitImpression(notFoundDedupeKey(pathname));
}

export function shouldTrackErrorBoundary(context: string, digest?: string): boolean {
  return shouldEmitImpression(errorBoundaryDedupeKey(context, digest));
}
