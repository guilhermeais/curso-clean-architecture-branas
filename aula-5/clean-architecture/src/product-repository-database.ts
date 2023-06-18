import DatabaseConnection from "./database-connection";
import { Product } from "./product-entity";
import ProductsRepository from "./products-repository";

export class ProductRepositoryDatabase implements ProductsRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {
    
  }

  async getProduct(idProduct: string): Promise<Product | null> {
    const [productData] = await this.databaseConnection.query('select * from products where id = :id', {
      replacements: {
        id: idProduct
      }
    })

    await this.databaseConnection.disconnect()
    return productData ? new Product(productData.id, productData.description, productData.price, productData.width, productData.height, productData.length, productData.weight) : null
  }
}