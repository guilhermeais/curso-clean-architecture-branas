import { Coupom } from '../../domain/entities/coupon.entity'
import CouponsRepository from '../../application/protocols/repositories/coupons-repository'

export class CouponRepositoryInMemory implements CouponsRepository {
  coupons: Map<string, Coupom> = new Map()
  async getCoupon(code: string): Promise<Coupom | null> {
    const coupon = this.coupons.get(code)

    return coupon || null
  }
}
