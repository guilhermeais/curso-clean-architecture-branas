import supertest from 'supertest'
import httpController from '../../src/app'
import ProductRepositoryInMemory from '../../src/infra/repositories/product-repository-in-memory'
import { GetProducts } from '../../src/application/usecases/get-products'
import { Product } from '../../src/domain/entities/product-entity'

describe('GET /products', () => {
  let productsRepo: ProductRepositoryInMemory
  beforeEach(() => {
    productsRepo = new ProductRepositoryInMemory()
    jest
      .spyOn(
        httpController.useCaseFactory.repositoryFactory,
        'createProductsRepository'
      )
      .mockReturnValue(productsRepo)
  })

  test('should get all products', async () => {
    const mockedProducts = [new Product('1', 'A', 150, 100, 30, 10, 3)]
    productsRepo.products = new Map<string, Product>(
      mockedProducts.map(p => [p.id.toString(), p])
    )

    const result = await supertest(
      httpController.httpServer.nativeListener
    ).get('/products')

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(mockedProducts)
  })
})
