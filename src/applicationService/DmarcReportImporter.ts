import type { IDmarcReportRepository } from "../repository/IDmarcReportRepository";
import type { IOutputTableRepository } from "../repository/IOutputTableRepository";

export class DmarcReportImporter {
  constructor(
    private readonly inputRepository: IDmarcReportRepository,
    private readonly outputRepository: IOutputTableRepository
  ) {}

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
