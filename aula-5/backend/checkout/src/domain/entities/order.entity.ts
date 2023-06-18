import { randomUUID } from 'crypto'
import { CPF } from './cpf'
import { Item } from './item.entity'
import { Product } from './product-entity'
import { Coupom } from './coupon.entity'

export class Order {
  readonly cpf: CPF
  readonly items: Item[]
  readonly code: string
  freight: number = 0
  private coupon: Coupom | null = null

  constructor(
    readonly id: string = randomUUID(),
    cpf: string,
    readonly date: Date = new Date(),
    readonly sequence: number = 0
  ) {
    this.cpf = new CPF(cpf)
    this.items = []
    this.code = `${date.getFullYear()}${sequence.toString().padStart(8, '0')}`
  }

  get total(): number {
    let total = this.items.reduce((total, item) => (total += item.total), 0)

    if(this.coupon) {
      total -= this.coupon.calculateDiscount(total)
    }

    return total + this.freight
  }

  addItem(product: Product, qty: number): void {
    const alreadyAdded = this.items.some(item => item.productId === product.id)
    if (alreadyAdded) {
      throw new Error('Duplicated item')
    }
    this.items.push(new Item(product.id.toString(), product.price, qty))
  }

  addCoupon(coupon: Coupom): void {
    if (!coupon.isExpired(this.date)) {
      this.coupon = coupon
    }
  }
}
