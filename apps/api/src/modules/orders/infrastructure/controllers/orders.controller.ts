import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    const userId = req.user?.sub;
    return this.createOrderUseCase.execute(createOrderDto, userId);
  }
}