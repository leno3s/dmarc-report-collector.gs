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
import type { IXmlParseEngine } from "./IXmlParseEngine";
import { XmlParseGasEngine } from "./XmlParseGasEngine";

export class DmarcReportXmlParser {
  private readonly engine: IXmlParseEngine<
    Element | GoogleAppsScript.XML_Service.Element,
    Document | GoogleAppsScript.XML_Service.Document
  >;
  constructor(
    engine?: IXmlParseEngine<
      Element | GoogleAppsScript.XML_Service.Element,
      Document | GoogleAppsScript.XML_Service.Document
    >
  ) {
    this.engine = engine ? engine : new XmlParseGasEngine();
  }
  /**
   * Parse DMARC Report from XML to Object.
   * @param xmlBody
   * @returns
   */
  parse(xmlBody: string): DmarcReport {
    const parsed = this.engine.parse(xmlBody);
    const root = this.engine.getRoot(parsed);

    let version = "";
    const elementVersion = this.engine.getChild(root, "version");
    if (elementVersion) {
      version = this.engine.getValue(elementVersion);
    }
    const elementMetadata = this.engine.getChild(root, "report_metadata")!;
    const metadata = this.parseMetadata(elementMetadata);
    const elementPolicyPublished = this.engine.getChild(
      root,
      "policy_published"
    )!;
    const policyPublished = this.parsePolicyPublished(elementPolicyPublished);
    const elementRecords = this.engine.getChildren(root, "record");
    const records = elementRecords.map((r) => this.parseRecord(r));

    return new DmarcReport(metadata, policyPublished, records, version);
  }

  private parseMetadata(
    metadata: Element | GoogleAppsScript.XML_Service.Element
  ): DmarcReportMetadata {
    const orgName = this.engine.getChildValue(metadata, "org_name");
    const email = this.engine.getChildValue(metadata, "email");
    const reportId = this.engine.getChildValue(metadata, "report_id");
    const dateRange = this.engine.getChild(metadata, "date_range");
    const begin = new Date(
      Number(this.engine.getChildValue(dateRange!, "begin")) * 1000
    );
    const end = new Date(
      Number(this.engine.getChildValue(dateRange!, "end")) * 1000
    );
    const extraContactInfo = this.engine.getChildValue(
      metadata,
      "extra_contact_info"
    );

    return new DmarcReportMetadata(
      orgName,
      email,
      reportId,
      { begin, end },
      extraContactInfo
    );
  }

  private parsePolicyPublished(
    element: Element | GoogleAppsScript.XML_Service.Element
  ): DmarcPolicyPublished {
    const domain = this.engine.getChildValue(element, "domain");
    const adkim = this.engine.getChildValue(element, "adkim") as AlignmentType;
    const aspf = this.engine.getChildValue(element, "aspf") as AlignmentType;
    const p = this.engine.getChildValue(element, "p") as DispositionType;
    const sp = this.engine.getChildValue(element, "sp") as DispositionType;
    const np = this.engine.getChildValue(element, "np") as DispositionType;
    const pct = Number(this.engine.getChildValue(element, "pct"));
    const fo = this.engine.getChildValue(element, "fo");

    return new DmarcPolicyPublished(domain, adkim, aspf, p, sp, pct, fo, np);
  }

  private parseRecord(
    element: Element | GoogleAppsScript.XML_Service.Element
  ): DmarcRecord {
    const elementRow = this.engine.getChild(element, "row")!;
    const sourceIp = this.engine.getChildValue(elementRow, "source_ip");
    const count = Number(this.engine.getChildValue(elementRow, "count"));
    const elementPolicyEvaluated = this.engine.getChild(
      elementRow,
      "policy_evaluated"
    )!;
    const policyEvaluated = this.parsePolicyEvaluated(elementPolicyEvaluated);
    const row = new DmarcRecordRow(sourceIp, count, policyEvaluated);

    const elementIdentifiers = this.engine.getChild(element, "identifiers")!;
    const identifiers = this.parseIdentifier(elementIdentifiers);
    const elementAuthResult = this.engine.getChild(element, "auth_results")!;
    const authResult = this.parseAuthResult(elementAuthResult);

    return new DmarcRecord(row, identifiers, authResult);
  }

  private parsePolicyEvaluated(
    element: Element | GoogleAppsScript.XML_Service.Element
  ): DmarcRecordPolicyEvaluated {
    const disposition = this.engine.getChildValue(
      element,
      "disposition"
    ) as DispositionType;
    const dkim = this.engine.getChildValue(element, "dkim") as DmarcResultType;
    const spf = this.engine.getChildValue(element, "spf") as DmarcResultType;
    const elementReason = this.engine.getChild(element, "reason");
    let reason: DmarcPolicyOverrideReason;
    if (elementReason) {
      const type = this.engine.getChildValue(
        elementReason,
        "type"
      ) as PolicyOverrideType;
      const comment = this.engine.getChildValue(elementReason, "comment");
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
    element: Element | GoogleAppsScript.XML_Service.Element
  ): DmarcRecordIdentifier {
    const elementsHeaderFrom = this.engine.getChildren(element, "header_from");
    const headerFrom = elementsHeaderFrom.map((child) =>
      this.engine.getValue(child)
    );
    const elementsEnvelopeFrom = this.engine.getChildren(
      element,
      "envelope_from"
    );
    const envelopeFrom = elementsEnvelopeFrom.map((child) =>
      this.engine.getValue(child)
    );
    const elementsEnvelopeTo = this.engine.getChildren(element, "envelope_to");
    const envelopeTo = elementsEnvelopeTo.map((child) =>
      this.engine.getValue(child)
    );

    return new DmarcRecordIdentifier(envelopeFrom, envelopeTo, headerFrom);
  }

  private parseAuthResult(
    element: Element | GoogleAppsScript.XML_Service.Element
  ): DmarcRecordAuthResult {
    const elementsDkim = this.engine.getChildren(element, "dkim");
    const dkims = elementsDkim.map((child) => {
      const dkimDomain = this.engine.getChildValue(child, "domain");
      const selector = this.engine.getChildValue(child, "selector");
      const dkimResult = this.engine.getChildValue(
        child,
        "result"
      ) as DkimResultType;
      const humanResult = this.engine.getChildValue(child, "human_result");
      return new DmarcRecordAuthResultDkim(
        dkimDomain,
        dkimResult,
        selector,
        humanResult
      );
    });

    const elementsSpf = this.engine.getChildren(element, "spf");
    const spfs = elementsSpf.map((child) => {
      const spfDomain = this.engine.getChildValue(child, "domain");
      const spfResult = this.engine.getChildValue(
        child,
        "result"
      ) as SPFResultType;
      const scope = this.engine.getChildValue(child, "scope") as SpfDomainScope;
      return new DmarcRecordAuthResultSpf(spfDomain, spfResult, scope);
    });

    return new DmarcRecordAuthResult(dkims, spfs);
  }
}
