import Order from "../../domain/entities/order";

export interface OrderRepository {
  save(order: Order): Promise<void>
}