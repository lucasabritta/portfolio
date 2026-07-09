import type { ClickTrackingOptions } from "./click-tracking";
import { shouldInterceptNavigationClick } from "./query-params";

export type NavigationClickHandlers = {
  track: (
    target: EventTarget | null,
    pathname: string,
    options?: ClickTrackingOptions,
  ) => void;
  push: (href: string) => void;
};

function resolveOpenTarget(event: MouseEvent): ClickTrackingOptions | undefined {
  if (
    event.type === "auxclick" ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey
  ) {
    return { openTarget: "new_tab" };
  }
  return undefined;
}

/** Capture-phase click handler: analytics first, then optional UTM-preserving navigation. */
export function handleCapturedNavigationClick(
  event: MouseEvent,
  handlers: NavigationClickHandlers,
  pathname: string,
): void {
  if (!(event.target instanceof Element)) {
    return;
  }

  // Middle-button auxclick only — right-click and other auxiliary buttons are not trackable.
  if (event.type === "auxclick" && event.button !== 1) {
    return;
  }

  const openTarget = resolveOpenTarget(event);
  if (openTarget) {
    handlers.track(event.target, pathname, openTarget);
  } else {
    handlers.track(event.target, pathname);
  }

  if (event.type === "auxclick") {
    return;
  }

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
