import type { DmarcReport } from "../model/dmarcReport";

export interface IDmarcReportRepository {
  /**
   * Get DMARC Reports.
   */
  getDmarcReports(): DmarcReport[];
}
