import { DiscountCoupon } from '../../domain/entities/discount-coupon'
import Order from '../../domain/entities/order'
import { Product } from '../../domain/entities/product'
import { CreateOrder } from '../use-cases/create-order'
import { Controller } from './controller'
import { OrderViewModel, OrderViewModelProps } from './view-models/oder-view-model'

export class OrdersController implements Controller<CreateOrderRequest, OrderViewModelProps> {
  constructor(private createOrder: CreateOrder) {}

  async handle(orderRequest: CreateOrderRequest): Promise<OrderViewModelProps> {
    const order = new Order({
      cpf: orderRequest.cpf,
      products: orderRequest.products,
      description: orderRequest.description,
      discountCoupons: orderRequest.discountCoupons,
    })

    await this.createOrder.execute({ order })

    return OrderViewModel.toViewModel(order)
  }
}

export type CreateOrderRequest = {
  cpf: string
  products: Product[]
  description?: string
  discountCoupons?: DiscountCoupon[]
}
