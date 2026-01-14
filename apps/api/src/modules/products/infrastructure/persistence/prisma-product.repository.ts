import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/interfaces/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const generatedSlug = product.name
      .toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const saved = await this.prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug || generatedSlug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        isActive: product.isActive,
      },
    });
    return this.mapToEntity(saved);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { isActive: true },
    });
    return products.map((p) => this.mapToEntity(p));
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product ? this.mapToEntity(product) : null;
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id },
      data: {
        ...product,
        slug: product.slug,
      },
    });
    return this.mapToEntity(updated);
  }

  async remove(id: string): Promise<Product> {
    const removed = await this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
    return this.mapToEntity(removed);
  }

  private mapToEntity(data: any): Product {
    return new Product({
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: Number(data.price),
      stock: data.stock,
      imageUrl: data.imageUrl,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}