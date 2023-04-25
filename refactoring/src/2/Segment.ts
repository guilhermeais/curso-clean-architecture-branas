export default class Segment {
  static readonly OVERNIGTH_STARTS = 22 as const
  static readonly OVERNIGTH_ENDS = 6 as const

  constructor(readonly distance: number, readonly date: Date) {
    if (!this.isValidDistance(distance)) {
      throw new Error('Invalid distance')
    }

    if (!this.isValidDate(date)) {
      throw new Error('Invalid Date')
    }
  }

  isValidDistance(distance: number): boolean {
    return (
      distance != null &&
      distance != undefined &&
      typeof distance === 'number' &&
      distance > 0
    )
  }

  isValidDate(date: Date): boolean {
    return (
      date != null &&
      date != undefined &&
      date instanceof Date &&
      date.toString() !== 'Invalid Date'
    )
  }

  isOvernight(): boolean {
    return this.date.getHours() >= Segment.OVERNIGTH_STARTS || this.date.getHours() <= Segment.OVERNIGTH_ENDS
  }

  isSunday(): boolean {
    return this.date.getDay() === 0
  }
}
