import { Order } from 'src/ordersHex/domain/entities/order';

export interface CreateOrderPort {
  createOrder(order: Order): string;
  findById(id: string): string;
}
