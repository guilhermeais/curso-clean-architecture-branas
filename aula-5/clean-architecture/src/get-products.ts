import { Product } from "./product-entity";
import ProductsRepository from "./products-repository";
import RepositoryFactory from "./repository-factory";

export class GetProducts {
  private readonly productRepo: ProductsRepository
  constructor(repositoryFactory: RepositoryFactory) {
    this.productRepo = repositoryFactory.createProductsRepository()
  }
  async execute(): Promise<Product[]> {
    return this.productRepo.list()
  }
}