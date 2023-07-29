import { Product } from "../../domain/entities/product-entity";
import ProductsRepository from "../protocols/repositories/products-repository";
import RepositoryFactory from "../protocols/factories/repository-factory";
import { UseCase } from "./usecase";

export class GetProducts implements UseCase<null, Product[]> {
  private readonly productRepo: ProductsRepository
  constructor(repositoryFactory: RepositoryFactory) {
    this.productRepo = repositoryFactory.createProductsRepository()
  }
  async execute(): Promise<Product[]> {
    return this.productRepo.list()
  }
}