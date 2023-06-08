import { ConsumeMessage, connect } from 'amqplib'
import { Checkout } from './checkout'

async function main() {
  const connection = await connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue('checkout', { durable: true })

  channel.consume('checkout', async function (msg: ConsumeMessage | null) {
    if (!msg) return

    try {
      const input = JSON.parse(msg.content.toString()) as Checkout.Input

      const checkoutService = new Checkout()

      const output = await checkoutService.execute(input)
      console.log(output)
    } catch (error) {
      console.error(error)
    }

    channel.ack(msg)
  })
}

main()
