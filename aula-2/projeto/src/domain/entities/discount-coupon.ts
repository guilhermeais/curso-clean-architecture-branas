import { randomUUID } from 'crypto'

export class DiscountCoupon {
  id: string = randomUUID()
  code!: string
  percentage!: number
  expirationDate?: Date

  constructor(props: DiscountCouponProps) {
    props.percentage = Number(props.percentage || 0)
    Object.assign(this, props)
  }

  get isExpired() {
    return this.expirationDate ? this.expirationDate < new Date() : false
  }
}

export type DiscountCouponProps = {
  id?: string
  code: string
  percentage: number
  expirationDate?: Date
}
