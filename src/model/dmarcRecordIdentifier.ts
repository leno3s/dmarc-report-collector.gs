export class DmarcRecordIdentifier {
  constructor(
    /**
     * The envelope recipient domain.
     */
    public readonly envelope_to: string[],
    /**
     * The RFC5321.MailFrom domain.
     */
    public readonly envelope_from: string[],
    /**
     * The RFC5322.From domain.
     */
    public readonly header_from: string[]
  ) {}
}
