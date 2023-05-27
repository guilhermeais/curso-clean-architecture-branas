import { Coupom } from "./coupon.entity";

export default interface CouponsRepository {
  getCoupon(idProduct: string): Promise<Coupom | null>
}