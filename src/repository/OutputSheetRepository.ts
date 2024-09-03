import { config } from "../001_config";
import type { DmarcReport } from "../model/dmarcReport";
import type { IDmarcReportNormalizer } from "../presentation/IDmarcReportNormalizer";
import type { IOutputTableRepository } from "./IOutputTableRepository";

export class OutputSheetRepository implements IOutputTableRepository {
  private readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  private readonly sheet: GoogleAppsScript.Spreadsheet.Sheet;

  constructor(private readonly normalizer: IDmarcReportNormalizer) {
    console.log(
      `[OutputSheetRepository#constructor] Open spreadsheet with id: ${config.outputSpreadsheetId}`
    );
    this.spreadsheet = SpreadsheetApp.openById(config.outputSpreadsheetId);
    console.log(
      `[OutputSheetRepository#constructor] Open sheet with name: ${config.outputSheetName}`
    );
    const sheet = this.spreadsheet.getSheetByName(config.outputSheetName);
    if (!sheet) {
      throw new Error(`Can't opened output sheet ${config.outputSheetName}`);
    }
    this.sheet = sheet;
  }

  save(dmarcReports: DmarcReport[]): void {
    console.log(
      `[OutputSheetRepository#save] Received ${dmarcReports.length} reports.`
    );
    const buffer = dmarcReports.flatMap((r) => this.normalizer.execute(r));
    console.log(
      `[OutputSheetRepository#save] Normalized ${buffer.length} records.`
    );
    const targetRow = this.sheet.getLastRow() + 1;
    const range = this.sheet.getRange(
      targetRow,
      1,
      buffer.length,
      buffer[0].length
    );
    range.setValues(buffer);
  }
}
