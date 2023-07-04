import { Product } from "../../../domain/entities/product-entity";

export default interface ProductsRepository {
  list(): Promise<Product[]>
}