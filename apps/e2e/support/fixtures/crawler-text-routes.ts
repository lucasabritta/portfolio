export const CRAWLER_TEXT_ROUTES = [
  {
    path: "/sitemap.xml",
    contentType: /application\/xml|text\/xml/i,
    expectedContent: [/\/llms\.txt/, /\/projects\.txt/, /\/resume\.txt/],
  },
  {
    path: "/robots.txt",
    contentType: /text\/plain/i,
    expectedContent: [/User-Agent:\s*\*/i, /Sitemap:\s*.+\/sitemap\.xml/i],
  },
  {
    path: "/llms.txt",
    contentType: /text\/plain/i,
    expectedContent: [/\/resume\.txt/, /\/projects\.txt/],
  },
  {
    path: "/projects.txt",
    contentType: /text\/plain/i,
    expectedContent: [/# Projects/i, /Echoes of the missing cat/i],
  },
  {
    path: "/resume.txt",
    contentType: /text\/plain/i,
    expectedContent: [/## Work History/i, /Lucas Abritta/i],
  },
] as const;
