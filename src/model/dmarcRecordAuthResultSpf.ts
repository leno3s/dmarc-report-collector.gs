import type { SPFResultType, SpfDomainScope } from "./types";

export class DmarcRecordAuthResultSpf {
  constructor(
    /**
     * The checked domain.
     */
    public readonly domain: string,
    /**
     * The SPF verification result.
     */
    public readonly result: SPFResultType,
    /**
     * The scope of the checked domain.
     */
    public readonly scope?: SpfDomainScope
  ) {}
}
