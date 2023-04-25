import { randomUUID } from 'crypto'

export class DiscountCoupon {
  id: string = randomUUID()
  code!: string
  percentage!: number

  constructor(props: DiscountCouponProps) {
    props.percentage = Number(props.percentage || 0)
    Object.assign(this, props)
  }
}

export type DiscountCouponProps = {
  id?: string
  code: string
  percentage: number
}
