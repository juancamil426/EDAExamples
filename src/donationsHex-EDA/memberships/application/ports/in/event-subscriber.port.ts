import { DonationCreatedEvent } from '../../../../donations/domain/events/donation-created.event';

export interface EventSubscriberPort {
  onDonationCreated(event: DonationCreatedEvent): Promise<void>;
}
