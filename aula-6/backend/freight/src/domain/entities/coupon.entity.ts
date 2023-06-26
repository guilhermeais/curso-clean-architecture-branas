export class Coupom {
  constructor(
    public code: string,
    public percentage: number,
    public expireDate: Date
  ) {}

  isExpired(date: Date = new Date()) {
    return this.expireDate.getTime() <= date.getTime()
  }

  calculateDiscount(value: number): number {
    return value * (this.percentage / 100)
  }
}
