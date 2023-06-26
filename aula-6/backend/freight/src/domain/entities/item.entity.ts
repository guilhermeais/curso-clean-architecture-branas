export class Item {
  constructor(
    readonly productId: string,
    readonly price: number,
    readonly quantity: number
  ) {
    if (quantity <= 0) throw new Error('Invalid quantity')
  }

  get total(): number {
    return this.price * this.quantity;
  }
}
