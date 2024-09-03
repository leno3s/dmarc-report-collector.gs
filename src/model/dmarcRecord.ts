import type { DmarcRecordAuthResult } from "./dmarcRecordAuthResult";
import type { DmarcRecordIdentifier } from "./dmarcRecordIdentifier";
import type { DmarcRecordRow } from "./dmarcRecordRow";

/**
 * This element contains all the authentication results that
 * were evaluated by the receiving system for the given set of messages.
 */
export class DmarcRecord {
  constructor(
    public readonly row: DmarcRecordRow,
    public readonly identifiers: DmarcRecordIdentifier,
    public readonly authResult: DmarcRecordAuthResult
  ) {}
}
