import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/interfaces/order.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('OrderRepository') private readonly orderRepository: OrderRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(data: CreateOrderDto, userId?: string | null) {
    const { items, shippingDetails } = data;

    const productIds = items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== items.length) {
      throw new NotFoundException('Algunos productos no existen');
    }

    let totalProductPrice = 0;
    let totalQuantity = 0;

    const orderItemsData: { productId: string; quantity: number; price: number }[] = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) continue;

      const subtotal = Number(product.price) * item.quantity;
      totalProductPrice += subtotal;
      totalQuantity += item.quantity;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: Number(product.price),
      });
    }

    let shippingCost = 0;

    if (totalQuantity < 3) {
      const city = shippingDetails.city.toLowerCase().trim();
      const department = shippingDetails.department.toLowerCase().trim();

      if (city === 'armenia') {
        shippingCost = 0;
      } else if (department === 'quindio' || department === 'quindío') {
        shippingCost = 10000;
      } else {
        shippingCost = 18000;
      }
    }

    const totalAmount = totalProductPrice + shippingCost;

    const newOrder = new Order({
      userId: userId || null,
      status: 'PENDING',
      totalAmount,
      shippingCost,
      department: shippingDetails.department,
      city: shippingDetails.city,
      address: shippingDetails.address,
      phone: shippingDetails.phone,
      items: orderItemsData
    });

    return this.orderRepository.create(newOrder);
  }
}