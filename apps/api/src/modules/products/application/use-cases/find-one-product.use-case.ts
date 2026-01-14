import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../domain/interfaces/product.repository';

@Injectable()
export class FindOneProductUseCase {
  constructor(
    @Inject('ProductRepository') private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }
}