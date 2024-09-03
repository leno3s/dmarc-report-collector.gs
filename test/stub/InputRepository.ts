import type { DmarcReport } from "../../src/model/dmarcReport";
import type { IDmarcReportRepository } from "../../src/repository/IDmarcReportRepository";
import { dmarcReportSample } from "../sampleData/DmarcReportSample";

export class InputRepository implements IDmarcReportRepository {
  getDmarcReports(): DmarcReport[] {
    return [dmarcReportSample];
  }
}
