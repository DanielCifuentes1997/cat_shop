import { Module } from '@nestjs/common';
import { OrdersController } from './infrastructure/controllers/orders.controller';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { PrismaOrderRepository } from './infrastructure/persistence/prisma-order.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [OrdersController],
  providers: [
    CreateOrderUseCase,
    PrismaService,
    {
      provide: 'OrderRepository',
      useClass: PrismaOrderRepository,
    },
  ],
})
export class OrdersModule {}