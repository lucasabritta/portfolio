import { StyleSheet } from "@react-pdf/renderer";

export const cvPdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#111827",
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.35,
    paddingHorizontal: 18,
    paddingVertical: 20,
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
    paddingTop: 7,
  },
  headerName: {
    fontSize: 17,
    fontWeight: 700,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  headerRole: {
    color: "#374151",
    fontSize: 10,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  contactLine: {
    fontSize: 10,
    marginBottom: 8,
  },
  link: {
    color: "#111827",
    textDecoration: "none",
  },
  dividerLine: {
    borderTop: "1 solid #9ca3af",
    marginBottom: 10,
    marginTop: 8,
    width: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 8,
  },
  leftEntry: {
    marginBottom: 14,
  },
  leftMain: {
    fontSize: 10,
    fontWeight: 700,
  },
  leftSub: {
    color: "#374151",
    fontSize: 9,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 8,
  },
  achievementsTitle: {
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bullet: {
    marginRight: 5,
    width: 12,
  },
  bulletText: {
    flex: 1,
  },
  entry: {
    marginBottom: 8,
  },
  rightTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
  },
  rightMeta: {
    color: "#374151",
    fontSize: 10,
    marginBottom: 5,
  },
  workSection: {
    marginTop: 6,
  },
  leftSections: {
    marginTop: 40,
  },
  certificationsSection: {
    marginTop: 15,
  },
  certificationText: {
    fontSize: 10,
    marginBottom: 2,
  },
});
