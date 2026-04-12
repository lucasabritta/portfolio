export type ResumeContactLink = {
  label: string;
  href: string;
};

export type ResumeExperienceEntry = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  achievements: readonly string[];
};

export type ResumeEducationEntry = {
  institution: string;
  location: string;
  date: string;
  degree: string;
};

export type ResumePersonalProject = {
  title: string;
  description: string;
  href: string;
};

export type ResumeData = {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  summaryHighlights: readonly string[];
  techStack: readonly string[];
  contactLinks: readonly ResumeContactLink[];
  workHistory: readonly ResumeExperienceEntry[];
  education: readonly ResumeEducationEntry[];
  certifications: readonly string[];
  personalProjects: readonly ResumePersonalProject[];
};
