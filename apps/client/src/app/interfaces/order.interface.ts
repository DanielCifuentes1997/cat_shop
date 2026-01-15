export interface Order {
  id: string;
  total: number;
  status: string;
  userId: string;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      imageUrl: string;
    };
  }[];
  shippingDetails: {
    city: string;
    department: string;
    address: string;
    phone: string;
  };
}