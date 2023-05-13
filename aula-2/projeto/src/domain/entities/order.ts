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
  distanceInKm!: number

  constructor(props: OrderProps) {
    props.products = props.products || []
    this.distanceInKm = props.distanceInKm || 0

    this._products = props.products.map(product => new Product({
      description: product.description,
      name: product.name,
      dimesion: product.dimesion,
      price: product.price,
      weight: product.weight,
      id: product.id
    }))
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

  private productAlreadyExists(id: string) {
    return this._products.some(product => product.id === id)
  }

  addProduct(...products: Product[]) {
    for (const product of products) {
        if(this.productAlreadyExists(product.id)) {
            throw new Error('Product already exists')
        }

        if (!product.dimesion.isValid()) {
            throw new Error('Invalid product dimesion')
        }

        this.products.push(product)
    }
  }

  removeProduct(id: string) {
    this._products = this._products.filter(product => product.id !== id)
  }
  
  applyDiscountCoupon(...coupon: DiscountCoupon[]) {
    if (coupon.some(coupon => coupon.isExpired)) {
      throw new Error('Expired coupon')
    }
    
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

  get freight(
  ) {
    return this._products.reduce((total, product) => {
      return total += this.distanceInKm * product.dimesion.volume * (product.density / 100)
    }, 0)
  }
}

export type OrderProps = {
  id?: string
  products?: Product[]
  description?: string
  discountCoupons?: DiscountCoupon[]
  cpf: string
  distanceInKm: number
}