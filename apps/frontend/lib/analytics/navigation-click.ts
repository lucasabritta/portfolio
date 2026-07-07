import { trackClickTarget } from "./click-tracking";
import { shouldInterceptNavigationClick } from "./query-params";

export type NavigationClickHandlers = {
  track: typeof trackClickTarget;
  push: (href: string) => void;
};

/** Capture-phase click handler: analytics first, then optional UTM-preserving navigation. */
export function handleCapturedNavigationClick(
  event: MouseEvent,
  handlers: NavigationClickHandlers,
  pathname: string,
): void {
  if (!(event.target instanceof Element)) {
    return;
  }

  handlers.track(event.target, pathname);

  const anchor = event.target.closest("a");
  if (!anchor) {
    return;
  }

  const hrefWithParams = shouldInterceptNavigationClick({ anchor, event });
  if (!hrefWithParams) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  handlers.push(hrefWithParams);
}
