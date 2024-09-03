export const config = {
  /**
   * Email address that receives DMARC report.
   */
  targetDestinationAddress: "example@example.com",
  /**
   * It archives email with DMARC report after load it, if it's true.
   */
  isArchiveLoadedEmail: true,
  /**
   * Spreadsheet id of output reports.
   * (e.g. Part "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" if the Spreadsheet URL is "https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit")
   */
  outputSpreadsheetId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  /**
   * Sheet name of output reports.
   */
  outputSheetName: "Sheet 1",
};
