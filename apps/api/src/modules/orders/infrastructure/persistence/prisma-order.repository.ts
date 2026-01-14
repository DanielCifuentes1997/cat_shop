import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/interfaces/order.repository';
import { Order } from '../../domain/entities/order.entity';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: Order): Promise<Order> {
    const savedOrder = await this.prisma.order.create({
      data: {
        userId: order.userId,
        status: order.status,
        totalAmount: order.totalAmount,
        shippingCost: order.shippingCost,
        department: order.department,
        city: order.city,
        address: order.address,
        phone: order.phone,
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return new Order({
      ...savedOrder,
      totalAmount: Number(savedOrder.totalAmount),
      shippingCost: Number(savedOrder.shippingCost),
      items: savedOrder.items.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        price: Number(i.price)
      }))
    });
  }
}