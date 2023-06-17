import { Order } from "./order.entity"

export default interface OrderRepository {
  getById(id: string): Promise<Order>
  save(order: Order): Promise<void>
  countAll(): Promise<number>
}
