import { Inject, Injectable } from '@nestjs/common';
import { CreateDonationPort } from '../ports/in/create-donation.port';
import { DonationEventPublisherPort } from '../ports/out/donation-event-publisher.port';
import { Donation } from '../../domain/entities/donation.entity';
import { DonationCreatedEvent } from '../../domain/events/donation-created.event';

@Injectable()
export class CreateDonationUseCase implements CreateDonationPort {
  constructor(
    @Inject('DonationEventPublisherPort')
    private readonly eventPublisher: DonationEventPublisherPort,
  ) {}

  async createDonation(dto: {
    userId: string;
    amount: number;
  }): Promise<Donation> {
    const donation = new Donation(
      Date.now().toString(),
      dto.userId,
      dto.amount,
    );

    const event = new DonationCreatedEvent(
      donation.id,
      donation.userId,
      donation.amount,
    );

    await this.eventPublisher.publishDonationCreated(event);

    return donation;
  }
}
