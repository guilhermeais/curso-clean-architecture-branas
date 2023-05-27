import request from 'supertest'
import app from '../src/app'

test.skip('Não deve criar pedido com CPF inválido', async () => {
  const given = {
    cpf: '162.759.630-34',
  }
  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body

  expect(output.message).toBe('Invalid CPF')
})

test.skip('Deve fazer um pedido com 3 itens', async () => {
  const given = {
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

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(output.total).toEqual(350)
})

test.skip('Deve fazer um pedido com 3 itens com cupom de desconto', async () => {
  const given = {
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

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(output.total).toEqual(280)
})

test.skip('Não deve aplicar cupons de desconto vencidos', async () => {
  const given = {
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

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(output.total).toEqual(350)
})

test.skip('Não deve aplicar cupons de desconto inexistentes', async () => {
  const given = {
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

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(output.total).toEqual(350)
})

test.skip('Não deve fazer um pedido com quantidade negativa de itens', async () => {
  const given = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 1, // 150
        quantity: -1,
      },
    ],
    coupon: 'VALE11',
  }

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(response.statusCode).toEqual(422)
  expect(output.message).toEqual('Invalid quantity')
})

test.skip('Não deve fazer um pedido com item duplicado', async () => {
  const given = {
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

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(output.message).toEqual('Duplicated item')
})

test.skip('Deve fazer um pedido com 3 itens calculando o frete', async () => {
  const given = {
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

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(output.subtotal).toEqual(250)
  expect(output.freight).toEqual(250)
  expect(output.total).toEqual(
    250 + 250
  )
})

test.skip('Deve fazer um pedido com 3 itens calculando o frete com preço minimo', async () => {
  const given = {
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

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(output.freight).toEqual(10)
})

test.skip('Não deve fazer um pedido se o produto tiver dimensões negativas', async () => {
  const given = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 4, // 150
        quantity: 1,
      },
    ],
  }

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(response.statusCode).toEqual(422)
  expect(output.message).toEqual('Invalid dimensions')
})

test.skip('Não deve fazer um pedido se o produto tiver peso negativo', async () => {
  const given = {
    cpf: '587.099.304-00',
    items: [
      {
        productId: 5, // 150
        quantity: 1,
      },
    ],
  }

  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body
  expect(response.statusCode).toEqual(422)
  expect(output.message).toEqual('Invalid weight')
})