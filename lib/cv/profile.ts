import type { ContactLink } from "./types";

export const cvProfile = {
  name: "Lucas Abritta",
  role: "Engineering Manager",
  location: "Spain",
  phone: "+34 604 809 476",
  email: "lucasabritta@gmail.com",
  linkedin: "https://www.linkedin.com/in/lucas-abritta",
  summary: "Engineering Manager with experience in rapid startup growth.",
  summaryHighlights: [
    "Played a key role in growing a Startup from Seed to Series A and B, contributing to its ~$200 M valuation while leading engineering quality and platform excellence.",
    "Hands-on background in software development and automation, with expertise in cloud infrastructure, CI/CD, observability and performance.",
    "Leading recruiting, onboarding, and performance development through structured 360° feedback cycles; Fostering a culture of ownership, technical excellence, and cross-team collaboration.",
    "Tech stack: TypeScript, Angular, MongoDB, SQL, AWS, Java, LLMs, Node.js, React Cypress, C#, GitHub Actions, Datadog, Python, Postgres, Playwright.",
  ],
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
      href: "https://play.google.com/store/apps/details?id=com.echoes.missingcat",
    },
  ] satisfies ContactLink[],
} as const;
