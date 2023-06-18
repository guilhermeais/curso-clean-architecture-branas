import { Coupom } from "../../../domain/entities/coupon.entity";

export default interface CouponsRepository {
  getCoupon(code: string): Promise<Coupom | null>
}