import { CatalogGateway } from '../../application/protocols/gateway/catalog-gateway'
import { Product } from '../../domain/entities/product-entity'

export default class InMemoryCatalogGateway implements CatalogGateway {
  products: Map<string, Product> = new Map()

  async getProduct(id: string): Promise<Product> {
    const product = this.products.get(id)
    if (!product) return null

    return product
  }
}
