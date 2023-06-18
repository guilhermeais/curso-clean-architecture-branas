import DatabaseConnection from "./database-connection";
import OrderRepository from "./order-repository";
import { Order } from "./order.entity";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {}

  async getById(id: string): Promise<Order> {
    const [orderData] = await this.databaseConnection.query('select * from orders where id = :id', {
      replacements: {
        id
      }
    }) 

    await this.databaseConnection.disconnect()

    return new Order(
      orderData.id,
      orderData.cpf,
      orderData.date,
      orderData.sequence
    )
  }

  async save(order: Order): Promise<void> {
    await this.databaseConnection.query('inser into orders (id, code, cpf, total, freight) values (:id, :code, :cpf, :total, :freight)', {
      replacements: {
        ...order
      }
    })
  }

  async countAll(): Promise<number> {
    const [data] = await this.databaseConnection.query('select count(*)::integer from orders',)

    return data.count
  }

}