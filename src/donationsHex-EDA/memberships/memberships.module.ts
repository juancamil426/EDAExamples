import { Module } from '@nestjs/common';
import { MembershipKafkaConsumerAdapter } from './infrastructure/adapters/in/membership-kafka-consumer.adapter';
import { ActivateMembershipService } from './application/use-cases/activate-membership.service';
import { MembershipRepository } from './infrastructure/adapters/out/membership.repository';
import { ActivateMembershipPortIn } from './application/ports/in/activate-membership.port';

@Module({
  controllers: [],
  providers: [
    {
      provide: 'MembershipRepositoryPort',
      useClass: MembershipRepository,
    },
    {
      provide: 'ActivateMembershipPortIn',
      useClass: ActivateMembershipService,
    },
    {
      provide: 'EventSubscriberPort',
      useClass: MembershipKafkaConsumerAdapter,
    },
    {
      provide: MembershipKafkaConsumerAdapter,
      useFactory: (activateMembershipPortIn: ActivateMembershipPortIn) => {
        return new MembershipKafkaConsumerAdapter(activateMembershipPortIn);
      },
      inject: ['ActivateMembershipPortIn'],
    },
  ],
})
export class MembershipsModule {}
