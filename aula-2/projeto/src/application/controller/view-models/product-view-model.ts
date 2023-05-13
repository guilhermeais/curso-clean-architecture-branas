import { Product } from "../../../domain/entities/product";

export class ProductViewModel {
  static toViewModel(product: Product): any {
    return {
      id: product.id,
      description: product.description,
      name: product.name,
      price: product.price,
      weight: product.weight,
      dimesion: {
        height: product.dimesion.height,
        length: product.dimesion.length,
        width: product.dimesion.width,
        volume: product.dimesion.volume,
      },
    }
  }

  static toDomain(product: any): Product {
    return new Product(product)
  }
}