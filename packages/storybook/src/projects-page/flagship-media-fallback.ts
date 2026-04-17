import type { SyntheticEvent } from "react";

/**
 * `<img onError>` handler used by `FlagshipMedia`: hides the broken image and
 * reveals the gradient placeholder that sits as the next sibling. The DOM
 * mutation keeps layout stable when a CDN or asset is missing; the stateful
 * work is kept out of the view component so the TSX stays declarative.
 */
export function hideImageShowFallback(event: SyntheticEvent<HTMLImageElement>): void {
  const img = event.currentTarget;
  img.style.display = "none";
  const fallback = img.nextElementSibling;
  if (fallback instanceof HTMLElement) {
    fallback.hidden = false;
  }
}
