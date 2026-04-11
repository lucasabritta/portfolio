import { CV_PDF_LEFT_INNER_WIDTH_PT } from "@/components/cv-pdf/constants";

export const cvPdfLeftColumnStyles = {
  /** Hard width boundary so Link/Text wrap inside the sidebar (Yoga + long URLs). */
  sidebarTextColumn: {
    alignSelf: "stretch",
    maxWidth: CV_PDF_LEFT_INNER_WIDTH_PT,
    minWidth: 0,
    width: "100%",
  },
  headerName: {
    fontFamily: "Raleway",
    fontSize: 19,
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  headerRole: {
    color: "#f2511b",
    fontFamily: "Raleway",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.18,
    /** Word Subtitle → phone: 10pt spacing before phone paragraph. */
    marginBottom: 10,
    textTransform: "uppercase",
  },
  leftContactLine: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 1.15,
    marginBottom: 3,
  },
  /** Word: 10pt before next contact line after phone. */
  leftContactPhone: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 1.15,
    marginBottom: 10,
  },
  /** LinkedIn: smaller than body; tight block before email (Word has 0pt before email). */
  leftLinkedInLink: {
    fontFamily: "Lato",
    fontSize: 8,
    fontWeight: 400,
    lineHeight: 1.2,
    marginBottom: 4,
    maxWidth: CV_PDF_LEFT_INNER_WIDTH_PT,
  },
  dividerLine: {
    borderTop: "1 solid #000000",
    alignSelf: "flex-start",
    marginBottom: 6,
    marginTop: 5,
    width: 16,
  },
  leftSections: {
    marginTop: 0,
    maxWidth: "100%",
    minWidth: 0,
    width: "100%",
  },
  leftEntry: {
    marginBottom: 7,
  },
  /** First education line: institution + “/” + meta (single wrapped line in Word). */
  leftInstitutionLine: {
    fontFamily: "Lato",
    fontSize: 10,
    lineHeight: 1.22,
    marginTop: 3,
  },
  leftInstitution: {
    color: "#000000",
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 700,
  },
  /** Slash only — education location line reuses `rightMeta` (same as work history meta). */
  leftSlash: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 700,
  },
  degreeLine: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 1.22,
    marginTop: 4,
  },
  /** Label before “: …” (e.g. Bachelor’s degree) — bold; field after colon — regular. */
  degreePrefixBold: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 700,
  },
  degreeSuffixPlain: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 400,
  },
  /** Constrains project URL width; no overflow:hidden so wrapped lines stay fully visible. */
  sidebarUrlClip: {
    alignSelf: "flex-start",
    maxWidth: CV_PDF_LEFT_INNER_WIDTH_PT,
    minWidth: 0,
    width: CV_PDF_LEFT_INNER_WIDTH_PT,
  },
  certificationsSection: {
    marginTop: 12,
  },
  certificationText: {
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 1.12,
    marginBottom: 2,
  },
  /**
   * Personal project URL: same size/weight as {@link leftLinkedInLink} (8pt Lato).
   * Width matches inner cell so wrapping stays inside the left column.
   */
  projectLink: {
    fontFamily: "Lato",
    fontSize: 8,
    fontWeight: 400,
    lineHeight: 1.2,
    maxWidth: CV_PDF_LEFT_INNER_WIDTH_PT,
    /** Explicit width for sidebar line boxes (used on wrapping `Text` inside project `Link`). */
    width: CV_PDF_LEFT_INNER_WIDTH_PT,
  },
} as const;
