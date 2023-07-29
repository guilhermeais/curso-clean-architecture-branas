import GatewayFactory from '../../application/protocols/factories/gateway-factory'
import AuthGateway from '../../application/protocols/gateway/auth-gateway'
import InMemoryAuthGateway from '../gateway/in-memory-auth-gateway'
import InMemoryCatalogGateway from '../gateway/in-memory-catalog-gateway'
import InMemoryFreightGateway from '../gateway/in-memory-freight-gateway'

export class GatewayInMemoryFactory implements GatewayFactory {
  catalogGateway: InMemoryCatalogGateway = new InMemoryCatalogGateway()
  freightGateway: InMemoryFreightGateway = new InMemoryFreightGateway()
  authGateway: InMemoryAuthGateway = new InMemoryAuthGateway()
  createCatalogGateway(): InMemoryCatalogGateway {
    return this.catalogGateway
  }
  createFreightGateway(): InMemoryFreightGateway {
    return this.freightGateway
  }
  createAuthGateway(): AuthGateway {
    return this.authGateway
  }
}
