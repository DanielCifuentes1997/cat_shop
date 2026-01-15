import { BaseProduct } from './base-product.interface';

export interface Product extends BaseProduct {
  slug: string;
  description: string;
  stock: number;
  isActive: boolean;
}