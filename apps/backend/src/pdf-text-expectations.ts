import type { ResumeData } from "@portfolio/resume-content";

/**
 * Substrings that must appear in the CV PDF text extract when {@link ResumeData} is rendered.
 */
export function buildCvPdfRequiredSubstrings(data: ResumeData): readonly string[] {
  const parts: string[] = [];

  parts.push(data.name.toUpperCase());
  parts.push(data.role.toUpperCase());
  parts.push(data.phone);
  parts.push(data.email);
  const linkedinUrl = new URL(data.linkedin);
  parts.push(linkedinUrl.hostname.replace(/^www\./, ""));
  for (const segment of linkedinUrl.pathname.split("/").filter(Boolean)) {
    parts.push(segment);
  }
  parts.push(data.location);

  parts.push("Education");
  for (const entry of data.education) {
    parts.push(entry.institution);
    parts.push(`${entry.location} • ${entry.date}`);
    parts.push(entry.degree);
  }

  parts.push("Certifications");
  for (const cert of data.certifications) {
    parts.push(cert);
  }

  parts.push("Personal projects");
  for (const project of data.personalProjects) {
    parts.push(project.description);
    const u = new URL(project.href);
    parts.push(u.hostname.replace(/^www\./, ""));
    for (const [, value] of u.searchParams) {
      if (value.length > 4) {
        parts.push(value);
      }
    }
  }

  parts.push("Professional Summary");
  parts.push(data.summary);
  for (const highlight of data.summaryHighlights) {
    parts.push(highlight);
  }
  parts.push(`Tech stack: ${data.techStack.join(", ")}.`);

  parts.push("Work History");
  for (const entry of data.workHistory) {
    parts.push(`${entry.company} / ${entry.role}`);
    parts.push(`${entry.location} • ${entry.period}`);
    parts.push(entry.summary);
    for (const achievement of entry.achievements) {
      parts.push(achievement);
    }
  }

  parts.push("Key achievements:");

  return parts.filter((s) => s.length > 0);
}
