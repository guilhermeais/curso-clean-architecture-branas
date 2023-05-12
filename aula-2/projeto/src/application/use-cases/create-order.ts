import Order from '../../domain/entities/order'
import { OrderRepository } from '../repositories/order-repository'

export class CreateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    const { order } = input

    await this.orderRepository.save(order)

    return order
  }
}

export type CreateOrderInput = {
  order: Order
}
