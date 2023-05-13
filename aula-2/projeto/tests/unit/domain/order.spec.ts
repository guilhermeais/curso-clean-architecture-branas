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
    const products = [makeProduct(), makeProduct(), makeProduct()].map(p => new Product(p))
    const expectedTotal = 300
    const order = new Order({
      cpf: '047.825.530-64',
      description: 'any-description',
      products,
    })

    expect(order.total).toBe(expectedTotal)
  })

  test('Deve calcular o valor total dos produtos com cupom de desconto aplicado', () => {
    const order = new Order({
      cpf: '047.825.530-64',
      description: 'any-description',
    })
    const product = new Product( {
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
    }

    expect(() => new Order(orderProps)).toThrowError('Invalid CPF')
  });

  test('Não deve aplicar cupons de desconto expirados', () => {
    const expirationDate = new Date()
    const order = new Order({
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
      expirationDate: new Date('2020-10-10')
    })

    expect(() => order.applyDiscountCoupon(discountCoupon)).toThrowError('Expired coupon')
  });

 test('Deve tacar um erro se o mesmo produto for informado', () => {
    const order = new Order({
      cpf: '047.825.530-64',
      description: 'any-description',
    })
    const product = new Product({
      ...makeProduct(),
      price: 100,
    })
    order.addProduct(product)

    expect(() => order.addProduct(product)).toThrowError('Product already exists')
 });
})
