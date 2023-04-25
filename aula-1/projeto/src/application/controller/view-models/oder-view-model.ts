import { DiscountCoupon } from '../../../domain/entities/discount-coupon'
import Order from '../../../domain/entities/order'
import { Product } from '../../../domain/entities/product'

export class OrderViewModel {
  static toViewModel(order: Order): OrderViewModelProps {
    return {
      id: order.id,
      description: order.description,
      cpf: order.cpf,
      products: order.products,
      quantity: order.quantity,
      total: order.total,
      totalWithoutDiscount: order.totalWithoutDiscount,
      discountCoupons: order.discountCoupons,
    }
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
