import { Order } from '../entities/order.entity';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<Order>;
}