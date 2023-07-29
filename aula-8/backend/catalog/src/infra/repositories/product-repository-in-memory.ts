import { Product } from "../../domain/entities/product-entity"
import ProductsRepository from "../../application/protocols/repositories/products-repository"

export default class ProductRepositoryInMemory implements ProductsRepository {
  products: Map<string, Product> = new Map();

  async getProduct(id: string): Promise<Product | null> {
    const  product = this.products.get(id)

    return product || null
  }

  async list(): Promise<Product[]> {
    return [...this.products.values()]
  }
}