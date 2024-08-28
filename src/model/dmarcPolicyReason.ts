import type { PolicyOverrideType } from "./types";

/**
 * How do we allow report generators to include new classes of override reasons if they want to be more specific than "other"?
 */
export class DmarcPolicyOverrideReason {
  constructor(
    public readonly type: PolicyOverrideType,
    public readonly comment?: string
  ) {}
}
