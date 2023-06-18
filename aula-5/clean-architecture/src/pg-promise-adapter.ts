import DatabaseConnection from "./database-connection";
import pgp, { IDatabase} from 'pg-promise'

export default class PgPromiseAdapter implements DatabaseConnection {
  private connection!: IDatabase<any>;
 
  query<T = any>(query: string, params: { replacements: { [key: string]: any; }; } = { replacements: {}}): Promise<T> {
    return this.connection.query(query, {
      ...params.replacements
    })
  }

  async connect(): Promise<void> {
    this.connection = await pgp()("postgres://postgres:123456@localhost:5432/app")
  }

  async disconnect(): Promise<void> {
    await this.connection.$pool.end()
  }
  
}