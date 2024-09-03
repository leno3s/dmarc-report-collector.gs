import type { DmarcReport } from "../model/dmarcReport";
import type {
  DmarcReportNormalized,
  IDmarcReportNormalizer
} from "./IDmarcReportNormalizer";

export class DmarcReportNormalizer implements IDmarcReportNormalizer {
  execute(dmarcReport: DmarcReport): DmarcReportNormalized[] {
    console.log(
      `[DmarcReportNormalizer#execute] Received report have ${dmarcReport.records.length} records.`
    );
    return dmarcReport.records.map((record) => {
      return [
        dmarcReport.version ?? "",
        dmarcReport.reportMetadata.orgName,
        dmarcReport.reportMetadata.email,
        dmarcReport.reportMetadata.extraContactInfo ?? "",
        dmarcReport.reportMetadata.reportId,
        dmarcReport.reportMetadata.dateRange.begin,
        dmarcReport.reportMetadata.dateRange.end,
        dmarcReport.policyPublished.domain,
        dmarcReport.policyPublished.adkim,
        dmarcReport.policyPublished.aspf,
        dmarcReport.policyPublished.p,
        dmarcReport.policyPublished.sp,
        dmarcReport.policyPublished.pct,
        dmarcReport.policyPublished.fo ?? "",
        dmarcReport.policyPublished.np ?? "",
        record.row.sourceIp,
        record.row.count,
        record.row.policyEvaluated.disposition,
        record.row.policyEvaluated.dkim,
        record.row.policyEvaluated.spf,
        record.row.policyEvaluated.reason?.type ?? "",
        record.row.policyEvaluated.reason?.comment ?? "",
        record.identifiers.envelope_to.join(","),
        record.identifiers.envelope_from?.join(","),
        record.identifiers.header_from?.join(","),
        record.authResult.dkim.map((dkim) => dkim.domain).join("\n"),
        record.authResult.dkim.map((dkim) => dkim.result).join("\n"),
        record.authResult.dkim.map((dkim) => dkim.selector ?? "").join("\n"),
        record.authResult.dkim.map((dkim) => dkim.humanResult ?? "").join("\n"),
        record.authResult.spf.map((spf) => spf.domain).join("\n"),
        record.authResult.spf.map((spf) => spf.result).join("\n"),
        record.authResult.spf.map((spf) => spf.scope ?? "").join("\n")
      ];
    });
  }
}
