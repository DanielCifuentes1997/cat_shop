import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract findOne(id: string): Promise<Product | null>;
  abstract update(id: string, product: Partial<Product>): Promise<Product>;
  abstract remove(id: string): Promise<Product>;
}