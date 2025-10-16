import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaymentCompletedEvent } from '../events/payment-completed.event';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentsService {
  constructor(private eventEmitter: EventEmitter2) {}

  processPayment(payload: {
    paymentId: string;
    userId: string;
    userEmail: string;
    amount: number;
    currency: string;
  }) {
    const event = new PaymentCompletedEvent(
      uuidv4(),
      payload.paymentId,
      payload.userId,
      payload.userEmail,
      payload.amount,
      payload.currency,
      { source: 'payments-service' },
    );

    this.eventEmitter.emit('payment.completed', event);

    return { status: 'OK' };
  }
}
