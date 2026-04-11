export const cvPdfLayoutStyles = {
  page: {
    backgroundColor: "#ffffff",
    color: "#000000",
    flexDirection: "column",
    fontFamily: "Lato",
    fontSize: 10,
    lineHeight: 1.12,
    /** Word `Lucas_Abritta_EM.docx` pgMar (twips/20 ≈ pt). */
    paddingBottom: 26,
    paddingHorizontal: 14,
    /** Word export: “Professional Summary” title ≈ y25 (PyMuPDF); was ~y20 with 20pt padding. */
    paddingTop: 25,
  },
  row: {
    flexDirection: "row",
  },
  /** Top band: sidebar header/contacts + professional summary (matches reference PDF paint order). */
  summaryBandRow: {
    alignItems: "stretch",
    flexDirection: "row",
    minWidth: 0,
    /** Reference CV: second band starts ~y216–218 with Word-like page padding. */
    minHeight: 180,
  },
  /** Lower band: education / certs / projects + work history. */
  lowerBandRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexGrow: 1,
    minWidth: 0,
  },
  /**
   * Sidebar ≈ 3285 twips (164.25pt); use 164pt for Yoga stability. Do **not** use `overflow:
   * hidden` here — it clips multi-line Play Store URLs. Sidebar links use wrapping `Text` inside
   * `Link` plus `formatSidebarUrlForPdf` (`text-format.ts`, `left-column/projects.tsx`).
   */
  leftColumn: {
    flexDirection: "column",
    flexShrink: 0,
    marginRight: 8.6,
    maxWidth: 164,
    minWidth: 164,
    paddingHorizontal: 3.6,
    width: 164,
  },
  /** Fills space under contacts so the sidebar aligns with the summary block height. */
  leftColumnBandFill: {
    flexGrow: 1,
  },
  rightColumn: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 5,
    paddingTop: 0,
  },
  sectionBlock: {
    marginTop: 14,
  },
} as const;
