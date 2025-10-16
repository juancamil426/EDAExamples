import { DonationCreatedEvent } from '../../../domain/events/donation-created.event';

export interface DonationEventPublisherPort {
  publishDonationCreated(event: DonationCreatedEvent): Promise<void>;
}
