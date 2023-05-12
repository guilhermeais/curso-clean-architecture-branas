import { randomUUID } from 'crypto'

export class Product {
  id: string = randomUUID()
  name!: string
  price!: number
  description?: string

  constructor(props: ProductProps | Product) {
    props.price = Number(props.price || 0)
    Object.assign(this, props)
  }
}

export type ProductProps = {
  id?: string
  name: string
  price: number
  description: string
}
