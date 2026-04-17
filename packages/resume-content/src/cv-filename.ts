/**
 * Builds the CV PDF download filename from a person's display name.
 *
 * The algorithm is the single source of truth for the filename served by the
 * `/api/cv` route and asserted by end-to-end tests. Keeping it inside
 * `@portfolio/resume-content` lets both the Next.js app and the e2e suite
 * derive the expected name from the same data + logic instead of hardcoding
 * a literal that silently breaks when `resumeData.name` changes.
 */
export function buildCvFilename(name: string): string {
  const slug = name.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return `${slug || "resume"}_CV.pdf`;
}
