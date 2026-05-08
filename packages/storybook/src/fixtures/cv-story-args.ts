import type {
  HomePageProps,
  PresentationContactLink,
  PresentationEducationEntry,
  PresentationPersonalProject,
  PresentationWorkEntry,
} from "../home/presentation-types";

const LONG =
  " — Additional copy exercises wrapping, overflow, and narrow viewports while staying realistic for CV-style content.";

const SYNTH_NAME = "Jane Doe";
const SYNTH_ROLE = "Senior Engineer";
const SYNTH_SUMMARY = "Product-minded engineer focused on reliability and user impact.";
const SYNTH_LOCATION = "Remote";
const SYNTH_PHONE = "+1 555 0100";
const SYNTH_PHONE_HREF = "tel:+15550100";
const SYNTH_EMAIL = "jane.doe@example.com";
export const SYNTH_LINKEDIN = "https://www.linkedin.com/in/example";

const SYNTH_LINKS: readonly PresentationContactLink[] = [
  { label: "Email", href: "mailto:jane.doe@example.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/example" },
];

const SYNTH_WORK: readonly PresentationWorkEntry[] = [
  {
    company: "Example Corp",
    role: "Staff Engineer",
    location: "Remote",
    period: "2022 - present",
    summary: "Led platform initiatives and mentored engineers.",
    achievements: [
      "Cut p99 latency by 40% on core APIs.",
      "Introduced design system adoption across squads.",
    ],
  },
  {
    company: "Previous Inc",
    role: "Software Engineer",
    location: "Berlin",
    period: "2019 - 2022",
    summary: "Full-stack product development.",
    achievements: ["Owned checkout funnel experiments."],
  },
];

const SYNTH_EDU: readonly PresentationEducationEntry[] = [
  {
    institution: "Example University",
    location: "City",
    date: "2018",
    degree: "B.Sc. Computer Science",
  },
];

const SYNTH_CERTS = ["Certified Scrum Master", "AWS Cloud Practitioner"] as const;

const SYNTH_PROJECTS: readonly PresentationPersonalProject[] = [
  {
    title: "Sample side project",
    description: "Open source CLI for local dev workflows.",
    href: "https://example.com/project",
  },
];

export type PortfolioHeroStoryArgs = {
  name: string;
  role: string;
  summary: string;
  location: string;
  phone: string;
  phoneHref: string;
  email: string;
  links: readonly PresentationContactLink[];
};

export function portfolioHeroArgs(
  overrides: Partial<PortfolioHeroStoryArgs> = {},
): PortfolioHeroStoryArgs {
  return {
    name: SYNTH_NAME,
    role: SYNTH_ROLE,
    summary: SYNTH_SUMMARY,
    location: SYNTH_LOCATION,
    phone: SYNTH_PHONE,
    phoneHref: SYNTH_PHONE_HREF,
    email: SYNTH_EMAIL,
    links: SYNTH_LINKS,
    ...overrides,
  };
}

export function portfolioHeroLongContentArgs(): PortfolioHeroStoryArgs {
  return portfolioHeroArgs({
    name: `${SYNTH_NAME}${LONG}`,
    role: `${SYNTH_ROLE}${LONG}`,
    summary: `${SYNTH_SUMMARY}${LONG.repeat(2)}`,
  });
}

export function portfolioHeroEmptyArgs(): PortfolioHeroStoryArgs {
  return portfolioHeroArgs({
    name: "",
    role: "",
    summary: "",
    location: "",
    phone: "",
    phoneHref: "tel:",
    email: "",
    links: [],
  });
}

export function educationSectionArgs(
  overrides: Partial<{ education: readonly PresentationEducationEntry[] }> = {},
) {
  return { education: SYNTH_EDU, ...overrides };
}

export function educationSectionEmptyArgs() {
  return educationSectionArgs({ education: [] });
}

export function educationSectionManyItemsArgs(): { education: PresentationEducationEntry[] } {
  return {
    education: [...SYNTH_EDU, ...SYNTH_EDU].map((e, i) => ({
      ...e,
      institution: `${e.institution} (${i + 1})`,
    })),
  };
}

export function educationSectionLongContentArgs(): { education: PresentationEducationEntry[] } {
  const e = SYNTH_EDU[0];
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

export function certificationsSectionArgs(
  overrides: Partial<{ certifications: readonly string[] }> = {},
) {
  return { certifications: SYNTH_CERTS, ...overrides };
}

export function certificationsSectionEmptyArgs() {
  return certificationsSectionArgs({ certifications: [] });
}

export function certificationsSectionLongContentArgs() {
  const extra = Array.from({ length: 12 }, (_, i) => `Sample certification title ${i + 1}${LONG}`);
  return certificationsSectionArgs({ certifications: [...SYNTH_CERTS, ...extra] });
}

export function certificationsSectionManyItemsArgs() {
  const many = Array.from(
    { length: 24 },
    (_, i) => `Certification entry ${i + 1}: ${LONG.slice(0, 40)}`,
  );
  return certificationsSectionArgs({ certifications: [...SYNTH_CERTS, ...many] });
}

export function projectsSectionArgs(
  overrides: Partial<{ projects: readonly PresentationPersonalProject[] }> = {},
) {
  return { projects: SYNTH_PROJECTS, ...overrides };
}

export function projectsSectionEmptyArgs() {
  return projectsSectionArgs({ projects: [] });
}

export function projectsSectionManyItemsArgs(): { projects: PresentationPersonalProject[] } {
  const template = SYNTH_PROJECTS[0];
  return {
    projects: Array.from({ length: 5 }, (_, i) => ({
      ...template,
      title: `${template.title} (${i + 1})`,
      href: `${template.href}?s=${i + 1}`,
    })),
  };
}

export function projectsSectionLongContentArgs() {
  const template = SYNTH_PROJECTS[0];
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
    phoneHref: string;
    email: string;
    linkedin: string;
  }> = {},
) {
  return {
    location: SYNTH_LOCATION,
    phone: SYNTH_PHONE,
    phoneHref: SYNTH_PHONE_HREF,
    email: SYNTH_EMAIL,
    linkedin: SYNTH_LINKEDIN,
    ...overrides,
  };
}

export function contactSectionEmptyArgs() {
  return contactSectionArgs({
    location: "",
    phone: "",
    phoneHref: "tel:",
    email: "",
    linkedin: "",
  });
}

export function contactSectionLongContentArgs() {
  return contactSectionArgs({
    location: `${SYNTH_LOCATION}${LONG}`,
    phone: SYNTH_PHONE,
    phoneHref: SYNTH_PHONE_HREF,
    email: `${SYNTH_EMAIL}${LONG}`,
    linkedin: SYNTH_LINKEDIN,
  });
}

export function homePageArgs(overrides: Partial<HomePageProps> = {}): HomePageProps {
  return {
    name: SYNTH_NAME,
    role: SYNTH_ROLE,
    summary: SYNTH_SUMMARY,
    location: SYNTH_LOCATION,
    phone: SYNTH_PHONE,
    phoneHref: SYNTH_PHONE_HREF,
    email: SYNTH_EMAIL,
    linkedin: SYNTH_LINKEDIN,
    contactLinks: SYNTH_LINKS,
    workHistory: [...SYNTH_WORK],
    education: [...SYNTH_EDU],
    certifications: [...SYNTH_CERTS],
    personalProjects: [...SYNTH_PROJECTS],
    ...overrides,
  };
}

/** Exported for interaction tests (synthetic copy, not real résumé data). */
export const storyFixtureName = SYNTH_NAME;
export const storyFixturePhone = SYNTH_PHONE;
export const storyFixtureEmail = SYNTH_EMAIL;
export const storyFixtureCert = SYNTH_CERTS[0];
export const storyFixtureEducationInstitution = SYNTH_EDU[0].institution;
export const storyFixtureWorkCompany = SYNTH_WORK[0].company;
export const storyFixtureEducationCount = SYNTH_EDU.length;
export const storyFixtureWorkCount = SYNTH_WORK.length;
export const storyFixtureCertCount = SYNTH_CERTS.length;

export const narrowMobileStory = {
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
} as const;
