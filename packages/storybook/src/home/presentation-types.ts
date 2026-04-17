/** Presentation-layer shapes for the home page (mirror `@portfolio/resume-content` structurally; no import from that package). */

export type PresentationContactLink = {
  label: string;
  href: string;
};

export type PresentationWorkEntry = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  achievements: readonly string[];
};

export type PresentationEducationEntry = {
  institution: string;
  location: string;
  date: string;
  degree: string;
};

export type PresentationPersonalProject = {
  title: string;
  description: string;
  href: string;
};

export type HomePageProps = {
  downloadHref: string;
  name: string;
  role: string;
  summary: string;
  location: string;
  phone: string;
  /** Precomputed `tel:` href (computed by the Next app in `apps/frontend`). */
  phoneHref: string;
  email: string;
  linkedin: string;
  contactLinks: readonly PresentationContactLink[];
  summaryHighlights: readonly string[];
  techStack: readonly string[];
  workHistory: readonly PresentationWorkEntry[];
  education: readonly PresentationEducationEntry[];
  certifications: readonly string[];
  personalProjects: readonly PresentationPersonalProject[];
};
