import type { AlignmentType, DispositionType } from "./types";

/**
 * The DMARC policy that applied to the messages in this report.
 */
export class DmarcPolicyPublished {
  constructor(
    /**
     * The domain at which the DMARC record was found.
     */
    public readonly domain: string,
    /**
     * The DKIM alignment mode.
     */
    public readonly adkim: AlignmentType,
    /**
     * The SPF alignment mode.
     */
    public readonly aspf: AlignmentType,
    /**
     * The policy to apply to messages from the domain.
     */
    public readonly p: DispositionType,
    /**
     * The policy to apply to messages from the subdomains.
     */
    public readonly sp: DispositionType,
    /**
     * The percent of messages to which policy applies.
     */
    public readonly pct: number,
    /**
     * Failure reporting options in effect.
     */
    public readonly fo?: string,
    /**
     * The policy to apply to messages from non-existent subdomains.
     */
    public readonly np?: DispositionType
  ) {}
}
