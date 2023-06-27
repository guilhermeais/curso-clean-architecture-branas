import { FreightCalculator } from '../../domain/entities/freight-calculator'
import { UseCase } from './usecase'

export default class SimulateFreight
  implements UseCase<SimulateFreight.Input, SimulateFreight.Output>
{
  async execute(input: SimulateFreight.Input): Promise<SimulateFreight.Output> {
    let totalFreight: number = 0
    for (const item of input.items) {
      const freight = FreightCalculator.calculate(
        1000,
        item.volume,
        item.density
      )
      totalFreight += freight * item.quantity
    }
    return { freight: totalFreight }
  }
}

export namespace SimulateFreight {
  export type Input = {
    items: { volume: number; density: number; quantity: number }[]
    from: string
    to: string
  }

  export type Output = {
    freight: number
  }
}
