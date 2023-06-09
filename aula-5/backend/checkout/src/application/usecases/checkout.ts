import CouponsRepository from '../protocols/repositories/coupons-repository'
import ProductsRepository from '../protocols/repositories/products-repository'
import OrderRepository from '../protocols/repositories/order-repository'
import { FreightCalculator } from '../../domain/entities/freight-calculator'
import { Order } from '../../domain/entities/order.entity'
import RepositoryFactory from '../protocols/repositories/repository-factory'
import { UseCase } from './usecase'

export class Checkout implements UseCase<Checkout.Input, Checkout.Output> {
  private readonly productRepository: ProductsRepository
    private readonly couponRepository: CouponsRepository
    private readonly orderRepository: OrderRepository
    
  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.productRepository = repositoryFactory.createProductsRepository()
    this.couponRepository = repositoryFactory.createCouponsRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

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
