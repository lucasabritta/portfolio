/** PostHog event name constants (single source of truth). */
export const ANALYTICS_EVENTS = {
  pageViewed: "page_viewed",
  navClicked: "nav_clicked",
  wordmarkClicked: "wordmark_clicked",
  footerLinkClicked: "footer_link_clicked",
  themeChanged: "theme_changed",
  ctaClicked: "cta_clicked",
  contactClicked: "contact_clicked",
  projectCardClicked: "project_card_clicked",
  repoClicked: "repo_clicked",
  sectionFlowClicked: "section_flow_clicked",
  linkClicked: "link_clicked",
  notFoundViewed: "not_found_viewed",
  errorBoundaryShown: "error_boundary_shown",
  statusActionClicked: "status_action_clicked",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
