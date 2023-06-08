export default interface OrderRepository {
  getById(id: string): Promise<any>
  save(order: any): Promise<void>
}
