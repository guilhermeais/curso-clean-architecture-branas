import CouponsRepository from '../protocols/repositories/coupons-repository'
import OrderRepository from '../protocols/repositories/order-repository'
import { Order } from '../../domain/entities/order.entity'
import RepositoryFactory from '../protocols/factories/repository-factory'
import { UseCase } from './usecase'
import GatewayFactory from '../protocols/factories/gateway-factory'
import { CatalogGateway } from '../protocols/gateway/catalog-gateway'
import FreightGateway, { Input } from '../protocols/gateway/freight-gateway'

export class Checkout implements UseCase<Checkout.Input, Checkout.Output> {
  private readonly couponRepository: CouponsRepository
  private readonly orderRepository: OrderRepository
  private readonly catalogGateway: CatalogGateway
  private readonly freightGateway: FreightGateway

  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory
  ) {
    this.couponRepository = repositoryFactory.createCouponsRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.catalogGateway = gatewayFactory.createCatalogGateway()
    this.freightGateway = gatewayFactory.createFreightGateway()
  }

  async execute(input: Checkout.Input): Promise<Checkout.Output> {
    const sequence = (await this.orderRepository.countAll()) + 1
    const order = new Order(input.orderId, input.cpf, input.date, sequence)
    const inputFreight: Input = {
      from: input.from,
      to: input.to,
      items: []
    }
    for (const item of input.items) {
      const product = await this.catalogGateway.getProduct(
        item.productId.toString()
      )

      if (product) {
        order.addItem(product, item.quantity)

        if (input.from && input.to) {
          inputFreight.items.push({
            volume: product.volume,
            density: product.density,
            quantity: item.quantity,
          })
        }
      }
    }

    if (input.from && input.to) {
      order.freight = (await this.freightGateway.simulateFreight(inputFreight))?.freight || 0
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
