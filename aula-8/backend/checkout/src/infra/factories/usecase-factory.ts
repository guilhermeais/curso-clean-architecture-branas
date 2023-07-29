import { Checkout } from '../../application/usecases/checkout'
import GetOrder from '../../application/usecases/get-order'
import { GetProducts } from '../../application/usecases/get-products'
import RepositoryFactory from '../../application/protocols/repositories/repository-factory'
import GatewayFactory from '../../application/gateway/gateway-factory'

export class UseCaseFactory {
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    private gatewayFactory: GatewayFactory
  ) {}
  createCheckout(): Checkout {
    return new Checkout(this.repositoryFactory, this.gatewayFactory)
  }

  createGetProducts(): GetProducts {
    return new GetProducts(this.repositoryFactory)
  }

  createGetOrder(): GetOrder {
    return new GetOrder(this.repositoryFactory)
  }
}
