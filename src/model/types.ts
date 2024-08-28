/**
 * Alignment mode (relaxed or strict) for DKIM and SPF.
 */
export type AlignmentType = "r" | "s";
/**
 * The policy actions specified by p and sp in the DMARC record.
 */
export type DispositionType = "none" | "quarantine" | "reject";
/**
 * The DMARC aligned authentication result.
 */
export type DmarcResultType = "pass" | "fail";
/**
 * Reasons that may affect DMARC disposition or execution thereof.
 */
export type PolicyOverrideType =
  | "forwarded"
  | "sampled_out"
  | "trusted_forwarder"
  | "mailing_list"
  | "local_policy"
  | "other";
/**
 * DKIM verification result, according to RFC 7001 Section 2.6.1.
 */
export type DkimResultType =
  | "none"
  | "pass"
  | "fail"
  | "policy"
  | "neutral"
  | "temperror"
  | "permerror";
/**
 * SPF domain scope.
 */
export type SpfDomainScope = "helo" | "mfrom";
/**
 * SPF Result.
 */
export type SPFResultType =
  | "none"
  | "neutral"
  | "pass"
  | "fail"
  | "softfail"
  /**
   * "TempError" commonly implemented as "unknown".
   */
  | "temperror"
  | "unknown"
  /**
   * "PermError" commonly implemented as "error".
   */
  | "permerror"
  | "error";
