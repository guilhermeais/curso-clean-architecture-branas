import FareCalculator from './FareCalculator'
import Segment from './Segment'

export default class OvernightSundayFareCalculator implements FareCalculator {
  static readonly FARE = 5 as const
  
  calculate(segment: Segment): number {
    return segment.distance * OvernightSundayFareCalculator.FARE
  }
}
