export class Config {
  /**
   * Email address that receives DMARC report.
   */
  public static targetDestinationAddress = "example@example.com";
  /**
   * It archives email with DMARC report after load it, if it's true.
   */
  public static isArchiveLoadedEmail = true;
  /**
   * Spreadsheet id of output reports.
   * (e.g. Part "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" if the Spreadsheet URL is "https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit")
   */
  public static outputSpreadsheetId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  /**
   * Sheet name of output reports.
   */
  public static outputSheetName = "Sheet 1";
}
