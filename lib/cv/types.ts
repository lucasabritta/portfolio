export type ContactLink = {
  label: string;
  href: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  achievements: readonly string[];
};

export type EducationEntry = {
  institution: string;
  location: string;
  date: string;
  degree: string;
};

export type PersonalProject = {
  title: string;
  description: string;
  href: string;
};

export type CvData = {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  summaryHighlights: readonly string[];
  techStack: readonly string[];
  contactLinks: readonly ContactLink[];
  workHistory: readonly ExperienceEntry[];
  education: readonly EducationEntry[];
  certifications: readonly string[];
  personalProjects: readonly PersonalProject[];
};
