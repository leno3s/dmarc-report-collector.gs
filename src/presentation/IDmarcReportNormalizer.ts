import type { DmarcReport } from "../model/dmarcReport";

export type DmarcReportNormalized = (string | number | Date)[];

export interface IDmarcReportNormalizer {
  /**
   * Normalize DMARC Report object as array.
   * @param dmarcReport
   * @returns Array of normalized report that length equals count of `/feedback/record/`.
   */
  execute(dmarcReport: DmarcReport): DmarcReportNormalized[];
}
