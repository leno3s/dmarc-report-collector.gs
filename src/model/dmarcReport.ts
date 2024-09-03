import type { DmarcPolicyPublished } from "./dmarcPolicyPublished";
import type { DmarcRecord } from "./dmarcRecord";
import type { DmarcReportMetadata } from "./dmarcReportMetadata";

export class DmarcReport {
  constructor(
    public readonly reportMetadata: DmarcReportMetadata,
    public readonly policyPublished: DmarcPolicyPublished,
    public readonly records: DmarcRecord[],
    public readonly version?: string
  ) {}
}
