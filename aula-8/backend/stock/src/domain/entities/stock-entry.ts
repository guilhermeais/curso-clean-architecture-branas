export default class StockEntry {
  constructor(
    private readonly _idProduct: number,
    private readonly _operation: 'in' | 'out',
    private readonly _qty: number
  ) {
    if (this._qty < 1) throw new Error('Invalid quantity.')
  }

  get qty() {
    return this._qty
  }

  get operation() {
    return this._operation
  }

  get isIn() {
    return this.operation === 'in'
  }

  get idProduct() {
    return this._idProduct
  }
}
