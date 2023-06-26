import { Checkout } from "../../application/usecases/checkout";
import GetOrder from "../../application/usecases/get-order";
import { GetProducts } from "../../application/usecases/get-products";
import RepositoryFactory from "../../application/protocols/repositories/repository-factory";
import SimulateFreight from "../../application/usecases/simulate-freight";

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