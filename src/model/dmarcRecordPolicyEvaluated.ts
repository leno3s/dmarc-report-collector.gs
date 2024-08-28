import type { DispositionType, DmarcResultType } from "./types";
import type { DmarcPolicyOverrideReason } from "./dmarcPolicyReason";

/**
 * Taking into account everything else in the record, the results of applying DMARC.
 */
export class DmarcRecordPolicyEvaluated {
  constructor(
    public readonly disposition: DispositionType,
    public readonly dkim: DmarcResultType,
    public readonly spf: DmarcResultType,
    public readonly reason?: DmarcPolicyOverrideReason
  ) {}
}
