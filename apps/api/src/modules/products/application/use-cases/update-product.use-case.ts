import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/interfaces/product.repository';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository') private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string, data: UpdateProductDto) {
    return this.productRepository.update(id, data);
  }
}