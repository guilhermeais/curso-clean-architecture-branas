import { CPF } from '../value-objects/cpf'
import { DiscountCoupon } from './discount-coupon'
import { Product, ProductProps } from './product'
import { randomUUID } from 'crypto'

export default class Order {
  private _id: string = randomUUID()
  private _products: Product[] = []
  private _discountCoupons: DiscountCoupon[] = []
  description?: string
  private _cpf: CPF

  constructor(props: OrderProps) {
    props.products = props.products || []

    this._products = props.products.map(product => new Product(product))
    this._discountCoupons = props.discountCoupons || []
    this.description = props.description
    this._id = props.id || this._id
    this._cpf = CPF.create(props.cpf)
  }

  get cpf() {
    return this._cpf.value
  }

  get products() {
    return this._products
  }

  get quantity() {
    return this._products.length
  }

  get discountCoupons() {
    return this._discountCoupons
  }

  get id() {
    return this._id
  }

  addProduct(...product: Product[]) {
    this._products = [...this._products, ...product]
  }

  removeProduct(id: string) {
    this._products = this._products.filter(product => product.id !== id)
  }
  
  applyDiscountCoupon(...coupon: DiscountCoupon[]) {
    this._discountCoupons = [...this._discountCoupons, ...coupon]
  }

  removeDiscountCoupon(id: string) {
    this._discountCoupons = this._discountCoupons.filter(coupon => coupon.id !== id)
  }

  get totalWithoutDiscount() {
    return this._products.reduce((total, product) => total + product.price, 0)
  }
  
  get discountPercentage() {
    return this._discountCoupons.reduce((total, coupon) => total + coupon.percentage, 0)
  }

  get total() {
    return this.totalWithoutDiscount - (this.totalWithoutDiscount * (this.discountPercentage / 100))
  }
}

export type OrderProps = {
  id?: string
  products?: Product[]
  description?: string
  discountCoupons?: DiscountCoupon[]
  cpf: string
}