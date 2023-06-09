import { DiscountCoupon } from '../../../src/domain/entities/discount-coupon'
import Order, { OrderProps } from '../../../src/domain/entities/order'
import { Product } from '../../../src/domain/entities/product'
import MockDate from 'mockdate'
import { makeProduct } from '../../__mocks__/product.mock'

describe('Order', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Deve calcular o valor total dos produtos', () => {
    const products = [makeProduct(), makeProduct(), makeProduct()].map(
      p => new Product(p)
    )
    const expectedTotal = 300
    const order = new Order({
      distanceInKm: 1000,
      minFreight: 0,
      cpf: '047.825.530-64',
      description: 'any-description',
      products,
    })

    expect(order.total).toBe(expectedTotal)
  })

  test('Deve calcular o valor total dos produtos com cupom de desconto aplicado', () => {
    const order = new Order({
      distanceInKm: 1000,
      minFreight: 0,
      cpf: '047.825.530-64',
      description: 'any-description',
    })
    const product = new Product({
      ...makeProduct(),
      price: 100,
    })
    order.addProduct(product)
    const totalBeforeDiscount = 100
    const discountCoupon = new DiscountCoupon({
      code: 'any-code',
      percentage: 10,
    })

    const totalAfterDiscount = 90
    order.applyDiscountCoupon(discountCoupon)

    expect(order.totalWithoutDiscount).toBe(totalBeforeDiscount)
    expect(order.total).toBe(totalAfterDiscount)
  })

  test('Deve tacar um erro caso o CPF do pedido seja inválido', () => {
    const orderProps: OrderProps = {
      cpf: '047.825.530-65',
      description: 'any-description',
      distanceInKm: 1000,
      minFreight: 0,
    }

    expect(() => new Order(orderProps)).toThrowError('Invalid CPF')
  })

  test('Não deve aplicar cupons de desconto expirados', () => {
    const expirationDate = new Date()
    const order = new Order({
      distanceInKm: 1000,
      minFreight: 0,
      cpf: '047.825.530-64',
      description: 'any-description',
    })
    const product = new Product({
      ...makeProduct(),
      price: 100,
    })
    order.addProduct(product)

    const oneHourAfter = new Date(
      expirationDate.setHours(expirationDate.getHours() + 1)
    )
    MockDate.set(oneHourAfter)

    const discountCoupon = new DiscountCoupon({
      code: 'any-code',
      percentage: 10,
      expirationDate: new Date('2020-10-10'),
    })

    expect(() => order.applyDiscountCoupon(discountCoupon)).toThrowError(
      'Expired coupon'
    )
  })

  test('Deve tacar um erro se o mesmo produto for informado', () => {
    const order = new Order({
      distanceInKm: 1000,
      minFreight: 0,
      cpf: '047.825.530-64',
      description: 'any-description',
    })
    const product = new Product({
      ...makeProduct(),
      price: 100,
    })
    order.addProduct(product)

    expect(() => order.addProduct(product)).toThrowError(
      'Product already exists'
    )
  })

  test('Deve calcular o valor do frete com base nas dimensões e peso dos produtos (somente um produto)', () => {
    const camera = new Product({
      ...makeProduct(),
      price: 100,
      weight: 1,
      dimesion: {
        height: 20,
        length: 15,
        width: 10,
      },
    })

    const expectedFreightPrice = 10.0

    const order = new Order({
      distanceInKm: 1000,
      minFreight: 0,
      cpf: '047.825.530-64',
      description: 'any-description',
      products: [camera],
    })

    expect(order.freight).toBe(expectedFreightPrice)
  })

  test('Deve calcular o valor do frete com base nas dimensões e peso dos produtos (vários produtos)', () => {
    const camera = new Product({
      ...makeProduct(),
      name: 'camera',
      price: 100,
      weight: 1,
      dimesion: {
        height: 20,
        length: 15,
        width: 10,
      },
    })

    const refrigerator = new Product({
      ...makeProduct(),
      name: 'refrigerator',
      price: 100,
      weight: 40,
      dimesion: {
        height: 200,
        length: 100,
        width: 50,
      },
    })

    const expectedFreightPrice = 410

    const order = new Order({
      distanceInKm: 1000,
      minFreight: 0,
      cpf: '047.825.530-64',
      description: 'any-description',
      products: [camera, refrigerator],
    })

    expect(order.freight).toBe(expectedFreightPrice)
  })

  test('Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado', () => {
    const miniCamera = new Product({
      ...makeProduct(),
      name: 'mini-camera',
      price: 100,
      weight: 0.5,
      dimesion: {
        height: 10,
        length: 10,
        width: 5,
      },
    })


    const order = new Order({
      distanceInKm: 1000,
      minFreight: 12,
      cpf: '047.825.530-64',
      description: 'any-description',
      products: [miniCamera],
    })

    expect(order.freight).toBe(order.minFreight)
  })
})
