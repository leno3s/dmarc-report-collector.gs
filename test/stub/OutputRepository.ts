import type { DmarcReport } from "../../src/model/dmarcReport";
import type { IOutputTableRepository } from "../../src/repository/IOutputTableRepository";

export class OutputRepository implements IOutputTableRepository {
  save(dmarcReports: DmarcReport[]): void {}
}
