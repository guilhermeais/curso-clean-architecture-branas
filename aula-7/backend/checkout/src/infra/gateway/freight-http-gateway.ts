import FreightGateway, {
  Input,
  Output,
} from '../../application/gateway/freight-gateway'
import HttpClient from '../http/http-client'

export default class FreightHttpGateway implements FreightGateway {
  constructor(private readonly httpClient: HttpClient) {}

  async simulateFreight(input: Input): Promise<Output> {
    const output = await this.httpClient.post('http://localhost:3002/simulate-freight', input);

    return output
  }
}
