import type { DmarcRecordAuthResultDkim } from "./dmarcRecordAuthResultDkim";
import type { DmarcRecordAuthResultSpf } from "./dmarcRecordAuthResultSpf";

/**
 * This element contains DKIM and SPF results, uninterpreted with respect to DMARC.
 */
export class DmarcRecordAuthResult {
  constructor(
    /**
     * There may be no DKIM signatures, or multiple DKIM signatures.
     */
    public readonly dkim: DmarcRecordAuthResultDkim[],
    /**
     * There will always be at least one SPF result.
     */
    public readonly spf: DmarcRecordAuthResultSpf[]
  ) {}
}
