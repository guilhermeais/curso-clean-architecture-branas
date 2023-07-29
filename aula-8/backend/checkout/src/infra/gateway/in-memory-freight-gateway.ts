import FreightGateway, {
  Input,
  Output,
} from '../../application/protocols/gateway/freight-gateway'

export default class InMemoryFreightGateway implements FreightGateway {
  result: Output = {
    freight: 20
  }
  
  async simulateFreight(input: Input): Promise<Output> {
    return this.result
  }
}
