export const cvPdfWorkHistoryStyles = {
  workSection: {
    marginTop: 0,
  },
  workHistoryTitle: {
    marginBottom: 8,
  },
  summaryDivider: {
    borderTop: "1 solid #000000",
    alignSelf: "flex-start",
    marginBottom: 6,
    marginTop: 4,
    width: "100%",
  },
  entry: {
    marginBottom: 0,
  },
  /** Word: 6pt before subsequent job Heading2 (e.g. PowerUs block). */
  workEntryContinued: {
    marginTop: 6,
  },
  bulletRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 2,
    /** List paragraph left 36pt; dot 5pt + gap → text start ≈36pt. */
    paddingLeft: 18,
  },
  /** Drawn dot — avoids Lato subset mapping U+25CF to wrong glyphs (e.g. Ï) in some PDF viewers. */
  bulletDot: {
    backgroundColor: "#000000",
    borderRadius: 2,
    height: 5,
    marginRight: 13,
    marginTop: 3,
    width: 5,
  },
  bulletText: {
    flex: 1,
    fontFamily: "Lato",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 1.12,
  },
} as const;
