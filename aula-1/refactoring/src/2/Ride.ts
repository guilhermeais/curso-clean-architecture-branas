import FareCalculatorFactory from './FareCalculatorFactory'
import FareCalculatorHandler from './FareCalculatorHandler'
import Segment from './Segment'

export default class Ride {
  private segments: Segment[] = []

  static readonly MIN_FARE = 10 as const
  static readonly NORMAL_FARE = 2.1 as const
  static readonly SUNDAY_FARE = 2.9 as const
  static readonly OVERNIGTH_FARE = 3.9  as const
  static readonly OVERNIGTH_SUNDAY_FARE = 5 as const

  constructor(readonly fareCalculatorHandler: FareCalculatorHandler) {
    
  }

  addSegment(distance: number, startTime: Date) {
    this.segments.push(new Segment(distance, startTime))
  }

  calculateFare() {
    let fare = 0

    for (const segment of this.segments) {
      fare += this.fareCalculatorHandler.calculate(segment)
    }

    const isFareLessThanMinimum = fare < Ride.MIN_FARE
    return isFareLessThanMinimum ? Ride.MIN_FARE : fare
  }
}
