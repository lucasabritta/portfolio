import { StyleSheet } from "@react-pdf/renderer";

export const cvPdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontFamily: "Lato",
    fontSize: 10,
    lineHeight: 1.22,
    paddingBottom: 20,
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
  },
  leftColumn: {
    marginRight: 16,
    width: 150,
  },
  rightColumn: {
    flex: 1,
    paddingTop: 4,
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
    lineHeight: 1.2,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  contactLine: {
    fontSize: 10,
    marginBottom: 9,
  },
  emailLine: {
    fontSize: 10,
    marginBottom: 12,
  },
  linkedinLine: {
    fontSize: 8,
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
  dividerLine: {
    borderTop: "1 solid #9ca3af",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginTop: 6,
    width: 16,
  },
  sectionTitle: {
    fontFamily: "Raleway",
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
  },
  workHistoryTitle: {
    marginBottom: 10,
  },
  leftEntry: {
    marginBottom: 10,
  },
  leftMain: {
    fontSize: 10,
    fontWeight: 700,
    marginTop: 4,
  },
  leftSub: {
    color: "#666666",
    fontSize: 9,
  },
  degreeText: {
    fontSize: 10,
    marginTop: 8,
  },
  degreePrefix: {
    fontSize: 10,
    fontWeight: 700,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 7,
  },
  achievementsTitle: {
    marginBottom: 3,
  },
  summaryDivider: {
    borderTop: "2 solid #000000",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginTop: 6,
    width: "100%",
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 17,
  },
  bullet: {
    color: "#000000",
    fontFamily: "ArialMT",
    fontSize: 10,
    marginRight: 5,
    width: 11,
  },
  bulletText: {
    flex: 1,
  },
  entry: {
    marginBottom: 6,
  },
  rightTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 2,
  },
  rightMeta: {
    color: "#666666",
    fontSize: 9,
    marginBottom: 4,
  },
  workSection: {
    marginTop: 22,
  },
  /** Space beside Professional Summary so Education aligns with Work History (reference layout). */
  leftSections: {
    marginTop: 45,
  },
  certificationsSection: {
    marginTop: 15,
  },
  certificationText: {
    fontSize: 10,
    marginBottom: 2,
  },
  projectLink: {
    fontSize: 8,
    lineHeight: 1.2,
  },
});
