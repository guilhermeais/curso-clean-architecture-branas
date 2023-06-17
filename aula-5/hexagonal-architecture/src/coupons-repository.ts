import { Coupom } from "./coupon.entity";

export default interface CouponsRepository {
  getCoupon(code: string): Promise<Coupom | null>
}