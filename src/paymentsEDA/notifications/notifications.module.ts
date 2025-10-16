import { Module } from '@nestjs/common';
import { NotificationsHandler } from './notifications.handler';

@Module({
  imports: [],
  providers: [NotificationsHandler],
})
export class NotificationsModule {}
