import Queue from "../../application/protocols/queue/queue";
import amqp, {Connection} from 'amqplib'

export default class RabbitMQAdapter implements Queue {
  private connection: Connection
  async connect(): Promise<void> {
    this.connection = await amqp.connect({
      username: 'guiais',
      password: '123321',
      vhost: 'test_broker'
    })
  }

  async on<Data = any>(queueName: string, callback: (data: Data) => void): Promise<void> {
    const channel = await this.connection.createChannel()
    await channel.assertQueue(queueName, {durable: true})
    channel.consume(queueName, async msg => {
      const input = JSON.parse(msg.content.toString())
      await callback(input)
      channel.ack(msg)
    })
  }

  async publish(queueName: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel()
    await channel.assertQueue(queueName, {durable: true})
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
  }
}