export default interface DatabaseConnection {
  query<T=any>(query: string, params?: {replacements: {[key: string]: any}}): Promise<T[]>
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}