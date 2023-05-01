import FareCalculator from './FareCalculator'
import Segment from './Segment'

export default class SundayFareCalculator implements FareCalculator {
  static readonly FARE = 2.9 as const
  
  calculate(segment: Segment): number {
    return segment.distance * SundayFareCalculator.FARE
  }
}
