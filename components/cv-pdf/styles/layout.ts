export const cvPdfLayoutStyles = {
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
  sectionBlock: {
    marginTop: 14,
  },
} as const;
