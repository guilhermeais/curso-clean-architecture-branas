import FareCalculatorHandler from './FareCalculatorHandler'
import Segment from './Segment'

export default class OvernightFareCalculatorHandler
  implements FareCalculatorHandler
{
  static readonly FARE = 3.9 as const
  constructor(readonly next?: FareCalculatorHandler) {}

  calculate(segment: Segment): number {
    if (segment.isOvernight() && !segment.isSunday()) {
      return segment.distance * OvernightFareCalculatorHandler.FARE
    }

    if (!this.next) {
      throw new Error('End of chain')
    }

    return this.next.calculate(segment)
  }
}
