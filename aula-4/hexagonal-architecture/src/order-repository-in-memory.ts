import OrderRepository from './order-repository'

export default class OrderRepositoryInMemory implements OrderRepository {
  orders: Map<string, any> = new Map()

  async getById(id: string): Promise<any> {
    return Promise.resolve(this.orders.get(id))
  }

  async save(order: any): Promise<void> {
    this.orders.set(order.id, order)
  }
}
