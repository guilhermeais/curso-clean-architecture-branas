import { FreightCalculator } from './freight-calculator'
import ProductsRepository from './products-repository'
import RepositoryFactory from './repository-factory'

export default class SimulateFreight {
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
