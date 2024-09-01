import type { DmarcReport } from "../model/dmarcReport";

export interface IOutputTableRepository {
  /**
   * Save DMARC reports to table.
   * @param dmarcReport
   */
  save(dmarcReports: DmarcReport[]): void;
}
