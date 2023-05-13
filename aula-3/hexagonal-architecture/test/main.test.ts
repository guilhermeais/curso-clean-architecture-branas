import request from 'supertest'
import app from '../src/app'

test('Não deve criar pedido com CPF inválido', async () => {
  const given = {
    cpf: '162.759.630-34',
  }
  const response = await request(app).post(`/checkout`).send(given)

  const output = response.body

  expect(output.message).toBe('Invalid CPF')
})

test('Deve fazer um pedido com 3 itens', async () => {
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
  expect(output.total).toEqual(
    350
  )
})

test('Deve fazer um pedido com 3 itens com cupom de desconto', async () => {
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
  expect(output.total).toEqual(
    280
  )
})
