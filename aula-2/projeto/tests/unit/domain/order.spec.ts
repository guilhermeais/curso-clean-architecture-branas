import { DiscountCoupon } from '../../../src/domain/entities/discount-coupon'
import Order, { OrderProps } from '../../../src/domain/entities/order'
import { Product } from '../../../src/domain/entities/product'

describe('Order', () => {
  function makeProduct() {
    return new Product({
      name: 'any-product',
      description: 'any-description',
      price: 100,
    })
  }

  test('Deve calcular o valor total dos produtos', () => {
    const products = [makeProduct(), makeProduct(), makeProduct()]
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
    const product = {
      ...makeProduct(),
      price: 100,
    }
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
})
