export class DonationCreatedEvent {
  constructor(
    public readonly donationId: string,
    public readonly userId: string,
    public readonly amount: number,
  ) {}
}
