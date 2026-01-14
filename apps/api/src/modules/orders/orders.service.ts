import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto, userId?: string) {
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
    const orderItemsData: any[] = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) continue;

      const subtotal = Number(product.price) * item.quantity;
      totalProductPrice += subtotal;
      totalQuantity += item.quantity;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
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

    const order = await this.prisma.order.create({
      data: {
        userId: userId || null,
        totalAmount,
        shippingCost,
        department: shippingDetails.department,
        city: shippingDetails.city,
        address: shippingDetails.address,
        phone: shippingDetails.phone,
        status: 'PENDING',
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }
}