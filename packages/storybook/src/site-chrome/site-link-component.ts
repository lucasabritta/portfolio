import type { ComponentType, ReactNode } from "react";

/** Optional internal link renderer (e.g. Next.js `Link`). External anchors stay plain `<a>`. */
export type SiteShellLinkComponent = ComponentType<{
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-current"?: "page" | undefined;
}>;
