import { randomUUID } from 'crypto'
import CouponsRepository from './coupons-repository'
import ProductsRepository from './products-repository'
import { validate } from './validateCPF'
import OrderRepository from './order-repository'

export class Checkout {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly couponRepository: CouponsRepository,
    private readonly orderRepository: OrderRepository
  ) {}
  async execute(data: Checkout.Input): Promise<Checkout.Output> {
    const checkout: Checkout.Output = {
      orderId: randomUUID(),
      subtotal: 0,
      freight: 0,
      total: 0,
    }

    if (!validate(data.cpf)) {
      throw new Error('Invalid CPF')
    }

    const { items, coupon, from, to } = data
    const processedIds = new Set<string>()
    if (items && Array.isArray(items)) {
      for (const item of items) {
        if (item.quantity <= 0) {
          throw new Error('Invalid quantity')
        }
        const product = await this.productRepository.getProduct(
          item.productId.toString()
        )

        const isDuplicated = processedIds.has(item.productId.toString())

        if (isDuplicated) {
          throw new Error('Duplicated item')
        }

        if (product) {
          if (product.width < 0 || product.height < 0 || product.length < 0) {
            throw new Error('Invalid dimensions')
          }

          if (product.weight < 0) {
            throw new Error('Invalid weight')
          }

          checkout.subtotal += product.price * item.quantity
          processedIds.add(item.productId.toString())

          if (from && to) {
            const volume =
              (product.width / 100) *
              (product.height / 100) *
              (product.length / 100)

            const density = product.weight / volume
            const distance = 1000
            const freigth = volume * distance * (density / 100) * item.quantity
            checkout.freight += Math.max(freigth, 10)
          }
        }
      }
    }

    checkout.total = checkout.subtotal

    if (coupon) {
      const coupom = await this.couponRepository.getCoupon(coupon)
      if (coupom && !coupom.isExpired) {
        checkout.total -= (checkout.total * coupom.percentage) / 100
      }
    }

    checkout.total = checkout.total + checkout.freight

    const order = {
      id: checkout.orderId,
      cpf: data.cpf,
      total: checkout.total,
      freight: checkout.freight,
      items: data.items,
    }

    await this.orderRepository.save(order)

    return checkout
  }
}

export namespace Checkout {
  export type Input = {
    cpf: string
    items: { productId: number; quantity: number }[]
    coupon?: string
    from?: string
    to?: string
  }

  export type Output = {
    orderId: string
    subtotal: number
    freight: number
    total: number
  }
}
