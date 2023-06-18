import CouponsRepository from '../protocols/repositories/coupons-repository'
import RepositoryFactory from '../protocols/repositories/repository-factory'

export default class ValidateCoupon {
  private readonly couponRepository: CouponsRepository
  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.couponRepository = repositoryFactory.createCouponsRepository()
  }
  async execute(code: string): Promise<ValidateCoupon.Output> {
    const output: ValidateCoupon.Output = {
      isValid: false,
    }
    const coupom = await this.couponRepository.getCoupon(code)
    if (coupom && !coupom.isExpired(new Date())) {
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
