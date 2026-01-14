export class OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export class Order {
  id?: string;
  userId: string | null;
  status: string;
  totalAmount: number;
  shippingCost: number;
  department: string;
  city: string;
  address: string;
  phone: string;
  items: OrderItem[];
  createdAt?: Date;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}