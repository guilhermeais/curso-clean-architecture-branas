import OrderRepository from './order-repository'

export default class GetOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<GetOrder.Output> {
    const orderData = await this.orderRepository.getById(id)

    return orderData
  }
}

export namespace GetOrder {
  export type Output = {
    total: number
  }
}
