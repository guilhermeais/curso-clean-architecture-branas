import { CatalogGateway } from '../../application/gateway/catalog-gateway'
import FreightGateway from '../../application/gateway/freight-gateway'
import GatewayFactory from '../../application/gateway/gateway-factory'
import CatalogHttpGateway from '../gateway/catalog-http-gateway'
import FreightHttpGateway from '../gateway/freight-http-gateway'
import HttpClient from '../http/http-client'

export default class GatewayHttpFactory implements GatewayFactory {
  constructor(private readonly httpClient: HttpClient) {}

  createCatalogGateway(): CatalogGateway {
    return new CatalogHttpGateway(this.httpClient);
  }
  createFreightGateway(): FreightGateway {
    return new FreightHttpGateway(this.httpClient)
  }
}
