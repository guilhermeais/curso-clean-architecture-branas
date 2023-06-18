import { Coupom } from './coupon.entity'
import CouponsRepository from './coupons-repository'
import DatabaseConnection from './database-connection'

export class CouponRepositoryDatabase implements CouponsRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {}

  async getCoupon(code: string): Promise<Coupom | null> {
    const [couponData] = await this.databaseConnection.query(
      'select * from coupon where code = :code', {
        replacements: {
          code
        }
      }
    )

    await this.databaseConnection.disconnect()

    return new Coupom(
      couponData.code, couponData.percentage, couponData.expireDate
    )
  }
}
