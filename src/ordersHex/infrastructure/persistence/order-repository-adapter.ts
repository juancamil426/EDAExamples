import { OrderRepository } from 'src/ordersHex/application/ports/out/order-repository-port';
import { Order } from 'src/ordersHex/domain/entities/order';

export class OrderRepositoryAdapter implements OrderRepository {
  create(order: Order): string {
    return 'Creating order ' + order.id;
  }

  findById(id: string): string {
    return 'Finding order by id  ' + id;
  }
}
