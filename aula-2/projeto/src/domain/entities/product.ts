import { randomUUID } from 'crypto'
import { Dimesion, DimesionProps } from '../value-objects/dimesion'

export class Product {
  id: string = randomUUID()
  name!: string
  price!: number
  description?: string
  private _dimesion!: Dimesion
  weight!: number

  constructor(props: ProductProps) {
    if (props.weight < 0 ) {
      throw new Error('Invalid weight')
    }
    props.weight = props.weight || 0
    props.price = Number(props.price || 0)
    this._dimesion = Dimesion.create(props.dimesion)
    Object.assign(this, props)
  }

  set dimesion(dimesion: DimesionProps) {
    this._dimesion = Dimesion.create(dimesion)
  }

  get dimesion(): Dimesion {
    return this._dimesion
  }

  get density() {
    return this.weight / this._dimesion.volume
  }
}

export type ProductProps = {
  id?: string
  name: string
  price: number
  description?: string
  dimesion: DimesionProps
  weight: number
}
