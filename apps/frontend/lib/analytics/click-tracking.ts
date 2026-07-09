import { resolveClickEvent } from "./event-registry";
import { trackEvent } from "./track";

export type ClickTrackingOptions = {
  openTarget?: "new_tab";
};

function getHrefFromElement(el: Element): string | null {
  if (el instanceof HTMLAnchorElement) {
    return el.getAttribute("href");
  }
  if (el instanceof HTMLButtonElement) {
    return null;
  }
  const anchor = el.closest("a");
  return anchor?.getAttribute("href") ?? null;
}

export function trackClickTarget(
  target: EventTarget | null,
  pathname: string,
  options?: ClickTrackingOptions,
): void {
  if (!(target instanceof Element)) {
    return;
  }

  const clickable = target.closest("a, button");
  if (!clickable) {
    return;
  }

  if (clickable.closest('[role="group"][aria-label="Theme"]')) {
    return;
  }

  const href = getHrefFromElement(clickable);
  const resolved = resolveClickEvent({ element: clickable, pathname, href });
  const properties = { ...resolved.properties };
  if (options?.openTarget) {
    properties.open_target = options.openTarget;
  }
  trackEvent(resolved.event, properties);
}
