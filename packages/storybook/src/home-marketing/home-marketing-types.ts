/** Home Phase 3 “above the fold” and teaser blocks — presentation-only (no `@portfolio/resume-content`). */

export type HomeLeadHeroProps = {
  name: string;
  roleEyebrow: string;
  positioningLead: string;
  contactHint?: string;
  contactHintLabel?: string;
  contactHintHref?: string;
  projectsHref: string;
  storybookHref: string;
  /** Optional public URL for the hero portrait (e.g. `/headshot-lucas.png`). */
  headshotSrc?: string;
  headshotAvifSrcSet?: string;
  headshotWebpSrcSet?: string;
  headshotSizes?: string;
  headshotAlt?: string;
};

export type CredibilityItem = {
  title: string;
  body: string;
  metric?: string;
};

export type CredibilityStripProps = {
  id?: string;
  items: readonly [CredibilityItem, CredibilityItem, CredibilityItem];
};

export type FeaturedWorkCard = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  /** When true, link opens in a new tab with noopener. */
  external?: boolean;
};

export type FeaturedWorkPreviewProps = {
  id?: string;
  heading: string;
  flagship: FeaturedWorkCard;
  supporting: readonly [FeaturedWorkCard, FeaturedWorkCard];
};

export type BuildStorybookTeaserProps = {
  id?: string;
  heading: string;
  lead: string;
  buildHref: string;
  storybookHref: string;
};

export type CondensedTimelineEntry = {
  company: string;
  role: string;
  period: string;
};

export type CondensedCvPreviewProps = {
  id?: string;
  heading: string;
  entries: readonly CondensedTimelineEntry[];
  resumeAnchorId: string;
  continueLabel?: string;
};
