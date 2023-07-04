import { Product } from "../../domain/entities/product-entity"
import ProductsRepository from "../../application/protocols/repositories/products-repository"

export default class ProductRepositoryInMemory implements ProductsRepository {
  products: Map<string, Product> = new Map();

  async list(): Promise<Product[]> {
    return [...this.products.values()]
  }
}