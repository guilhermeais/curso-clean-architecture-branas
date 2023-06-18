import { Order } from "../../../domain/entities/order.entity"

export default interface OrderRepository {
  getById(id: string): Promise<Order>
  save(order: Order): Promise<void>
  countAll(): Promise<number>
}
