import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('process')
  processPayment(
    @Body()
    body: {
      paymentId: string;
      userId: string;
      userEmail: string;
      amount: number;
      currency: string;
    },
  ) {
    return this.paymentsService.processPayment(body);
  }
}
