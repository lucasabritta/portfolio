/**
 * Returns `true` when the site header nav item for `href` should render
 * `aria-current="page"` given the consumer's current pathname.
 *
 * Co-located with `site-header.tsx` so the view component stays declarative
 * and the matching rules stay unit-testable without rendering DOM.
 *
 * Rules:
 * - In-app hash routes (e.g. `/#resume`) never match from `pathname` alone
 *   because `usePathname()` does not include the fragment.
 * - Root (`/`) only matches exact `/`.
 * - Internal paths match exact or as a path prefix (with `/` boundary).
 * - External/absolute URLs never match.
 */
export function pathMatchesNav(currentPath: string, href: string): boolean {
  if (href.startsWith("/#")) {
    return false;
  }
  if (href === "/") {
    return currentPath === "/";
  }
  if (href.startsWith("/") && !href.startsWith("//")) {
    const path = href.split("#")[0] ?? href;
    return currentPath === path || currentPath.startsWith(`${path}/`);
  }
  return false;
}
