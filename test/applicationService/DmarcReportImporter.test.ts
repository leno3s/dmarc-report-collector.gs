import { beforeAll, beforeEach, describe, expect, test, vitest } from "vitest";
import { DmarcReportImporter } from "../../src/applicationService/DmarcReportImporter";
import { InputRepository } from "../stub/InputRepository";
import { OutputRepository } from "../stub/OutputRepository";

describe("DmarcReportImporter", () => {
  const inputRepository = new InputRepository();
  const outputRepository = new OutputRepository();

  test("can execute normally", () => {
    const spySave = vitest.spyOn(outputRepository, "save");
    const importer = new DmarcReportImporter(inputRepository, outputRepository);
    importer.execute();
    expect(spySave).toBeCalledTimes(1);
  });

  test("do not save if the reports count is zero", () => {
    const spySave = vitest.spyOn(outputRepository, "save");
    const spyGetReports = vitest
      .spyOn(InputRepository.prototype, "getDmarcReports")
      .mockImplementation(() => []);

    const importer = new DmarcReportImporter(inputRepository, outputRepository);
    importer.execute();
    expect(spySave).toBeCalledTimes(0);
  });
});
