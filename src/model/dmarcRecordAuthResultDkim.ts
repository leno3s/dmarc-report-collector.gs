import type { DkimResultType } from "./types";

export class DmarcRecordAuthResultDkim {
  constructor(
    /**
     * The "d=" parameter in the signature.
     */
    public readonly domain: string,
    /**
     * The DKIM verification result.
     */
    public readonly result: DkimResultType,
    /**
     * The "s=" parameter in the signature.
     */
    public readonly selector?: string,
    /**
     * Any extra information (e.g. from Authentication-Results).
     */
    public readonly humanResult?: string
  ) {}
}
