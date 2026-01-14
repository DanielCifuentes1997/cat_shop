import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/interfaces/product.repository';

@Injectable()
export class RemoveProductUseCase {
  constructor(
    @Inject('ProductRepository') private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string) {
    return this.productRepository.remove(id);
  }
}