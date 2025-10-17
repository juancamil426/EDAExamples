import { Module } from '@nestjs/common';
import { MembershipKafkaConsumerAdapter } from './infrastructure/adapters/in/membership-kafka-consumer.adapter';
import { ActivateMembershipUseCase } from './application/use-cases/activate-membership.usecase';
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
      useClass: ActivateMembershipUseCase,
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
