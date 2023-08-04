import { Checkout } from '../../application/usecases/checkout'
import GetOrder from '../../application/usecases/get-order'
import { GetProducts } from '../../application/usecases/get-products'
import RepositoryFactory from '../../application/protocols/factories/repository-factory'
import GatewayFactory from '../../application/protocols/factories/gateway-factory'
import AuthDecorator from '../../application/decorator/auth-decorator'
import Queue from '../../application/protocols/queue/queue'

export class UseCaseFactory {
  private repositoryFactory: RepositoryFactory
  private gatewayFactory: GatewayFactory
  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory,
    private queue: Queue
  ) {
    this.repositoryFactory = repositoryFactory
    this.gatewayFactory = gatewayFactory
  }

  setRepositoryFactory(repositoryFactory: RepositoryFactory) {
    this.repositoryFactory = repositoryFactory
  }

  setGatewayFactory(gatewayFactory: GatewayFactory) {
    this.gatewayFactory = gatewayFactory
  }

  createCheckout(): AuthDecorator<Checkout> {
    return new AuthDecorator(
      new Checkout(this.repositoryFactory, this.gatewayFactory, this.queue),
      this.gatewayFactory
    )
  }

  createGetProducts(): GetProducts {
    return new GetProducts(this.repositoryFactory)
  }

  createGetOrder(): AuthDecorator<GetOrder> {
    return new AuthDecorator(
      new GetOrder(this.repositoryFactory),
      this.gatewayFactory
    )
  }
}
