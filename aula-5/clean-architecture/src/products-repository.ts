import { Product } from "./product-entity";

export default interface ProductsRepository {
  getProduct(idProduct: string): Promise<Product | null>
  list(): Promise<Product[]>
}