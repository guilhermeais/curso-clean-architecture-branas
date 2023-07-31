import { StockGateway } from '../../../application/protocols/gateway/stock-gateway'
import HttpClient from '../../http/http-client'

export default class StockHttpGateway implements StockGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async decreaseStock(params: StockGateway.Input): Promise<void> {
    await this.httpClient.post('http://localhost:3005/decrease-stock', params)
  }
}
