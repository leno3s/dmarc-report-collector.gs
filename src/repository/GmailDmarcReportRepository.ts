import { Config } from "../001_config";
import { DmarcReportXmlParser } from "../domainService/DmarcReportXmlParser";
import type { IXmlParseEngine } from "../domainService/IXmlParseEngine";
import { XmlParseGasEngine } from "../domainService/XmlParseGasEngine";
import type { DmarcReport } from "../model/dmarcReport";
import type { IDmarcReportRepository } from "./IDmarcReportRepository";

export class GmailDmarcReportRepository implements IDmarcReportRepository {
  private readonly engine: IXmlParseEngine<
    GoogleAppsScript.XML_Service.Element,
    GoogleAppsScript.XML_Service.Document
  >;
  constructor(
    engine?: IXmlParseEngine<
      GoogleAppsScript.XML_Service.Element,
      GoogleAppsScript.XML_Service.Document
    >
  ) {
    if (engine) {
      this.engine = engine;
    } else {
      this.engine = new XmlParseGasEngine();
    }
  }

  public getDmarcReports(): DmarcReport[] {
    // query documentation: https://support.google.com/mail/answer/7190
    const query = `in:inbox to: ${Config.targetDestinationAddress}`;
    console.log(
      `[GmailRepository] search mails with report by query: ${query}`
    );
    const threads = GmailApp.search(query);
    console.log(`[GmailRepository] found ${threads.length} threads.`);

    const attachments = threads
      .flatMap((thread) => {
        return thread.getMessages().flatMap((message) => {
          return message.getAttachments();
        });
      })
      .filter((a) => a);
    console.log(`[GmailRepository] found ${attachments.length} attachments.`);

    const xmls = attachments
      .map((attachment) => {
        const blobs = attachment.copyBlob();
        try {
          return this.zipToXml(blobs);
        } catch (e) {
          console.error(
            "[GmailRepository] Error occurred during converting zip attachment to xml file."
          );
          console.error(e);
        }
      })
      .filter((r): r is Exclude<typeof r, undefined> => r !== undefined);
    console.log(`[GmailRepository] found ${xmls.length} reports.`);

    const parser = new DmarcReportXmlParser(this.engine);
    const reports = xmls.map((xml) => parser.parse(xml));

    if (Config.isArchiveLoadedEmail) {
      GmailApp.moveThreadsToArchive(threads);
    }

    return reports;
  }

  private zipToXml(blobs: GoogleAppsScript.Base.Blob) {
    const zip = blobs.getAs("application/zip");
    const inflated = Utilities.unzip(zip);
    const xmls = inflated.map((blob) => blob.getDataAsString());
    return xmls.join("");
  }
}
