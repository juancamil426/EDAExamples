import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateOrderPort } from 'src/ordersHex/application/ports/in/create-order-port';
import { Order } from 'src/ordersHex/domain/entities/order';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject('CreateOrderPort')
    private readonly getPaymentLinkUseCase: CreateOrderPort,
  ) {}

  @Post()
  createOrder(@Body() order: Order) {
    return this.getPaymentLinkUseCase.createOrder(order);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getPaymentLinkUseCase.findById(id);
  }
}
