import { StyleSheet } from "@react-pdf/renderer";
import { cvPdfLayoutStyles } from "@/components/cv-pdf/styles/layout";
import { cvPdfLeftColumnStyles } from "@/components/cv-pdf/styles/left-column";
import { cvPdfTypographyStyles } from "@/components/cv-pdf/styles/typography";
import { cvPdfWorkHistoryStyles } from "@/components/cv-pdf/styles/work-history";

export const cvPdfStyles = StyleSheet.create({
  ...cvPdfLayoutStyles,
  ...cvPdfTypographyStyles,
  ...cvPdfLeftColumnStyles,
  ...cvPdfWorkHistoryStyles,
});
