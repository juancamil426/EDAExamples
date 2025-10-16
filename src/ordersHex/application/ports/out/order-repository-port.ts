import { Order } from 'src/ordersHex/domain/entities/order';

export interface OrderRepository {
  create(order: Order): string;
  findById(id: string): string;
}
