import { DiscountCoupon } from '../../../domain/entities/discount-coupon'
import Order from '../../../domain/entities/order'
import { Product } from '../../../domain/entities/product'
import { CreateOrderRequest } from '../orders-controller'
import { ProductViewModel } from './product-view-model'

export class OrderViewModel {
  static toViewModel(order: Order): OrderViewModelProps {
    return {
      id: order.id,
      description: order.description,
      cpf: order.cpf,
      products: order.products.map(ProductViewModel.toViewModel),
      quantity: order.quantity,
      total: order.total,
      totalWithoutDiscount: order.totalWithoutDiscount,
      discountCoupons: order.discountCoupons,
    }
  }

  static toDomain(order: CreateOrderRequest): Order {
    return new Order({
      description: order.description,
      cpf: order.cpf,
      products: order.products.map(ProductViewModel.toDomain),
      discountCoupons: order.discountCoupons,
      distanceInKm: order.distanceInKm,
    })
  }
}

export type OrderViewModelProps = {
  id: string
  description?: string
  total: number
  totalWithoutDiscount: number
  discountCoupons?: DiscountCoupon[]
  products: Product[]
  cpf: string
  quantity: number
}
