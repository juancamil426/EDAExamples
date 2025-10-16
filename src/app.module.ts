import { Module } from '@nestjs/common';
import { PaymentsModule } from './paymentsEDA/payments/payments.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './paymentsEDA/notifications/notifications.module';
import { DonationsModule } from './donationsHex-EDA/donations/donations.module';
import { MembershipsModule } from './donationsHex-EDA/memberships/memberships.module';

@Module({
  imports: [
    PaymentsModule,
    NotificationsModule,
    DonationsModule,
    MembershipsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
