import { CatalogGateway } from '../../application/gateway/catalog-gateway'
import { Product } from '../../domain/entities/product-entity'
import HttpClient from '../http/http-client'

export default class CatalogHttpGateway implements CatalogGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async getProduct(idProduct: string): Promise<Product> {
    const output = await this.httpClient.get<{
      id: string
      description: string
      price: number
      width: number
      height: number
      length: number
      weight: number
      volume: number
      density: number
    }>(`https://lcoalhost:3001/products/${idProduct}`)

    const product = new Product(
      output.id,
      output.description,
      output.price,
      output.width,
      output.height,
      output.length,
      output.weight,
      output.volume,
      output.density
    )

    return product
  }
}
