import { Product } from '../../domain/entities/product-entity'
import ProductsRepository from '../protocols/repositories/products-repository'
import RepositoryFactory from '../protocols/repositories/repository-factory'
import { UseCase } from './usecase'

export class GetProduct implements UseCase<string, GetProductOutput | null> {
  private readonly productRepo: ProductsRepository
  constructor(repositoryFactory: RepositoryFactory) {
    this.productRepo = repositoryFactory.createProductsRepository()
  }
  async execute(productId: string) {
   
    const  product =  await this.productRepo.getProduct(productId)

    if (!product) {
      return null
    }

    return {
      ...product,
      id: product.id.toString(),
      volume: product.volume,
      density: product.density
    }
  }
}

export type GetProductOutput = {
  id: string
  description: string
  price: number
  width: number
  height: number
  length: number
  weight: number
  volume: number
  density: number
}
