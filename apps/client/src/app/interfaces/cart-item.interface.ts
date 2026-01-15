import { BaseProduct } from './base-product.interface';

export interface CartItem extends BaseProduct {
  quantity: number;
}