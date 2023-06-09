import ProductsRepository from './products-repository'

export default class SimulateFreight {
  constructor(private readonly productRepository: ProductsRepository) {}

  async execute(input: SimulateFreight.Input): Promise<SimulateFreight.Output> {
    let freight: number = 0
    for (const item of input.items) {
      const product = await this.productRepository.getProduct(
        item.productId.toString()
      )

      if (product) {
        const volume =
          (product.width / 100) *
          (product.height / 100) *
          (product.length / 100)

        const density = product.weight / volume
        const distance = 1000
        freight += volume * distance * (density / 100) * item.quantity
      }
    }
    return { freight }
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
