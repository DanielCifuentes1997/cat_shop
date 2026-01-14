import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { FindAllProductsUseCase } from '../../application/use-cases/find-all-products.use-case';
import { FindOneProductUseCase } from '../../application/use-cases/find-one-product.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case';
import { RemoveProductUseCase } from '../../application/use-cases/remove-product.use-case';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createUseCase: CreateProductUseCase,
    private readonly findAllUseCase: FindAllProductsUseCase,
    private readonly findOneUseCase: FindOneProductUseCase,
    private readonly updateUseCase: UpdateProductUseCase,
    private readonly removeUseCase: RemoveProductUseCase,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createUseCase.execute(createProductDto);
  }

  @Get()
  findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.updateUseCase.execute(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeUseCase.execute(id);
  }
}