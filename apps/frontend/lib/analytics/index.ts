export { ANALYTICS_EVENTS, type AnalyticsEventName } from "./events";
export { resolveClickEvent, type ClickContext, type ResolvedClickEvent } from "./event-registry";
export { trackClickTarget } from "./click-tracking";
export {
  classifyLinkKind,
  contactChannelFromHref,
  extractClickLabel,
  resolveLocation,
  routeNameFromPathname,
  sanitizeTarget,
  type AnalyticsProperties,
  type AnalyticsPropertyValue,
  type LinkKind,
} from "./properties";
export { getPostHogKey, isAnalyticsEnabled } from "./posthog-client";
export { trackEvent, trackImpression } from "./track";
export { usePreservedHrefDecorator } from "./use-preserve-internal-href";
