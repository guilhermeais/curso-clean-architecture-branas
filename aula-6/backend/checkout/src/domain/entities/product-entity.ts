export class Product {
  constructor(
    public id: string | number,
    public description: string,
    public price: number,
    public width: number,
    public height: number,
    public length: number,
    public weight: number,
    public _volume: number = 0,
    public _density: number = 0
  ) {
    if (width < 0 || height < 0 || length < 0) {
      throw new Error('Invalid dimensions')
    }

    if (weight < 0) {
      throw new Error('Invalid weight')
    }
  }

  get volume(): number {
    return (this.width / 100) * (this.height / 100) * (this.length / 100)
  }

  get density(): number {
    return this.weight / this.volume
  }
}
