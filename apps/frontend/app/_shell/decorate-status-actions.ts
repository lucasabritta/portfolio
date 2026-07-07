import type { StatusPageAction } from "@portfolio/storybook/status-page";

/** Merges session UTMs into internal status-page link hrefs after hydration. */
export function decorateStatusPageActions(
  actions: StatusPageAction[],
  preserveHref: (href: string) => string,
): StatusPageAction[] {
  return actions.map((action) =>
    action.kind === "link" && !action.external
      ? { ...action, href: preserveHref(action.href) }
      : action,
  );
}
