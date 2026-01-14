import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/interfaces/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository') private readonly productRepository: ProductRepository,
  ) {}

  async execute(data: CreateProductDto) {
    const newProduct = new Product({
      ...data,
      isActive: true,
      price: Number(data.price),
      stock: Number(data.stock)
    });
    return this.productRepository.create(newProduct);
  }
}