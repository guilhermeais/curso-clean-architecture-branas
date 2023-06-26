import ProductRepositoryInMemory from "../repositories/product-repository-in-memory";
import RepositoryFactory from "../../application/protocols/repositories/repository-factory";

export class InMemoryRepositoryFactory implements RepositoryFactory {
  productRepository = new ProductRepositoryInMemory()


  createProductsRepository(): ProductRepositoryInMemory {
    return this.productRepository
  }


}