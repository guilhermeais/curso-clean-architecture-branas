// Domain service
export class FreightCalculator {
  static calculate(distance: number, volume: number, density: number) {
    const freight = volume * distance * (density / 100)
  
    return  Math.max(freight, 10)
  }
}
