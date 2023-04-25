const MIN_FARE = 10
const NORMAL_FARE = 2.1
const SUNDAY_FARE = 2.9
const OVERNIGTH_FARE = 3.9
const OVERNIGTH_SUNDAY_FARE = 5

function isOvernight(segmentDate: Date): boolean {
  return segmentDate.getHours() >= 22 || segmentDate.getHours() <= 6
}

function isSunday(segmentDate: Date): boolean {
  return segmentDate.getDay() === 0
}

function isValidDistance(distance: number): boolean {
  return (
    distance != null &&
    distance != undefined &&
    typeof distance === 'number' &&
    distance > 0
  )
}

function isValidDate(date: Date): boolean {
  return (
    date != null &&
    date != undefined &&
    date instanceof Date &&
    date.toString() !== 'Invalid Date'
  )
}

export function calculateRide(segments: { distance: number; date: Date }[]) {
  let fare = 0
  for (const segment of segments) {
    if (!isValidDistance(segment.distance)) {
      throw new Error('Invalid distance')
    }

    if (!isValidDate(segment.date)) {
      throw new Error('Invalid Date')
    }

    if (isOvernight(segment.date) && !isSunday(segment.date)) {
      fare += segment.distance * OVERNIGTH_FARE
    }

    if (isOvernight(segment.date) && isSunday(segment.date)) {
      fare += segment.distance * OVERNIGTH_SUNDAY_FARE
    }

    if (!isOvernight(segment.date) && isSunday(segment.date)) {
      fare += segment.distance * SUNDAY_FARE
    }

    if (!isOvernight(segment.date) && !isSunday(segment.date)) {
      fare += segment.distance * NORMAL_FARE
    }
  }

  const isFareLessThanMinimum = fare < MIN_FARE
  return isFareLessThanMinimum ? MIN_FARE : fare
}
