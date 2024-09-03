import { describe, expect, test } from "vitest";
import { DmarcReportNormalizer } from "../../src/presentation/DmarcReportNormalizer";
import { dmarcReportSample } from "../sampleData/DmarcReportSample";

describe("DmarcReportNormalizer", () => {
  const normalizer = new DmarcReportNormalizer();
  const report = dmarcReportSample;

  test("can normalize", () => {
    const result = normalizer.execute(report);
    expect(result).not.toBeFalsy();
  });

  test("result is Array<Array<CellType>>", () => {
    const result = normalizer.execute(report);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(Array);
  });

  test("types of values in array is in string, number, or Date", () => {});

  test("result not include undefined", () => {});
});
