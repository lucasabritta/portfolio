import type { ResumeExperienceEntry } from "./types";

export const resumeWorkHistory = [
  {
    company: "Togal.AI",
    role: "Tech Lead Manager",
    location: "Miami, USA (Remote)",
    period: "01/2026 - present",
    summary:
      "Leading the engineering team responsible for making the company enterprise-ready, focusing on scalability, reliability, and delivery speed.",
    achievements: [
      "Established clear ownership and processes across teams, improving delivery predictability and reducing cycle time.",
      "Improved system observability and incident response, reducing downtime and increasing reliability.",
      "Increasing automated testing by 60% and wiring it into the CI to achieve no-incidents deployments",
    ],
  },
  {
    company: "PowerUs",
    role: "Engineering Manager",
    location: "Berlin, Germany (Remote)",
    period: "01/2024 - 12/2025",
    summary:
      "I joined the company during its early startup phase and, over more than four years, contributed to its growth to a valuation exceeding $200M as Engineering Manager. Throughout its progression from Seed to Series A and B, positioning it as a potential unicorn, I was primarily responsible for software development and platform excellence.",
    achievements: [
      "Recruited and structured the B2B product team from scratch, developing strong technical leadership and cross-team collaboration.",
      "Actively participated in the company’s hiring process and 360° feedback cycles, helping shape engineering culture and performance development.",
      "Introduced consistent monitoring, alerting, and incident management practices, raising service reliability and developer confidence.",
      "Led the ATS integration, increasing enterprise close rates by about 30 percent and reducing churn by about 20 percent",
    ],
  },
  {
    company: "PowerUs",
    role: "Senior Software Engineer",
    location: "Berlin, Germany (Remote)",
    period: "01/2022 - 12/2023 • 2 yrs",
    summary:
      "As one of the first Engineers in the company, I worked closely with product management to shape and ship customer-facing features while ensuring high engineering and quality standards by shaping testable architectures, driving automation, and observability improvements; I was responsible for various parts of the product, such as: core job search experience, application experience, job matching and active sourcing tool for recruiters.",
    achievements: [
      "Developed a new product for active sourcing & further iterated to achieve a 5x improvement in KPI response rate after the successful launch — this now contributes ~10% to the total company revenue.",
      "Introduced & optimised an application funnel, boosting application success rates by more than 30% while at the same time improving the quality of the application by collecting more detailed information from each applicant.",
      "Led the migration of our entire platform from DigitalOcean to AWS, introducing Kubernetes to standardize deployments and improve scalability, reliability, and cost efficiency.",
      "Adding and improving the log system to improve debuggability and observability.",
      "Transitioned from DroneCI to GitHub Actions and implemented full continuous deployment — increasing deployment frequency from ~10 releases per month to over 200.",
    ],
  },
  {
    company: "Natixis",
    role: "Senior Software Engineer",
    location: "Porto, Portugal (Remote)",
    period: "11/2019 - 12/2021 • 2 yrs 2 mos",
    summary: "Delivered new, high-performance features for a trading front-office application",
    achievements: [
      "Optimized SQL queries and refactored critical code paths, improving the general response in ~40%.",
      "Designed and implemented a front-end automation framework from scratch using Appium, enabling automated testing for Windows desktop applications.",
      "Automated 80%+ of core test scenarios, drastically reducing manual testing time and increasing release stability and confidence.",
    ],
  },
  {
    company: "Inatel",
    role: "Software Engineer",
    location: "Santa Rita do Sapucaí, Brazil",
    period: "04/2017 - 10/2019 • 2 yr 7 mos",
    summary: "Worked on Ericsson’s BSS/OSS project.",
    achievements: [
      "Led a 6-person team developing new features, ensured integration between teams, provided technical guidance, and resolved customer issues while still hands on.",
      "Acted as system expert on-site in Rome (4 weeks), Karlskrona (5 weeks), and Kiev (4 weeks) to track, troubleshoot, and fix integration problems.",
      "Responsible for creating and maintaining front-end tests using Selenium/protractor with cucumber.",
      "Create and automate back-end tests with the built-in framework based on Karate.",
    ],
  },
  {
    company: "Tallent Interactive Games",
    role: "Software Engineer",
    location: "Juiz de Fora, Brazil",
    period: "01/2016 - 03/2017 • 1 yr 4 mos",
    summary:
      "Full-stack development of web applications using HTML, CSS, PHP, JavaScript, and Ajax, mobile apps with Xamarin (C#), games with Unity (C#), and databases in MySQL.",
    achievements: [],
  },
] satisfies ResumeExperienceEntry[];
