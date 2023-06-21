import Product from '../entity/Product'
import HttpClient from '../http/HttpClient'
import CheckoutGateway from './CheckoutGateway'

export default class HttpCheckoutGateway implements CheckoutGateway {
  constructor(readonly httpClient: HttpClient) {}
  async getProducts(): Promise<Product[]> {
    const response = await this.httpClient.get<any[]>(
      'http://localhost:3000/products'
    )

    return response.map(
      product => new Product(product.id, product.description, product.price)
    )
  }

  async checkout(order: any): Promise<any> {
    const response = await this.httpClient.post(
      'http://localhost:3000/products',
      order
    )
    return response.data
  }
}
