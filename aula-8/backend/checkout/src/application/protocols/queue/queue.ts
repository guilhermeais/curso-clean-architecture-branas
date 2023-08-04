export default interface Queue {
  connect(): Promise<void>
  on<Data = any>(queueName: string, callback: (data: Data)=>void): Promise<void>
  publish(queueName: string, data: any): Promise<void>
}