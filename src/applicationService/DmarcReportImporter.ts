import { GmailDmarcReportRepository } from "../repository/GmailDmarcReportRepository";
import type { IDmarcReportRepository } from "../repository/IDmarcReportRepository";
import type { IOutputTableRepository } from "../repository/IOutputTableRepository";
import { OutputSheetRepository } from "../repository/OutputSheetRepository";

export class DmarcReportImporter {
  private readonly inputRepository: IDmarcReportRepository;
  private readonly outputRepository: IOutputTableRepository;
  constructor(
    inputRepository?: IDmarcReportRepository,
    outputRepository?: IOutputTableRepository
  ) {
    this.inputRepository = inputRepository
      ? inputRepository
      : new GmailDmarcReportRepository();
    this.outputRepository = outputRepository
      ? outputRepository
      : new OutputSheetRepository();
  }

  /**
   * Import to output repository from xml reports.
   */
  execute() {
    const reports = this.inputRepository.getDmarcReports();
    console.log(
      `[DmarcReportImporter#execute] Loaded ${reports.length} reports.`
    );
    if (reports.length <= 0) {
      console.log(
        "[DmarcReportImporter#execute] There are not new DMARC report. exit."
      );
      return;
    }
    this.outputRepository.save(reports);
  }
}
