import { OrderRepository } from '../../application/repositories/order-repository'
import Order from '../../domain/entities/order'

export class InMemoryOrderRepository implements OrderRepository {
  orders = new Map<string, Order>()

  async save(order: Order): Promise<void> {
    this.orders.set(order.id, order)
  }
}
