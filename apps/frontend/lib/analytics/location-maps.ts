/** Maps presentational section ids to stable analytics location labels. */
export const SECTION_ID_TO_LOCATION: Readonly<Record<string, string>> = {
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

/** Section locations that map clicks to `cta_clicked`. */
export const CTA_LOCATIONS = new Set([
  "home_hero",
  "featured_work_flagship",
  "featured_work_supporting",
  "build_teaser",
  "cv_preview",
  "projects_flagship",
  "site_architecture",
  "projects_page",
]);
