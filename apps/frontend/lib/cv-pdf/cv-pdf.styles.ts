import { StyleSheet } from "@react-pdf/renderer";

/** Layout for @react-pdf/renderer (parallel token names in `cv-pdf.css`). */
export const cvPdfStyles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: "#374151",
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  bullet: {
    marginBottom: 2,
    lineHeight: 1.3,
  },
});
