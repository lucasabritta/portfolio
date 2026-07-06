import type { SiteThemePreference } from "@portfolio/storybook/site-chrome";

/** True when the theme preference value actually changes (eligible for analytics). */
export function shouldTrackThemePreferenceChange(
  current: SiteThemePreference,
  next: SiteThemePreference,
): boolean {
  return next !== current;
}

/** Applies theme preference always; tracks analytics only when the value changes. */
export function handleThemePreferenceChange(
  current: SiteThemePreference,
  next: SiteThemePreference,
  handlers: {
    apply: (next: SiteThemePreference) => void;
    track: (next: SiteThemePreference) => void;
  },
): void {
  handlers.apply(next);
  if (shouldTrackThemePreferenceChange(current, next)) {
    handlers.track(next);
  }
}
