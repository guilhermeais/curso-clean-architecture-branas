import { GetProducts } from "../../application/usecases/get-products";
import RepositoryFactory from "../../application/protocols/repositories/repository-factory";

export class UseCaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {
    
  }

  createGetProducts(): GetProducts {
    return new GetProducts(this.repositoryFactory)
  }
}