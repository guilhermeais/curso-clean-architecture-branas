import express, { Request, Response } from 'express'
import { validate } from './validateCPF'

class Product {
  constructor(public id: string, public name: string, public price: number) {}
}

class Coupom {
  constructor(public code: string, public percentage: number) {}
}

const coupons = new Map<string, Coupom>([
  ['VALE20', new Coupom('VALE20', 20)],
])

const products = new Map<string, Product>([
  ['1', new Product('1', 'Mochila', 150)],
  ['2', new Product('1', 'Caderno', 100)],
])

const app = express()

app.use(express.json())

app.post('/checkout', async (req: Request, res: Response) => {
  if (!validate(req.body.cpf)) {
    return res.status(400).json({ message: 'Invalid CPF' })
  }

  const { items, coupon } = req.body
  const checkout = {
    total: 0,
  }

  if (items && Array.isArray(items)) {
    for (const item of items) {
      const product = products.get(item.productId.toString())
      if (product) {
        checkout.total += product.price * item.quantity
      }
    }
  }

  if (coupon) {
    const coupom = coupons.get(coupon)
    if (coupom) {
      checkout.total -= (checkout.total * coupom.percentage) / 100
    }
  }

  return res.json(checkout)
})

export default app
