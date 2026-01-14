export class Product {
  id?: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}