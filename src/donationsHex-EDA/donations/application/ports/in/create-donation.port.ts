import { Donation } from '../../../domain/entities/donation.entity';

export interface CreateDonationPort {
  createDonation(dto: { userId: string; amount: number }): Promise<Donation>;
}
