export const cvPdfTypographyStyles = {
  sectionTitle: {
    fontFamily: "Raleway",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 4,
  },
  paragraph: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 1.12,
    marginBottom: 5,
  },
  /**
   * Word: personal project line uses pStyle Heading2 + explicit 10pt run → bold 10pt Lato
   * (paragraph bold; run does not set `w:b w:val="0"`).
   */
  projectDescription: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: 4,
    maxWidth: "100%",
  },
  contactLine: {
    fontSize: 10,
    marginBottom: 9,
  },
  link: {
    color: "#000000",
    textDecoration: "none",
  },
  externalLink: {
    color: "#1155cc",
    textDecoration: "underline",
  },
  contactSectionLink: {
    fontSize: 10,
    marginBottom: 4,
  },
  achievementsTitle: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 1.12,
    /** Word: 5pt after title before first bullet (`spacing_before` on list item). */
    marginBottom: 5,
  },
  /**
   * Word Heading2: paragraph style is bold Lato 11pt (docDefaults); role runs use `w:b w:val="0"`.
   * So company + slash stay bold; role is regular.
   */
  rightTitle: {
    fontFamily: "Lato",
    fontSize: 11,
    lineHeight: 1.12,
    marginBottom: 2,
  },
  rightTitleCompany: {
    fontWeight: 700,
  },
  rightTitleSlash: {
    fontWeight: 700,
  },
  rightTitleRole: {
    fontWeight: 400,
  },
  /** Word body after meta: spacing_before 5pt. */
  workEntryLead: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 1.12,
    marginBottom: 5,
    /** Word body para: spacing_before 5pt after Heading3 meta. */
    marginTop: 5,
  },
  rightMeta: {
    color: "#666666",
    fontFamily: "Lato",
    fontSize: 9,
    fontWeight: 400,
    lineHeight: 1.12,
    marginBottom: 0,
  },
} as const;
