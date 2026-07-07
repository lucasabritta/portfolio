"use client";

import { useCallback, useSyncExternalStore } from "react";

import { preserveInternalHref } from "./query-params";

function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * Returns a href decorator that keeps SSR/first paint hrefs stable, then merges
 * session `utm_*` params after mount.
 */
export function usePreservedHrefDecorator(): (href: string) => string {
  const isClient = useIsClient();

  return useCallback((href: string) => (isClient ? preserveInternalHref(href) : href), [isClient]);
}
