import { Config } from "../001_config";
import type { DmarcReport } from "../model/dmarcReport";
import { DmarcReportNormalizer } from "../presentation/DmarcReportNormalizer";
import type { IDmarcReportNormalizer } from "../presentation/IDmarcReportNormalizer";
import type { IOutputTableRepository } from "./IOutputTableRepository";

export class OutputSheetRepository implements IOutputTableRepository {
  private readonly spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  private readonly sheet: GoogleAppsScript.Spreadsheet.Sheet;
  private readonly normalizer: IDmarcReportNormalizer;
  constructor(normalizer?: IDmarcReportNormalizer) {
    this.normalizer = normalizer ? normalizer : new DmarcReportNormalizer();

    console.log(
      `[OutputSheetRepository#constructor] Open spreadsheet with id: ${Config.outputSpreadsheetId}`
    );
    this.spreadsheet = SpreadsheetApp.openById(
      Config.outputSpreadsheetId
    );

    console.log(
      `[OutputSheetRepository#constructor] Open sheet with name: ${Config.outputSheetName}`
    );
    const sheet = this.spreadsheet.getSheetByName(
      Config.outputSheetName
    );
    if (!sheet) {
      throw new Error(
        `Can't opened output sheet ${Config.outputSheetName}`
      );
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
