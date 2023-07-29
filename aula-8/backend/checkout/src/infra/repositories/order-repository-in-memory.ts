import OrderRepository from '../../application/protocols/repositories/order-repository'
import { Order } from '../../domain/entities/order.entity'

export default class OrderRepositoryInMemory implements OrderRepository {
  orders: Map<string, Order> = new Map()

  async getById(id: string): Promise<Order> {
    return Promise.resolve(this.orders.get(id))
  }

  async save(order: Order): Promise<void> {
    this.orders.set(order.id, order)
  }

  async countAll(): Promise<number> {
    return this.orders.size
  }
}
