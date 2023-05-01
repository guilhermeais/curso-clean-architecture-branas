import FareCalculator from './FareCalculator'
import Segment from './Segment'

export default class NormalFareCalculator implements FareCalculator {
  static readonly FARE = 2.1 as const
  
  calculate(segment: Segment): number {
    return segment.distance * NormalFareCalculator.FARE
  }
}
