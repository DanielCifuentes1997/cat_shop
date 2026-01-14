import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/controllers/products.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaProductRepository } from './infrastructure/persistence/prisma-product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { FindAllProductsUseCase } from './application/use-cases/find-all-products.use-case';
import { FindOneProductUseCase } from './application/use-cases/find-one-product.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';
import { RemoveProductUseCase } from './application/use-cases/remove-product.use-case';

@Module({
  controllers: [ProductsController],
  providers: [
    PrismaService,
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindOneProductUseCase,
    UpdateProductUseCase,
    RemoveProductUseCase,
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductsModule {}