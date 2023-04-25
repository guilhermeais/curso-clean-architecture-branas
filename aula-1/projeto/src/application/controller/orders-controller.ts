import { DiscountCoupon } from '../../domain/entities/discount-coupon'
import Order from '../../domain/entities/order'
import { Product } from '../../domain/entities/product'
import { CreateOrder } from '../use-cases/create-order'
import { Controller } from './controller'

export class OrdersController implements Controller<CreateOrderRequest, Order> {
  constructor(private createOrder: CreateOrder) {}

  async handle(orderRequest: CreateOrderRequest): Promise<Order> {
    const order = new Order({
      cpf: orderRequest.cpf,
      products: orderRequest.products,
      description: orderRequest.description,
      discountCoupons: orderRequest.discountCoupons,
    })

    await this.createOrder.execute({ order })

    return order
  }
}

export type CreateOrderRequest = {
  cpf: string
  products: Product[]
  description?: string
  discountCoupons?: DiscountCoupon[]
}
