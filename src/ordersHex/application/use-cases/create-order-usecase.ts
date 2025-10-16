import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/ordersHex/domain/entities/order';
import { CreateOrderPort } from '../ports/in/create-order-port';
import { OrderRepository } from 'src/ordersHex/application/ports/out/order-repository-port';

@Injectable()
export class OrderUseCase implements CreateOrderPort {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  createOrder(order: Order): string {
    return this.orderRepository.create(order);
  }

  findById(id: string): string {
    return this.orderRepository.findById(id);
  }
}
