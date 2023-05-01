import FareCalculator from './FareCalculator'
import Segment from './Segment'

export default class OvernightFareCalculator implements FareCalculator {
  static readonly FARE = 3.9 as const
  
  calculate(segment: Segment): number {
    return segment.distance * OvernightFareCalculator.FARE
  }
}
