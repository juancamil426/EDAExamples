import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentCompletedEvent } from '../payments/events/payment-completed.event';

@Injectable()
export class NotificationsHandler {
  private readonly logger = new Logger(NotificationsHandler.name);

  @OnEvent('payment.completed')
  handlePaymentCompleted(event: PaymentCompletedEvent) {
    this.logger.debug(
      `Handling payment.completed for paymentId=${event.paymentId}, user=${event.userEmail}`,
    );
  }
}
