import { Checkout } from "./checkout";
import GetOrder from "./get-order";
import { GetProducts } from "./get-products";
import RepositoryFactory from "./repository-factory";
import SimulateFreight from "./simulate-freight";

export class UseCaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {
    
  }
  createCheckout(): Checkout {
    return new Checkout(this.repositoryFactory)
  }

  createGetProducts(): GetProducts {
    return new GetProducts(this.repositoryFactory)
  }

  createGetOrder(): GetOrder{
    return new GetOrder(this.repositoryFactory)
  }

  createSimulateFreight(): SimulateFreight {
    return new SimulateFreight(this.repositoryFactory)
  }
}