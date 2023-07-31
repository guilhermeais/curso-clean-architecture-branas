import { CatalogGateway } from '../../application/protocols/gateway/catalog-gateway'
import FreightGateway from '../../application/protocols/gateway/freight-gateway'
import GatewayFactory from '../../application/protocols/factories/gateway-factory'
import CatalogHttpGateway from '../gateway/catalog-http-gateway'
import FreightHttpGateway from '../gateway/freight-http-gateway'
import HttpClient from '../http/http-client'
import AuthGateway from '../../application/protocols/gateway/auth-gateway'
import AuthHttpGateway from '../gateway/auth-http-gateway'
import { StockGateway } from '../../application/protocols/gateway/stock-gateway'
import StockHttpGateway from '../gateway/stock/stock-http-gateway'

export default class GatewayHttpFactory implements GatewayFactory {
  constructor(private readonly httpClient: HttpClient) {}
  createStockGateway(): StockGateway {
    return new StockHttpGateway(this.httpClient)
  }
  createAuthGateway(): AuthGateway {
    return new AuthHttpGateway(this.httpClient)
  }
  createCatalogGateway(): CatalogGateway {
    return new CatalogHttpGateway(this.httpClient)
  }
  createFreightGateway(): FreightGateway {
    return new FreightHttpGateway(this.httpClient)
  }
}
