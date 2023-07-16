import DistanceCalculator from '../../domain/entities/dinstance-calculator'
import { FreightCalculator } from '../../domain/entities/freight-calculator'
import RepositoryFactory from '../factory/repository-factory'
import ZipCodeRepository from '../protocols/repositories/zip-code.repository'
import { UseCase } from './usecase'

export default class SimulateFreight
  implements UseCase<SimulateFreight.Input, SimulateFreight.Output>
{
  private readonly zipCodeRepo: ZipCodeRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.zipCodeRepo = repositoryFactory.createZipCodeRepository()
  }

  async execute(input: SimulateFreight.Input): Promise<SimulateFreight.Output> {
    let totalFreight: number = 0
    for (const item of input.items) {
      if (input.from && input.to) {
        const from = await this.zipCodeRepo.get(input.from)
        const to = await this.zipCodeRepo.get(input.to)
        let distance = 1000
        if (from && to ) {
          distance = DistanceCalculator.calculate(from.coord, to.coord)
        }
        const freight = FreightCalculator.calculate(
          distance,
          item.volume,
          item.density
        )
        totalFreight += freight * item.quantity
      }
    }
    return { freight: totalFreight }
  }
}

export namespace SimulateFreight {
  export type Input = {
    items: { volume: number; density: number; quantity: number }[]
    from?: string
    to?: string
  }

  export type Output = {
    freight: number
  }
}
