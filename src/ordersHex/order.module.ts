import { Module } from '@nestjs/common';
import { OrderRepositoryAdapter } from './infrastructure/persistence/order-repository-adapter';
import { OrderUseCase } from './application/use-cases/create-order-usecase';
import { OrderController } from './infrastructure/controllers/order-controller';

@Module({
  controllers: [OrderController],
  providers: [
    // Adapter Out (Repository)
    {
      provide: 'OrderRepository',
      useClass: OrderRepositoryAdapter,
    },
    // Use Cases (Adapter In)
    {
      provide: 'CreateOrderPort',
      useClass: OrderUseCase,
    },
    // Configurar OrderUseCase con sus dependencias
    {
      provide: OrderUseCase,
      useFactory: (orderRepository: OrderRepositoryAdapter) => {
        return new OrderUseCase(orderRepository);
      },
      inject: ['OrderRepository'],
    },
  ],
})
export class OrderModule {}
