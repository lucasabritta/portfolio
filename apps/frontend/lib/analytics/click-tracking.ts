import { resolveClickEvent } from "./event-registry";
import { trackEvent } from "./track";

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

export function trackClickTarget(target: EventTarget | null, pathname: string): void {
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
  trackEvent(resolved.event, resolved.properties);
}
