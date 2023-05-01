import FareCalculatorHandler from './FareCalculatorHandler'
import Segment from './Segment'

export default class NormalFareCalculatorHandler
  implements FareCalculatorHandler
{
  static readonly FARE = 2.1 as const
  constructor(readonly next?: FareCalculatorHandler) {}

  calculate(segment: Segment): number {
    if (!segment.isOvernight() && !segment.isSunday()) {
      return segment.distance * NormalFareCalculatorHandler.FARE
    }

    if (!this.next) {
      throw new Error('End of chain')
    }

    return this.next.calculate(segment)
  }
}
