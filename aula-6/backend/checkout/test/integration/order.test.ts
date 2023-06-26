import { randomUUID } from 'crypto'
import { Order } from '../../src/domain/entities/order.entity'
import { Product } from '../../src/domain/entities/product-entity'
import { Coupom } from '../../src/domain/entities/coupon.entity'

test('Deve criar um pedido vazio', () => {
  const orderId = randomUUID()
  const cpf = '587.099.304-00'
  const order = new Order(orderId, cpf, new Date(), 0)
  expect(order.total).toEqual(0)
  expect(order.cpf.toString()).toEqual(cpf)
})

test('Não deve criar um pedido com cpf inválido', () => {
  const orderId = randomUUID()
  const cpf = '587.099.304-53'
  expect(() => new Order(orderId, cpf, new Date(), 0)).toThrow('Invalid CPF')
})

test('Deve criar um pedido com 3 itens', () => {
  const orderId = randomUUID()
  const cpf = '587.099.304-00'
  const order = new Order(orderId, cpf, new Date(), 0)

  order.addItem(new Product('1', 'A', 150, 100, 30, 10, 3), 1)
  order.addItem(new Product('2', 'B', 100, 50, 50, 50, 22), 1)
  order.addItem(new Product('3', 'C', 100, 10, 10, 10, 0.9), 1)

  expect(order.total).toBe(350)
})

test('Não deve adicionar itens duplicados', () => {
  const orderId = randomUUID()
  const cpf = '587.099.304-00'
  const order = new Order(orderId, cpf, new Date(), 0)

  order.addItem(new Product('1', 'A', 150, 100, 30, 10, 3), 1)
  order.addItem(new Product('2', 'B', 100, 50, 50, 50, 22), 1)

  expect(() =>
    order.addItem(new Product('1', 'A', 150, 100, 30, 10, 3), 1)
  ).toThrow(new Error('Duplicated item'))
})

test('Deve criar um pedido e gerar o código', () => {
  const orderId = randomUUID()
  const cpf = '587.099.304-00'
  const order = new Order(orderId, cpf, new Date('2023-03-01T10:00:00'), 1)
  expect(order.code).toEqual('202300000001')
});

test('Deve criar um pedido com 3 itens com desconto', () => {
  const orderId = randomUUID()
  const cpf = '587.099.304-00'
  const order = new Order(orderId, cpf, new Date(), 0)

  order.addItem(new Product('1', 'A', 150, 100, 30, 10, 3), 1)
  order.addItem(new Product('2', 'B', 100, 50, 50, 50, 22), 1)
  order.addItem(new Product('3', 'C', 100, 10, 10, 10, 0.9), 1)
  order.addCoupon(new Coupom('VALE20', 20, new Date('2023-10-01T10:00:00')))
  expect(order.total).toBe(280)
})
