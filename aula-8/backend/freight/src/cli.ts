import { Checkout } from './application/usecases/checkout'
import { InMemoryRepositoryFactory } from './infra/factory/in-memory-repository-factory'

export enum Commands {
  SET_CPF = 'set-cpf',
  ADD_ITEM = 'add-item',
  CHECKOUT = 'checkout',
  QUIT = 'quit',
}

let input: Checkout.Input = {
  cpf: '',
  items: [],
}

process.stdin.on('data', async data => {
  const command = data.toString().replace(/\n/g, '')

  if (command.includes(Commands.ADD_ITEM)) {
    const [productId, quantity] = command
      .replace(`${Commands.ADD_ITEM} `, '')
      .split(' ')
    input.items.push({
      productId: parseInt(productId),
      quantity: parseInt(quantity),
    })
    console.log(input)
    return
  }

  if (command.includes(Commands.SET_CPF)) {
    input.cpf = command.replace(Commands.SET_CPF + ' ', '')
    console.log(input)
    return
  }

  if (command.includes(Commands.CHECKOUT)) {
    const checkoutService = new Checkout(new InMemoryRepositoryFactory())

    try {
      const checkout = await checkoutService.execute(input)

      console.log(checkout)
    } catch (error) {
      console.error(error)
    } finally {
      input = {
        cpf: '',
        items: [],
      }
    }
    return
  }

  if (command.includes(Commands.QUIT)) {
    process.exit()
  }

  console.log('invalid command')
})
