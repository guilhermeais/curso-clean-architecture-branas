import { Checkout } from '../src/checkout'

test('Não deve criar pedido com CPF inválido', async () => {
  const given: Checkout.Input = {
    cpf: '162.759.630-34',
    items: [],
  }
  const checkout = new Checkout()

  const output = checkout.execute(given)

  await expect(output).rejects.toThrowError('Invalid CPF')
})

test('Deve fazer um pedido com 3 itens', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 1, // 150
        quantity: 1,
      },
      {
        productId: 2, // 100
        quantity: 2,
      },
    ],
  }

  const checkout = new Checkout()

  const output = await checkout.execute(given)
  expect(output.total).toEqual(350)
})

test('Deve fazer um pedido com 3 itens com cupom de desconto', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 1, // 150
        quantity: 1,
      },
      {
        productId: 2, // 100
        quantity: 2,
      },
    ],
    coupon: 'VALE20',
  }

  const checkout = new Checkout()

  const output = await checkout.execute(given)
  expect(output.total).toEqual(280)
})

test('Não deve aplicar cupons de desconto vencidos', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 1, // 150
        quantity: 1,
      },
      {
        productId: 2, // 100
        quantity: 2,
      },
    ],
    coupon: 'VALE10',
  }

  const checkout = new Checkout()

  const output = await checkout.execute(given)
  expect(output.total).toEqual(350)
})

test('Não deve aplicar cupons de desconto inexistentes', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 1, // 150
        quantity: 1,
      },
      {
        productId: 2, // 100
        quantity: 2,
      },
    ],
    coupon: 'VALE11',
  }

  const checkout = new Checkout()

  const output = await checkout.execute(given)
  expect(output.total).toEqual(350)
})

test('Não deve fazer um pedido com quantidade negativa de itens', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 1, // 150
        quantity: -1,
      },
    ],
    coupon: 'VALE11',
  }

  const checkout = new Checkout()

  const output = checkout.execute(given)
  await expect(output).rejects.toThrowError('Invalid quantity')
})

test('Não deve fazer um pedido com item duplicado', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 1, // 150
        quantity: 1,
      },
      {
        productId: 1, // 150
        quantity: 1,
      },
    ],
    coupon: 'VALE11',
  }

  const checkout = new Checkout()

  const output = checkout.execute(given)
  await expect(output).rejects.toThrowError('Duplicated item')
})

test('Deve fazer um pedido com 3 itens calculando o frete', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 1, // 150
        quantity: 1,
      },
      {
        productId: 2, // 100
        quantity: 1,
      },
    ],
    from: '04841010',
    to: '04842000',
  }

  const checkout = new Checkout()

  const output = await checkout.execute(given)
  expect(output.subtotal).toEqual(250)
  expect(output.freight).toEqual(250)
  expect(output.total).toEqual(250 + 250)
})

test('Deve fazer um pedido com 3 itens calculando o frete com preço minimo', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 3,
        quantity: 1,
      },
    ],
    from: '04841010',
    to: '04842000',
  }

  const checkout = new Checkout()

  const output = await checkout.execute(given)
  expect(output.freight).toEqual(10)
})

test('Não deve fazer um pedido se o produto tiver dimensões negativas', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 4, // 150
        quantity: 1,
      },
    ],
  }

  const checkout = new Checkout()

  const output = checkout.execute(given)
  await expect(output).rejects.toThrowError('Invalid dimensions')
})

test('Não deve fazer um pedido se o produto tiver peso negativo', async () => {
  const given: Checkout.Input = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 5, // 150
        quantity: 1,
      },
    ],
  }

  const checkout = new Checkout()

  const output = checkout.execute(given)
  await expect(output).rejects.toThrowError('Invalid weight')
})
