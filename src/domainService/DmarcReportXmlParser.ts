import { DmarcPolicyPublished } from "../model/dmarcPolicyPublished";
import { DmarcPolicyOverrideReason } from "../model/dmarcPolicyReason";
import { DmarcRecord } from "../model/dmarcRecord";
import { DmarcRecordAuthResult } from "../model/dmarcRecordAuthResult";
import { DmarcRecordAuthResultDkim } from "../model/dmarcRecordAuthResultDkim";
import { DmarcRecordAuthResultSpf } from "../model/dmarcRecordAuthResultSpf";
import { DmarcRecordIdentifier } from "../model/dmarcRecordIdentifier";
import { DmarcRecordPolicyEvaluated } from "../model/dmarcRecordPolicyEvaluated";
import { DmarcRecordRow } from "../model/dmarcRecordRow";
import { DmarcReport } from "../model/dmarcReport";
import { DmarcReportMetadata } from "../model/dmarcReportMetadata";
import type {
  AlignmentType,
  DispositionType,
  DkimResultType,
  DmarcResultType,
  PolicyOverrideType,
  SPFResultType,
  SpfDomainScope
} from "../model/types";

export class DmarcReportXmlParser {
  /**
   * Parse DMARC Report from XML to Object.
   * @param xmlBody
   * @returns
   */
  parse(xmlBody: string): DmarcReport {
    const parsed = XmlService.parse(xmlBody);
    const root = parsed.getRootElement();

    let version = "";
    const elementVersion = root.getChild("version");
    if (elementVersion) {
      version = elementVersion.getValue();
    }
    const elementMetadata = root.getChild("report_metadata");
    const metadata = this.parseMetadata(elementMetadata);
    const elementPolicyPublished = root.getChild("policy_published");
    const policyPublished = this.parsePolicyPublished(elementPolicyPublished);
    const elementRecords = root.getChildren("record");
    const records = elementRecords.map((r) => this.parseRecord(r));

    return new DmarcReport(metadata, policyPublished, records, version);
  }

  private parseMetadata(
    elementMetadata: GoogleAppsScript.XML_Service.Element
  ): DmarcReportMetadata {
    const orgName = elementMetadata.getChild("org_name").getValue();
    const email = elementMetadata.getChild("email").getValue();
    const reportId = elementMetadata.getChild("report_id").getValue();
    const dateRange = elementMetadata.getChild("date_range");
    const begin = new Date(
      Number(dateRange.getChild("begin").getValue()) * 1000
    );
    const end = new Date(Number(dateRange.getChild("end").getValue()) * 1000);
    const extraContactInfo = elementMetadata
      .getChild("extra_contact_info")
      .getValue();

    return new DmarcReportMetadata(
      orgName,
      email,
      reportId,
      { begin, end },
      extraContactInfo
    );
  }

  private parsePolicyPublished(
    elementPolicyPublished: GoogleAppsScript.XML_Service.Element
  ): DmarcPolicyPublished {
    const domain = elementPolicyPublished.getChild("domain").getValue();
    const adkim = elementPolicyPublished
      .getChild("adkim")
      .getValue() as AlignmentType;
    const aspf = elementPolicyPublished
      .getChild("aspf")
      .getValue() as AlignmentType;
    const p = elementPolicyPublished
      .getChild("p")
      .getValue() as DispositionType;
    const sp = elementPolicyPublished
      .getChild("sp")
      .getValue() as DispositionType;
    const np = elementPolicyPublished
      .getChild("np")
      ?.getValue() as DispositionType;
    const pct = Number(elementPolicyPublished.getChild("pct").getValue());
    const fo = elementPolicyPublished.getChild("fo")?.getValue();

    return new DmarcPolicyPublished(domain, adkim, aspf, p, sp, pct, fo, np);
  }

  private parseRecord(
    elementRecord: GoogleAppsScript.XML_Service.Element
  ): DmarcRecord {
    const elementRow = elementRecord.getChild("row");
    const sourceIp = elementRow.getChild("source_ip").getValue();
    const count = Number(elementRow.getChild("count").getValue());
    const elementPolicyEvaluated = elementRow.getChild("policy_evaluated");
    const policyEvaluated = this.parsePolicyEvaluated(elementPolicyEvaluated);
    const row = new DmarcRecordRow(sourceIp, count, policyEvaluated);

    const elementIdentifiers = elementRecord.getChild("identifiers");
    const identifiers = this.parseIdentifier(elementIdentifiers);
    const elementAuthResult = elementRecord.getChild("auth_results");
    const authResult = this.parseAuthResult(elementAuthResult);

    return new DmarcRecord(row, identifiers, authResult);
  }

  private parsePolicyEvaluated(
    elementPolicyEvaluated: GoogleAppsScript.XML_Service.Element
  ): DmarcRecordPolicyEvaluated {
    const disposition = elementPolicyEvaluated
      .getChild("disposition")
      .getValue() as DispositionType;
    const dkim = elementPolicyEvaluated
      .getChild("dkim")
      .getValue() as DmarcResultType;
    const spf = elementPolicyEvaluated
      .getChild("spf")
      .getValue() as DmarcResultType;
    const elementReason = elementPolicyEvaluated.getChild("reason");
    let reason: DmarcPolicyOverrideReason;
    if (elementReason) {
      const type = elementReason
        .getChild("type")
        .getValue() as PolicyOverrideType;
      const comment = elementReason.getChild("comment").getValue();
      reason = new DmarcPolicyOverrideReason(type, comment);
    }
    return new DmarcRecordPolicyEvaluated(
      disposition,
      dkim,
      spf,
      //@ts-expect-error
      reason
    );
  }

  private parseIdentifier(
    elementIdentifier: GoogleAppsScript.XML_Service.Element
  ): DmarcRecordIdentifier {
    const elementsHeaderFrom = elementIdentifier.getChildren("header_from");
    const headerFrom = elementsHeaderFrom.map((element) => element.getValue());
    const elementsEnvelopeFrom = elementIdentifier.getChildren("envelope_from");
    const envelopeFrom = elementsEnvelopeFrom.map((element) =>
      element.getValue()
    );
    const elementsEnvelopeTo = elementIdentifier.getChildren("envelope_to");
    const envelopeTo = elementsEnvelopeTo.map((element) => element.getValue());

    return new DmarcRecordIdentifier(envelopeFrom, envelopeTo, headerFrom);
  }

  private parseAuthResult(
    elementAuthResult: GoogleAppsScript.XML_Service.Element
  ): DmarcRecordAuthResult {
    const elementsDkim = elementAuthResult.getChildren("dkim");
    const dkims = elementsDkim.map((element) => {
      const dkimDomain = element.getChild("domain").getValue();
      const selector = element.getChild("selector").getValue();
      const dkimResult = element
        .getChild("result")
        .getValue() as DkimResultType;
      const humanResult = element.getChild("human_result")?.getValue();
      return new DmarcRecordAuthResultDkim(
        dkimDomain,
        dkimResult,
        selector,
        humanResult
      );
    });

    const elementsSpf = elementAuthResult.getChildren("spf");
    const spfs = elementsSpf.map((element) => {
      const spfDomain = element.getChild("domain").getValue();
      const spfResult = element.getChild("result").getValue() as SPFResultType;
      const scope = element.getChild("scope")?.getValue() as SpfDomainScope;
      return new DmarcRecordAuthResultSpf(spfDomain, spfResult, scope);
    });

    return new DmarcRecordAuthResult(dkims, spfs);
  }
}
