import type { DmarcRecordPolicyEvaluated } from "./dmarcRecordPolicyEvaluated";

export class DmarcRecordRow {
  constructor(
    /**
     * The connecting IP.
     */
    public readonly sourceIp: string,
    /**
     * The number of matching messages.
     */
    public readonly count: number,
    /**
     * The DMARC disposition applying to matching messages.
     */
    public readonly policyEvaluated: DmarcRecordPolicyEvaluated
  ) {}
}
