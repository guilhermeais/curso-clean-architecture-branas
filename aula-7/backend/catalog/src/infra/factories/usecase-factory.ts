import { GetProducts } from "../../application/usecases/get-products";
import RepositoryFactory from "../../application/protocols/repositories/repository-factory";
import { GetProduct } from "../../application/usecases/get-product";

export class UseCaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {
    
  }

  createGetProducts(): GetProducts {
    return new GetProducts(this.repositoryFactory)
  }

  createGetProduct(): GetProduct {
    return new GetProduct(this.repositoryFactory)
  }
}