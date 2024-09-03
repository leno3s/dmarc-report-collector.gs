import { DmarcPolicyPublished } from "../../src/model/dmarcPolicyPublished";
import { DmarcPolicyOverrideReason } from "../../src/model/dmarcPolicyReason";
import { DmarcRecord } from "../../src/model/dmarcRecord";
import { DmarcRecordAuthResult } from "../../src/model/dmarcRecordAuthResult";
import { DmarcRecordAuthResultDkim } from "../../src/model/dmarcRecordAuthResultDkim";
import { DmarcRecordAuthResultSpf } from "../../src/model/dmarcRecordAuthResultSpf";
import { DmarcRecordIdentifier } from "../../src/model/dmarcRecordIdentifier";
import { DmarcRecordPolicyEvaluated } from "../../src/model/dmarcRecordPolicyEvaluated";
import { DmarcRecordRow } from "../../src/model/dmarcRecordRow";
import { DmarcReport } from "../../src/model/dmarcReport";
import { DmarcReportMetadata } from "../../src/model/dmarcReportMetadata";

export const dmarcReportSample = new DmarcReport(
  new DmarcReportMetadata(
    "example.com",
    "example@example.com",
    "0123456789",
    {
      begin: new Date(),
      end: new Date()
    },
    "here is extra contact info"
  ),
  new DmarcPolicyPublished(
    "example.com",
    "r",
    "r",
    "reject",
    "reject",
    100,
    undefined,
    "reject"
  ),
  [
    new DmarcRecord(
      new DmarcRecordRow(
        "0.0.0.0",
        1,
        new DmarcRecordPolicyEvaluated(
          "reject",
          "pass",
          "pass",
          new DmarcPolicyOverrideReason("other", "here is override reason")
        )
      ),
      new DmarcRecordIdentifier(
        ["example.com"],
        ["example.com"],
        ["example.com"]
      ),
      new DmarcRecordAuthResult(
        [
          new DmarcRecordAuthResultDkim("example.com", "pass", "selector1"),
          new DmarcRecordAuthResultDkim("example.com", "pass", "selector2")
        ],
        [
          new DmarcRecordAuthResultSpf("example.com", "pass"),
          new DmarcRecordAuthResultSpf("subdomain.example.com", "pass")
        ]
      )
    )
  ],
  "1.0"
);
