export class CreateOrderDto {
  items: { productId: string; quantity: number }[];
  shippingDetails: {
    department: string;
    city: string;
    address: string;
    phone: string;
  };
}