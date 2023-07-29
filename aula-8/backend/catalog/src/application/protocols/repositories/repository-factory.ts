import ProductsRepository from "./products-repository";

export default interface RepositoryFactory {
  createProductsRepository(): ProductsRepository
}