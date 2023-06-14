import { randomUUID } from 'crypto'
import CouponsRepository from './coupons-repository'
import ProductsRepository from './products-repository'
import { validate } from './validateCPF'
import OrderRepository from './order-repository'
import { FreightCalculator } from './freight-calculator'
import { Order } from './order.entity'
import { Product } from './product-entity'

export class Checkout {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly couponRepository: CouponsRepository,
    private readonly orderRepository: OrderRepository
  ) {}
  async execute(input: Checkout.Input): Promise<Checkout.Output> {
    const sequence = (await this.orderRepository.countAll()) + 1
    const order = new Order(input.orderId, input.cpf, input.date, sequence)
    for (const item of input.items) {
      const product = await this.productRepository.getProduct(
        item.productId.toString()
      )

      if (product) {
        order.addItem(product, item.quantity)

        if (input.from && input.to) {
          order.freight += FreightCalculator.calculate(product) * item.quantity
        }
      }
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getCoupon(input.coupon)

      if (coupon) {
        order.addCoupon(coupon)
      }
    }
    await this.orderRepository.save(order)

    return {
      orderId: order.id,
      freight: order.freight,
      total: order.total,
    }
  }
}

export namespace Checkout {
  export type Input = {
    orderId?: string
    cpf: string
    items: { productId: number; quantity: number }[]
    coupon?: string
    from?: string
    to?: string
    date?: Date
  }

  export type Output = {
    orderId: string
    freight: number
    total: number
  }
}
