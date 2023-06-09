import CouponsRepository from './coupons-repository'

export default class ValidateCoupon {
  constructor(private readonly couponRepository: CouponsRepository) {}

  async execute(code: string): Promise<ValidateCoupon.Output> {
    const output: ValidateCoupon.Output = {
      isValid: false,
    }
    const coupom = await this.couponRepository.getCoupon(code)
    if (coupom && !coupom.isExpired) {
      output.isValid = true
    }

    return output
  }
}

export namespace ValidateCoupon {
  export type Output = {
    isValid: boolean
  }
}
