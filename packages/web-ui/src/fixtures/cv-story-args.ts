import {
  cvData,
  type ContactLink,
  type EducationEntry,
  type ExperienceEntry,
  type PersonalProject,
} from "@portfolio/cv";

const LONG =
  " — Additional copy exercises wrapping, overflow, and narrow viewports while staying realistic for CV-style content.";

export type PortfolioHeroStoryArgs = {
  name: string;
  role: string;
  summary: string;
  location: string;
  phone: string;
  email: string;
  links: readonly ContactLink[];
  downloadHref: string;
};

export function portfolioHeroArgs(
  overrides: Partial<PortfolioHeroStoryArgs> = {},
): PortfolioHeroStoryArgs {
  return {
    name: cvData.name,
    role: cvData.role,
    summary: cvData.summary,
    location: cvData.location,
    phone: cvData.phone,
    email: cvData.email,
    links: cvData.contactLinks,
    downloadHref: "/api/cv",
    ...overrides,
  };
}

export function portfolioHeroLongContentArgs(): PortfolioHeroStoryArgs {
  return portfolioHeroArgs({
    name: `${cvData.name}${LONG}`,
    role: `${cvData.role}${LONG}`,
    summary: `${cvData.summary}${LONG.repeat(2)}`,
  });
}

export function portfolioHeroEmptyArgs(): PortfolioHeroStoryArgs {
  return portfolioHeroArgs({
    name: "",
    role: "",
    summary: "",
    location: "",
    phone: "",
    email: "",
    links: [],
    downloadHref: "/api/cv",
  });
}

export function summarySectionArgs(
  overrides: Partial<{
    summaryHighlights: readonly string[];
    techStack: readonly string[];
  }> = {},
) {
  return {
    summaryHighlights: cvData.summaryHighlights,
    techStack: cvData.techStack,
    ...overrides,
  };
}

export function summarySectionEmptyArgs() {
  return summarySectionArgs({ summaryHighlights: [], techStack: [] });
}

export function summarySectionLongContentArgs() {
  return summarySectionArgs({
    summaryHighlights: cvData.summaryHighlights.map((h) => `${h}${LONG}`),
    techStack: [
      ...cvData.techStack.map((t) => `${t} (primary)`),
      ...cvData.techStack.map((t) => `${t} (secondary)`),
    ],
  });
}

export function workHistorySectionArgs(
  overrides: Partial<{ workHistory: readonly ExperienceEntry[] }> = {},
) {
  return { workHistory: cvData.workHistory, ...overrides };
}

export function workHistorySectionEmptyArgs() {
  return workHistorySectionArgs({ workHistory: [] });
}

export function workHistorySectionManyItemsArgs(): { workHistory: ExperienceEntry[] } {
  const template = cvData.workHistory[0];
  if (!template) {
    return { workHistory: [] };
  }
  const workHistory: ExperienceEntry[] = Array.from({ length: 6 }, (_, i) => ({
    ...template,
    company: `${template.company} (${i + 1})`,
    role: `${template.role} — variant ${i + 1}`,
  }));
  return { workHistory };
}

export function workHistorySectionLongContentArgs(): { workHistory: ExperienceEntry[] } {
  const template = cvData.workHistory[0];
  if (!template) {
    return { workHistory: [] };
  }
  return {
    workHistory: [
      {
        ...template,
        summary: `${template.summary}${LONG.repeat(4)}`,
        achievements: template.achievements.map((a) => `${a}${LONG}`),
      },
    ],
  };
}

export function educationSectionArgs(
  overrides: Partial<{ education: readonly EducationEntry[] }> = {},
) {
  return { education: cvData.education, ...overrides };
}

export function educationSectionEmptyArgs() {
  return educationSectionArgs({ education: [] });
}

export function educationSectionManyItemsArgs(): { education: EducationEntry[] } {
  return {
    education: [...cvData.education, ...cvData.education].map((e, i) => ({
      ...e,
      institution: `${e.institution} (${i + 1})`,
    })),
  };
}

export function educationSectionLongContentArgs(): { education: EducationEntry[] } {
  const e = cvData.education[0];
  if (!e) {
    return { education: [] };
  }
  return {
    education: [
      {
        ...e,
        institution: `${e.institution}${LONG}`,
        degree: `${e.degree}${LONG.repeat(2)}`,
        location: `${e.location}${LONG}`,
      },
    ],
  };
}

export function certificationsSectionArgs(overrides: Partial<{ certifications: readonly string[] }> = {}) {
  return { certifications: cvData.certifications, ...overrides };
}

export function certificationsSectionEmptyArgs() {
  return certificationsSectionArgs({ certifications: [] });
}

export function certificationsSectionLongContentArgs() {
  const extra = Array.from({ length: 12 }, (_, i) => `Sample certification title ${i + 1}${LONG}`);
  return certificationsSectionArgs({ certifications: [...cvData.certifications, ...extra] });
}

export function certificationsSectionManyItemsArgs() {
  const many = Array.from({ length: 24 }, (_, i) => `Certification entry ${i + 1}: ${LONG.slice(0, 40)}`);
  return certificationsSectionArgs({ certifications: [...cvData.certifications, ...many] });
}

export function projectsSectionArgs(overrides: Partial<{ projects: readonly PersonalProject[] }> = {}) {
  return { projects: cvData.personalProjects, ...overrides };
}

export function projectsSectionEmptyArgs() {
  return projectsSectionArgs({ projects: [] });
}

export function projectsSectionManyItemsArgs(): { projects: PersonalProject[] } {
  const template = cvData.personalProjects[0];
  if (!template) {
    return { projects: [] };
  }
  return {
    projects: Array.from({ length: 5 }, (_, i) => ({
      ...template,
      title: `${template.title} (${i + 1})`,
      href: `${template.href}?s=${i + 1}`,
    })),
  };
}

export function projectsSectionLongContentArgs() {
  const template = cvData.personalProjects[0];
  if (!template) {
    return { projects: [] };
  }
  return {
    projects: [
      {
        ...template,
        title: `${template.title}${LONG}`,
        description: `${template.description}${LONG.repeat(3)}`,
      },
    ],
  };
}

export function contactSectionArgs(
  overrides: Partial<{
    location: string;
    phone: string;
    email: string;
    linkedin: string;
  }> = {},
) {
  return {
    location: cvData.location,
    phone: cvData.phone,
    email: cvData.email,
    linkedin: cvData.linkedin,
    ...overrides,
  };
}

/** Empty location, phone, email, and LinkedIn — contact card shows placeholders only (no links). */
export function contactSectionEmptyArgs() {
  return contactSectionArgs({
    location: "",
    phone: "",
    email: "",
    linkedin: "",
  });
}

export function contactSectionLongContentArgs() {
  return contactSectionArgs({
    location: `${cvData.location}${LONG}`,
    phone: cvData.phone,
    email: `${cvData.email}${LONG}`,
    linkedin: cvData.linkedin,
  });
}

/** Apply on stories that must render in a small mobile iframe (Storybook 10 core viewport). */
export const narrowMobileStory = {
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
} as const;
