/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, Logger } from '@nestjs/common';
import { DonationEventPublisherPort } from '../../../application/ports/out/donation-event-publisher.port';
import { DonationCreatedEvent } from '../../../domain/events/donation-created.event';
import { Kafka } from 'kafkajs';

@Injectable()
export class DonationKafkaEventAdapter implements DonationEventPublisherPort {
  private readonly logger = new Logger(DonationKafkaEventAdapter.name);
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });
  private readonly producer = this.kafka.producer();

  async publishDonationCreated(event: DonationCreatedEvent): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic: 'donation-created',
      messages: [{ value: JSON.stringify(event) }],
    });
    this.logger.debug(`Published event: ${JSON.stringify(event)}`);
    await this.producer.disconnect();
  }
}
