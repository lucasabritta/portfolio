import type { ExperienceEntry } from "./types";

export const cvWorkHistory = [
  {
    company: "Togal.AI",
    role: "Tech Lead Manager",
    location: "Miami, USA (Remote)",
    period: "01/2026 - Present",
    summary:
      "Leading the engineering team responsible for making the company enterprise-ready, with focus on scalability, reliability, and delivery speed.",
    achievements: [
      "Established clear ownership and processes across teams, improving delivery predictability and reducing cycle time.",
      "Improved system observability and incident response, reducing downtime and increasing reliability.",
      "Increased automated testing by 60% and wired it into CI to achieve no-incident deployments.",
    ],
  },
  {
    company: "PowerUs",
    role: "Engineering Manager",
    location: "Berlin, Germany (Remote)",
    period: "01/2024 - 12/2025",
    summary:
      "Joined during the early startup phase and helped grow the company to a valuation above $200M while owning software development and platform excellence across Seed, Series A, and Series B stages.",
    achievements: [
      "Recruited and structured the B2B product team from scratch, developing strong technical leadership and cross-team collaboration.",
      "Actively participated in the hiring process and 360 feedback cycles, helping shape engineering culture and performance development.",
      "Introduced consistent monitoring, alerting, and incident management practices, raising service reliability and developer confidence.",
      "Led the ATS integration, increasing enterprise close rates by about 30% and reducing churn by about 20%.",
    ],
  },
  {
    company: "PowerUs",
    role: "Senior Software Engineer",
    location: "Berlin, Germany (Remote)",
    period: "01/2022 - 12/2023",
    summary:
      "One of the first engineers in the company, working closely with product management to shape customer-facing features and raise engineering quality through testable architectures, automation, and observability.",
    achievements: [
      "Developed a new active sourcing product and iterated on it to achieve a 5x improvement in KPI response rate after launch, now contributing about 10% of total company revenue.",
      "Introduced and optimized an application funnel, boosting application success rates by more than 30% while collecting more detailed applicant information.",
      "Led the migration of the entire platform from DigitalOcean to AWS and introduced Kubernetes to improve scalability, reliability, and cost efficiency.",
      "Added and improved the logging system to strengthen debuggability and observability.",
      "Transitioned from DroneCI to GitHub Actions and implemented full continuous deployment, increasing deployment frequency from about 10 releases per month to more than 200.",
    ],
  },
  {
    company: "Natixis",
    role: "Senior Software Engineer",
    location: "Porto, Portugal (Remote)",
    period: "11/2019 - 12/2021",
    summary: "Delivered new, high-performance features for a trading front-office application.",
    achievements: [
      "Optimized SQL queries and refactored critical code paths, improving overall response time by about 40%.",
      "Designed and implemented a front-end automation framework from scratch using Appium, enabling automated testing for Windows desktop applications.",
      "Automated more than 80% of core test scenarios, reducing manual testing time and increasing release stability and confidence.",
    ],
  },
  {
    company: "Inatel",
    role: "Software Engineer",
    location: "Santa Rita do Sapucai, Brazil",
    period: "04/2017 - 10/2019",
    summary: "Worked on Ericsson's BSS/OSS project in a hands-on engineering and team leadership role.",
    achievements: [
      "Led a 6-person team developing new features, ensured integration between teams, provided technical guidance, and resolved customer issues while staying hands-on.",
      "Acted as system expert on-site in Rome, Karlskrona, and Kiev to track, troubleshoot, and fix integration problems.",
      "Created and maintained front-end tests using Selenium/Protractor with Cucumber.",
      "Created and automated back-end tests with the built-in framework based on Karate.",
    ],
  },
  {
    company: "Tallent Interactive Games",
    role: "Software Engineer",
    location: "Juiz de Fora, Brazil",
    period: "01/2016 - 03/2017",
    summary:
      "Built full-stack web applications with HTML, CSS, PHP, JavaScript, and Ajax, plus mobile apps with Xamarin, games with Unity, and MySQL-backed systems.",
    achievements: [],
  },
] satisfies ExperienceEntry[];
