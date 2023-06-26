import DatabaseConnection from "../database/database-connection";
import { Product } from "../../domain/entities/product-entity";
import ProductsRepository from "../../application/protocols/repositories/products-repository";

export class ProductRepositoryDatabase implements ProductsRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {
  }

  async list(): Promise<Product[]> {
    const productsData = await this.databaseConnection.query('select * from products')

    await this.databaseConnection.disconnect()
    return productsData ? productsData.map(productData => {
      return new Product(productData.id, productData.description, productData.price, productData.width, productData.height, productData.length, productData.weight)
    }) : []
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