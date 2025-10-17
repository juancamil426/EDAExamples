import { Module } from '@nestjs/common';
import { DonationsController } from './infrastructure/adapters/in/donations.controller';
import { DonationKafkaEventAdapter } from './infrastructure/adapters/out/donation-kafka-event.adapter';
import { CreateDonationUseCase } from './application/use-cases/create-donation.usecase';

@Module({
  controllers: [DonationsController],
  providers: [
    DonationKafkaEventAdapter,
    CreateDonationUseCase,
    {
      provide: 'CreateDonationPort',
      useClass: CreateDonationUseCase,
    },
    {
      provide: 'DonationEventPublisherPort',
      useClass: DonationKafkaEventAdapter,
    },
  ],
  exports: ['CreateDonationPort'],
})
export class DonationsModule {}
