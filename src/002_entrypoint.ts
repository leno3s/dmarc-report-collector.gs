import { DmarcReportImporter } from "./applicationService/DmarcReportImporter";

/**
 * main entrypoint: Import DMARC reports to output sheet from inbox.
 */
export function main() {
  const importer = new DmarcReportImporter();
  importer.execute();
}
