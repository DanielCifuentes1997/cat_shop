import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/interfaces/product.repository';

@Injectable()
export class FindAllProductsUseCase {
  constructor(
    @Inject('ProductRepository') private readonly productRepository: ProductRepository,
  ) {}

  async execute() {
    return this.productRepository.findAll();
  }
}