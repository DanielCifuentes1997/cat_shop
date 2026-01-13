import { Decimal } from '@prisma/client/runtime/library';

export class Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: Decimal;
  stock: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}