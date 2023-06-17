import OrderRepository from './order-repository'
import RepositoryFactory from './repository-factory'

export default class GetOrder {
  private readonly orderRepository: OrderRepository
  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

  async execute(id: string): Promise<GetOrder.Output> {
    const orderData = await this.orderRepository.getById(id)

    return orderData
  }
}

export namespace GetOrder {
  export type Output = {
    total: number
    code: string
  }
}
