import { Coupom } from './coupon.entity'
import CouponsRepository from './coupons-repository'

export class CouponRepositoryInMemory implements CouponsRepository {
  coupons: Map<string, Coupom> = new Map()
  async getCoupon(code: string): Promise<Coupom | null> {
    const coupon = this.coupons.get(code)

    return coupon || null
  }
}
