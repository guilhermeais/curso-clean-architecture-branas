import { randomUUID } from 'crypto'
import { Checkout } from '../src/checkout'
import { CouponRepositoryInMemory } from '../src/coupon-repository-in-memory'
import { Coupom } from '../src/coupon.entity'
import { Product } from '../src/product-entity'
import ProductRepositoryInMemory from '../src/product-repository-in-memory'
import GetOrder from '../src/GetOrder'
import OrderRepositoryInMemory from '../src/order-repository-in-memory'

let checkout: Checkout
let getOrder: GetOrder
let productRepository: ProductRepositoryInMemory
let couponRepository: CouponRepositoryInMemory
let orderRepository: OrderRepositoryInMemory

beforeEach(() => {
  productRepository = new ProductRepositoryInMemory()
  productRepository.products = new Map<string, Product>([
    ['1', new Product('1', 'A', 150, 100, 30, 10, 3)],
    ['2', new Product('2', 'B', 100, 50, 50, 50, 22)],
    ['3', new Product('3', 'C', 100, 10, 10, 10, 0.9)],
    ['4', new Product('4', 'D', 30, -10, -10, -10, 1)],
    ['5', new Product('5', 'D', 30, 10, 10, 10, -1)],
  ])
  couponRepository = new CouponRepositoryInMemory()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  couponRepository.coupons = new Map<string, Coupom>([
    ['VALE20', new Coupom('VALE20', 20, tomorrow)],
    ['VALE10', new Coupom('VALE10', 10, yesterday)],
  ])

  orderRepository = new OrderRepositoryInMemory()

  checkout = new Checkout(productRepository, couponRepository, orderRepository)
  getOrder = new GetOrder(orderRepository)
})

test('Não deve criar pedido com CPF inválido', async () => {
  const given: Checkout.Input = {
    cpf: '162.759.630-34',
    items: [],
  }

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

  const output = await checkout.execute(given)
  expect(output.freight).toEqual(10)
})

test('Deve fazer um pedido e obter o pedido salvo', async () => {
  const orderId = randomUUID()
  const given: Checkout.Input = {
    orderId,
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

  await checkout.execute(given)

  const savedOrder = await getOrder.execute(orderId)
  expect(savedOrder.total).toEqual(110)
})

test('Deve fazer um pedido e gerar o código do pedido', async () => {
  const orderId = randomUUID()
  const given: Checkout.Input = {
    orderId,
    cpf: '587.099.304-00',
    items: [
      {
        productId: 3,
        quantity: 1,
      },
    ],
    from: '04841010',
    to: '04842000',
    date: new Date('2023-01-01T10:00:00'),
  }

  await checkout.execute(given)
  const savedOrder = await getOrder.execute(orderId)
  expect(savedOrder.code).toBe('202300000001')
})

test('Deve fazer dois pedidos e gerar o código do pedido', async () => {
  const firstOrderId = randomUUID()
  const secondOrderId = randomUUID()

  const firestGiven: Checkout.Input = {
    orderId: firstOrderId,
    cpf: '587.099.304-00',
    items: [
      {
        productId: 3,
        quantity: 1,
      },
    ],
    from: '04841010',
    to: '04842000',
    date: new Date('2023-01-01T10:00:00'),
  }

  const secondGiven: Checkout.Input = {
    orderId: secondOrderId,
    cpf: '587.099.304-00',
    items: [
      {
        productId: 3,
        quantity: 1,
      },
    ],
    from: '04841010',
    to: '04842000',
    date: new Date('2023-01-01T10:00:00'),
  }

  await checkout.execute(firestGiven)
  await checkout.execute(secondGiven)
  const firstOrder = await getOrder.execute(firstOrderId)
  const secondOrder = await getOrder.execute(secondOrderId)

  expect(firstOrder.code).toBe('202300000001')
  expect(secondOrder.code).toBe('202300000002')
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

  const output = checkout.execute(given)
  await expect(output).rejects.toThrowError('Invalid weight')
})
