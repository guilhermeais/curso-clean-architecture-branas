import { DiscountCoupon } from '../../domain/entities/discount-coupon'
import { ProductProps } from '../../domain/entities/product'
import { CreateOrder } from '../use-cases/create-order'
import { Controller } from './controller'
import { OrderViewModel, OrderViewModelProps } from './view-models/oder-view-model'

export class OrdersController implements Controller<CreateOrderRequest, OrderViewModelProps> {
  constructor(private createOrder: CreateOrder) {}

  async handle(orderRequest: CreateOrderRequest): Promise<OrderViewModelProps> {
    const order = OrderViewModel.toDomain(orderRequest)

    await this.createOrder.execute({ order })

    return OrderViewModel.toViewModel(order)
  }
}

export type CreateOrderRequest = {
  cpf: string
  products: ProductProps[]
  description?: string
  discountCoupons?: DiscountCoupon[]
  distanceInKm: number
  minFreight: number
}
