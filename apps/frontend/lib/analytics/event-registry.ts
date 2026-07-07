import { ANALYTICS_EVENTS, type AnalyticsEventName } from "./events";
import { CTA_LOCATIONS } from "./location-maps";
import type { AnalyticsProperties } from "./properties";
import {
  classifyLinkKind,
  contactChannelFromHref,
  extractClickLabel,
  isSectionFlowAnchor,
  isWordmarkClick,
  projectTitleSlugFromCard,
  repoNameFromHref,
  resolveLocation,
  sanitizeTarget,
  statusPageContext,
} from "./properties";

export type ClickContext = {
  element: Element;
  pathname: string;
  href: string | null;
};

export type ResolvedClickEvent = {
  event: AnalyticsEventName;
  properties: AnalyticsProperties;
};

export function resolveClickEvent({ element, pathname, href }: ClickContext): ResolvedClickEvent {
  const linkKind = classifyLinkKind(href ?? undefined);
  const target = sanitizeTarget(href);
  const label = extractClickLabel(element, href);
  const location = resolveLocation(element, pathname);

  if (isWordmarkClick(element, href)) {
    return {
      event: ANALYTICS_EVENTS.wordmarkClicked,
      properties: { target: "/" },
    };
  }

  const flowSectionId = isSectionFlowAnchor(href);
  if (flowSectionId && pathname === "/site-architecture") {
    return {
      event: ANALYTICS_EVENTS.sectionFlowClicked,
      properties: { section_id: flowSectionId },
    };
  }

  if (location === "footer") {
    return {
      event: ANALYTICS_EVENTS.footerLinkClicked,
      properties: { label, target, link_kind: linkKind },
    };
  }

  if (location === "header_desktop" || location === "header_mobile") {
    return {
      event: ANALYTICS_EVENTS.navClicked,
      properties: {
        surface: location,
        label,
        target,
        link_kind: linkKind,
      },
    };
  }

  if (location === "contact_section" || linkKind === "mailto" || linkKind === "tel") {
    const inContact =
      location === "contact_section" ||
      element.closest("#contact-heading, [aria-labelledby='contact-heading']");
    if (inContact && href) {
      const channel = contactChannelFromHref(href);
      if (channel) {
        return {
          event: ANALYTICS_EVENTS.contactClicked,
          properties: { location: "contact_section", channel, link_kind: linkKind },
        };
      }
    }
  }

  if (location === "resume_projects") {
    const projectTitle = projectTitleSlugFromCard(element);
    if (projectTitle) {
      return {
        event: ANALYTICS_EVENTS.projectCardClicked,
        properties: {
          location: "resume_projects",
          project_title: projectTitle,
          label,
          target,
          link_kind: linkKind,
        },
      };
    }
  }

  if (location === "repos_section" && href) {
    const repoName = repoNameFromHref(href);
    if (repoName) {
      return {
        event: ANALYTICS_EVENTS.repoClicked,
        properties: {
          repo_name: repoName,
          target,
          link_kind: linkKind,
          label,
        },
      };
    }
  }

  const statusContext = statusPageContext();
  if (statusContext && (element.tagName === "A" || element.tagName === "BUTTON")) {
    return {
      event: ANALYTICS_EVENTS.statusActionClicked,
      properties: { context: statusContext, label },
    };
  }

  const ctaLocations = CTA_LOCATIONS;

  if (ctaLocations.has(location)) {
    return {
      event: ANALYTICS_EVENTS.ctaClicked,
      properties: { location, label, target, link_kind: linkKind },
    };
  }

  return {
    event: ANALYTICS_EVENTS.linkClicked,
    properties: { location, label, target, link_kind: linkKind },
  };
}
