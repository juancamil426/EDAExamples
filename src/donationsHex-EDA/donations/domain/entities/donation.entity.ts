export class Donation {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: number,
  ) {}
}
