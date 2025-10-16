export class PaymentCompletedEvent {
  constructor(
    public readonly eventId: string,
    public readonly paymentId: string,
    public readonly userId: string,
    public readonly userEmail: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly meta?: Record<string, unknown>,
  ) {}
}
