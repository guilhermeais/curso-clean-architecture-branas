export class Product {
  constructor(
    public id: string | number,
    public description: string,
    public price: number,
    public width: number,
    public height: number,
    public length: number,
    public weight: number,
    public volume: number = 0,
    public density: number = 0
  ) {
  
  }
}
