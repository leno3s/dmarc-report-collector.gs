import * as fs from "fs";
import { beforeAll, describe, expect, test } from "vitest";
import { DmarcReportXmlParser } from "../../src/domainService/DmarcReportXmlParser";
import { XmlParserNodeEngine } from "./XmlParserNodeEngine";

describe("DmarcReportXmlParser", () => {
  const engine = new XmlParserNodeEngine();
  const parser = new DmarcReportXmlParser(engine);
  const body = fs.readFileSync("./test/sampleData/report_normal.xml").toString();
  const bodyLeast = fs.readFileSync("./test/sampleData/report_least_needed.xml").toString();

  test("can parse normal", () => {
    const dmarcReport = parser.parse(body);
    expect(dmarcReport).not.toBeNull();
    expect(dmarcReport.records).not.toBeNull();
    expect(dmarcReport.reportMetadata.orgName).toBe("example.com");
  });

  test("can parse least items", () => {
    const dmarcReport = parser.parse(bodyLeast);
    expect(dmarcReport).not.toBeNull();
    expect(dmarcReport.records).not.toBeNull();
    expect(dmarcReport.reportMetadata.orgName).toBe("example.com");
  });
});
