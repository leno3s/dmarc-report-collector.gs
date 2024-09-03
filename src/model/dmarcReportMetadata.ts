type DateRangeType = {
  begin: Date;
  end: Date;
};

/**
 * Report generator metadata.
 */
export class DmarcReportMetadata {
  constructor(
    public readonly orgName: string,
    public readonly email: string,
    public readonly reportId: string,
    public readonly dateRange: DateRangeType,
    public readonly extraContactInfo?: string
  ) {}
}
