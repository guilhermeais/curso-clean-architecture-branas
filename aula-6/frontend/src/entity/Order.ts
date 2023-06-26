import Item from './Item'
import Product from './Product'

export default class Order {
  constructor(readonly cpf: string) {}
  
  private readonly _items: Item[] = []
  private _total: number = 0

  get items() {
    return this._items
  }

  get total() {
    return this._total
  }

  addItem(product: Product) {
    const existingItem = this._items.find(item => item.idProduct === product.id)

    if (!existingItem) {
      this._items.push(new Item(product.id, 1))
    } else {
      existingItem.quantity++
    }

    this._total += product.price
  }
}
