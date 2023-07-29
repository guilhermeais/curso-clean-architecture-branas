import OrderRepository from '../protocols/repositories/order-repository'
import RepositoryFactory from '../protocols/factories/repository-factory'
import { UseCase } from './usecase'

export default class GetOrder implements UseCase<GetOrder.Input, GetOrder.Output> {
  private readonly orderRepository: OrderRepository
  constructor(repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

  async execute({ id }: GetOrder.Input): Promise<GetOrder.Output> {
    const orderData = await this.orderRepository.getById(id)

    return {
      code: orderData.code,
      total: orderData.total,
    }
  }
}

export namespace GetOrder {
  export type Input = {
    id: string
  }
  export type Output = {
    total: number
    code: string
  }
}
