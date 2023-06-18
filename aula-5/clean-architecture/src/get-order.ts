import OrderRepository from './order-repository'
import RepositoryFactory from './repository-factory'
import { UseCase } from './usecase'

export default class GetOrder implements UseCase<string, GetOrder.Output> {
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
