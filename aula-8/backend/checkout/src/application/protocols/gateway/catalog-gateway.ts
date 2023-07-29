import { Product } from "../../../domain/entities/product-entity";

export interface CatalogGateway {
  getProduct(idProduct: string): Promise<Product>
}