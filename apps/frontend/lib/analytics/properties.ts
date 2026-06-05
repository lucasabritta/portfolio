export type LinkKind = "internal" | "external" | "mailto" | "tel" | "hash";

export type AnalyticsPropertyValue = string | number | boolean;

export type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;

/** Maps pathname to a stable route label for analytics. */
export function routeNameFromPathname(pathname: string): string {
  const normalized = pathname.replace(/\/$/, "") || "/";
  switch (normalized) {
    case "/":
      return "home";
    case "/projects":
      return "projects";
    case "/site-architecture":
      return "site_architecture";
    default:
      return "other";
  }
}

export function classifyLinkKind(href: string | null | undefined): LinkKind {
  if (!href) {
    return "internal";
  }
  const trimmed = href.trim();
  if (trimmed.startsWith("#")) {
    return "hash";
  }
  if (trimmed.startsWith("mailto:")) {
    return "mailto";
  }
  if (trimmed.startsWith("tel:")) {
    return "tel";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return "external";
  }
  return "internal";
}

/** Sanitize href for analytics — never emit raw mailto/tel or email/phone values. */
export function sanitizeTarget(href: string | null | undefined): string {
  if (!href) {
    return "";
  }
  const trimmed = href.trim();
  const kind = classifyLinkKind(trimmed);
  if (kind === "mailto") {
    return "mailto";
  }
  if (kind === "tel") {
    return "tel";
  }
  if (kind === "hash") {
    return trimmed;
  }
  if (kind === "external") {
    try {
      const url = new URL(trimmed);
      return url.hostname + url.pathname.replace(/\/$/, "");
    } catch {
      return "external";
    }
  }
  try {
    const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return path.split("?")[0] ?? path;
  } catch {
    return trimmed;
  }
}

export function contactChannelFromHref(href: string): "phone" | "email" | "linkedin" | null {
  const kind = classifyLinkKind(href);
  if (kind === "tel") {
    return "phone";
  }
  if (kind === "mailto") {
    return "email";
  }
  if (/linkedin\.com/i.test(href)) {
    return "linkedin";
  }
  return null;
}

function slugifyLabel(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

/** Visible link/button label without visually-hidden suffixes; redacts mailto/tel text. */
export function extractClickLabel(el: Element, href: string | null = null): string {
  const resolvedHref =
    href ??
    (el instanceof HTMLAnchorElement
      ? el.getAttribute("href")
      : (el.closest("a")?.getAttribute("href") ?? null));
  const kind = classifyLinkKind(resolvedHref ?? undefined);
  if (kind === "mailto" || kind === "tel") {
    return kind;
  }

  const clone = el.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll('[class*="visuallyHidden"], .visually-hidden, [aria-hidden="true"]')
    .forEach((node) => {
      node.remove();
    });
  return clone.textContent?.trim() ?? "";
}

function sectionIdToLocation(sectionId: string, pathname: string): string | null {
  const id = sectionId.toLowerCase();
  const map: Record<string, string> = {
    "home-hero": "home_hero",
    "featured-work": "featured_work_flagship",
    "build-teaser": "build_teaser",
    "cv-preview": "cv_preview",
    "contact-heading": "contact_section",
    "projects-heading": "resume_projects",
    "flagship-title": "projects_flagship",
    "repos-heading": "repos_section",
    "build-ctas": "site_architecture",
  };
  if (map[id]) {
    return map[id];
  }
  if (id.startsWith("build-page") || pathname === "/site-architecture") {
    return "site_architecture";
  }
  return null;
}

function locationFromSection(el: Element, pathname: string): string | null {
  const section = el.closest("section[id]");
  if (section?.id) {
    const fromSection = sectionIdToLocation(section.id, pathname);
    if (fromSection) {
      return fromSection;
    }
  }

  const withId = el.closest("[id]");
  if (withId?.id) {
    const fromId = sectionIdToLocation(withId.id, pathname);
    if (fromId) {
      return fromId;
    }
  }

  const labelledSection = el.closest("section[aria-labelledby]");
  const labelledBy = labelledSection?.getAttribute("aria-labelledby");
  if (labelledBy) {
    const fromLabelled = sectionIdToLocation(labelledBy, pathname);
    if (fromLabelled) {
      return fromLabelled;
    }
  }

  if (pathname === "/projects") {
    return "projects_page";
  }
  if (pathname === "/site-architecture") {
    return "site_architecture";
  }

  return null;
}

export function resolveLocation(el: Element, pathname: string): string {
  if (el.closest("#home-hero")) {
    return "home_hero";
  }

  if (el.closest("footer")) {
    return "footer";
  }

  const siteHeader = el.closest("header");
  if (siteHeader && siteHeader.id !== "home-hero") {
    if (el.closest("nav a, nav [href]")) {
      const mobilePanel = el.closest('[role="dialog"]');
      return mobilePanel ? "header_mobile" : "header_desktop";
    }
    if (el.closest('a[href="/"]') && !el.closest("nav")) {
      return "header_wordmark";
    }
    return "header";
  }

  const sectionLocation = locationFromSection(el, pathname);
  if (sectionLocation) {
    if (sectionLocation === "featured_work_flagship") {
      const card = el.closest("article");
      const grid = el.closest('[class*="grid"]');
      if (grid && card) {
        const cards = Array.from(grid.querySelectorAll(":scope > article, :scope > li > article"));
        if (cards.indexOf(card) > 0) {
          return "featured_work_supporting";
        }
      }
    }
    return sectionLocation;
  }

  if (pathname === "/") {
    return "home";
  }

  return routeNameFromPathname(pathname);
}

export function isWordmarkClick(el: Element, href: string | null): boolean {
  if (href !== "/" && href !== "") {
    return false;
  }
  return el.closest("header") !== null && el.closest("nav") === null;
}

export function isSectionFlowAnchor(href: string | null): string | null {
  if (!href?.startsWith("#")) {
    return null;
  }
  const sectionId = href.slice(1);
  return sectionId.length > 0 ? sectionId : null;
}

export function repoNameFromHref(href: string): string | null {
  try {
    const url = new URL(href);
    if (!/github\.com/i.test(url.hostname)) {
      return null;
    }
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? null;
  } catch {
    return null;
  }
}

export function projectTitleSlugFromCard(el: Element): string | null {
  const card = el.closest("article");
  const title = card?.querySelector("h3");
  if (!title?.textContent) {
    return null;
  }
  return slugifyLabel(title.textContent);
}

export function statusPageContext(): "not_found" | "error" | null {
  const heading = document.querySelector("h1")?.textContent?.toLowerCase() ?? "";
  if (heading.includes("not found")) {
    return "not_found";
  }
  if (heading.includes("went wrong")) {
    return "error";
  }
  return null;
}
