import { validate } from './validateCPF'

class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public width: number,
    public height: number,
    public length: number,
    public weight: number
  ) {}
}

class Coupom {
  constructor(
    public code: string,
    public percentage: number,
    public expirationDate: Date
  ) {}

  get isExpired() {
    return this.expirationDate.getTime() <= new Date().getTime()
  }
}
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

const coupons = new Map<string, Coupom>([
  ['VALE20', new Coupom('VALE20', 20, tomorrow)],
  ['VALE10', new Coupom('VALE10', 10, yesterday)],
])

const products = new Map<string, Product>([
  ['1', new Product('1', 'A', 150, 100, 30, 10, 3)],
  ['2', new Product('2', 'B', 100, 50, 50, 50, 22)],
  ['3', new Product('3', 'C', 100, 10, 10, 10, 0.9)],
  ['4', new Product('4', 'D', 30, -10, -10, -10, 1)],
  ['5', new Product('5', 'D', 30, 10, 10, 10, -1)],
])

export class Checkout {
  async execute(data: Checkout.Input): Promise<Checkout.Output> {
    const checkout: Checkout.Output = {
      subtotal: 0,
      freight: 0,
      total: 0,
    }

    if (!validate(data.cpf)) {
      throw new Error('Invalid CPF')
    }

    const { items, coupon, from, to } = data
    const processedIds = new Set<string>()
    if (items && Array.isArray(items)) {
      for (const item of items) {
        if (item.quantity <= 0) {
          throw new Error('Invalid quantity')
        }

        const product = products.get(item.productId.toString())

        const isDuplicated = processedIds.has(item.productId.toString())

        if (isDuplicated) {
          throw new Error('Duplicated item')
        }

        if (product) {
          if (product.width < 0 || product.height < 0 || product.length < 0) {
            throw new Error('Invalid dimensions')
          }

          if (product.weight < 0) {
            throw new Error('Invalid weight')
          }

          checkout.subtotal += product.price * item.quantity
          processedIds.add(item.productId.toString())

          if (from && to) {
            const volume =
              (product.width / 100) *
              (product.height / 100) *
              (product.length / 100)

            const density = product.weight / volume
            const distance = 1000
            const freigth = volume * distance * (density / 100) * item.quantity
            checkout.freight += Math.max(freigth, 10)
          }
        }
      }
    }

    checkout.total = checkout.subtotal

    if (coupon) {
      const coupom = coupons.get(coupon)
      if (coupom && !coupom.isExpired) {
        checkout.total -= (checkout.total * coupom.percentage) / 100
      }
    }

    checkout.total = checkout.total + checkout.freight

    return checkout
  }
}

export namespace Checkout {
  export type Input = {
    cpf: string
    items: { productId: number; quantity: number }[]
    coupon?: string
    from?: string
    to?: string
  }

  export type Output = {
    subtotal: number
    freight: number
    total: number
  }
}
