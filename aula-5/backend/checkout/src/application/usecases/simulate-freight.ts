import { FreightCalculator } from '../../domain/entities/freight-calculator'
import ProductsRepository from '../protocols/repositories/products-repository'
import RepositoryFactory from '../protocols/repositories/repository-factory'
import { UseCase } from './usecase'

export default class SimulateFreight implements UseCase<SimulateFreight.Input,SimulateFreight.Output> {
  private readonly productRepository: ProductsRepository
  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.productRepository = repositoryFactory.createProductsRepository()
  }

  async execute(input: SimulateFreight.Input): Promise<SimulateFreight.Output> {
    let totalFreight: number = 0
    for (const item of input.items) {
      const product = await this.productRepository.getProduct(
        item.productId.toString()
      )

      if (product) {
       const productFreight = FreightCalculator.calculate(product)
        totalFreight += productFreight
      }
    }
    return { freight: totalFreight }
  }
}

export namespace SimulateFreight {
  export type Input = {
    items: { productId: number; quantity: number }[]
    from: string
    to: string
  }

  export type Output = {
    freight: number
  }
}
