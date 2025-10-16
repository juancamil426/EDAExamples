import { Module } from '@nestjs/common';
import { DonationsController } from './infrastructure/adapters/in/donations.controller';
import { DonationKafkaEventAdapter } from './infrastructure/adapters/out/donation-kafka-event.adapter';
import { CreateDonationService } from './application/use-cases/create-donation.service';

@Module({
  controllers: [DonationsController],
  providers: [
    DonationKafkaEventAdapter,
    CreateDonationService,
    {
      provide: 'CreateDonationPort',
      useClass: CreateDonationService,
    },
    {
      provide: 'DonationEventPublisherPort',
      useClass: DonationKafkaEventAdapter,
    },
  ],
  exports: ['CreateDonationPort'],
})
export class DonationsModule {}
