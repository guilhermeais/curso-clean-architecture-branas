export enum Commands {
  SET_CPF = 'set-cpf',
  ADD_ITEM = 'add-item',
  CHECKOUT = 'checkout',
  QUIT = 'quit',
}

const input = {
  cpf: '',
  items: [] as any[],
}

process.stdin.on('data', data => {
  const command = data.toString().replace(/\n/g, '');
  
  if (command.includes(Commands.ADD_ITEM)) {  
    const [idProduct, quantity] = command.replace(`${Commands.ADD_ITEM} `, '').split(' ')
    input.items.push({
      idProduct: parseInt(idProduct),
      quantity: parseInt(quantity)
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
    console.log('checkout')
    return
  }

  if (command.includes(Commands.QUIT)) {
    process.exit();
  }

  console.log('invalid command')
})