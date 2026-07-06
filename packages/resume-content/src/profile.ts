import { PROJECT_URLS } from "./project-urls";
import type { ResumeContactLink } from "./types";

export const resumeProfile = {
  name: "Lucas Abritta",
  role: "Senior Software Engineer · Tech Lead",
  location: "Spain",
  phone: "+34 604 809 476",
  email: "lucasabritta@gmail.com",
  linkedin: "https://www.linkedin.com/in/lucas-abritta",
  summary:
    "Senior Software Engineer and Tech Lead with experience scaling engineering through rapid startup growth—from hands-on delivery to team leadership.",
  techStack: [
    "TypeScript",
    "Angular",
    "MongoDB",
    "SQL",
    "AWS",
    "Java",
    "LLMs",
    "Node.js",
    "React",
    "Cypress",
    "C#",
    "GitHub Actions",
    "Datadog",
    "Python",
    "Postgres",
    "Playwright",
  ],
  contactLinks: [
    { label: "Email", href: "mailto:lucasabritta@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lucas-abritta" },
    {
      label: "Google Play",
      href: PROJECT_URLS.echoesMissingCatPlayStore,
    },
  ] satisfies ResumeContactLink[],
} as const;
