export class Coupom {
  constructor(
    public code: string,
    public percentage: number,
    public expirationDate: Date
  ) {}

  get isExpired() {
    return this.expirationDate.getTime() <= new Date().getTime()
  }
}