/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { EventSubscriberPort } from '../../../application/ports/in/event-subscriber.port';
import { ActivateMembershipPortIn } from '../../../application/ports/in/activate-membership.port';
import { DonationCreatedEvent } from '../../../../donations/domain/events/donation-created.event';

@Injectable()
export class MembershipKafkaConsumerAdapter
  implements EventSubscriberPort<DonationCreatedEvent>, OnModuleInit
{
  private readonly logger = new Logger(MembershipKafkaConsumerAdapter.name);
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });
  private readonly consumer = this.kafka.consumer({
    groupId: 'membership-group',
  });

  constructor(
    @Inject('ActivateMembershipPortIn')
    private readonly activateMembershipPortIn: ActivateMembershipPortIn,
  ) {}

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'donation-created' });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const event: DonationCreatedEvent = JSON.parse(
          message.value?.toString() || '',
        );
        this.logger.debug(`Received event: ${JSON.stringify(event)}`);
        await this.handle(event);
      },
    });
  }

  async handle(event: DonationCreatedEvent): Promise<void> {
    await this.activateMembershipPortIn.activate(
      event.donationId,
      event.userId,
    );
  }
}
