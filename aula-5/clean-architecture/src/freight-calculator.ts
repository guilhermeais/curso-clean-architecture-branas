import { Product } from './product-entity'

export class FreightCalculator {
  static calculate(product: Product) {
  const distance = 1000
  const freight = product.volume * distance * (product.density / 100)
  
  return  Math.max(freight, 10)
  }
}
