import { InMemoryRepositoryFactory } from "../../src/infra/factories/in-memory-repository-factory";
import { Product } from "../../src/domain/entities/product-entity";
import { GetProduct } from "../../src/application/usecases/get-product";

let sut: GetProduct
let repositoryFactory: InMemoryRepositoryFactory;

beforeEach(() => {
  repositoryFactory = new InMemoryRepositoryFactory()
  repositoryFactory.productRepository.products = new Map<string, Product>([
    ['1', new Product('1', 'A', 150, 100, 30, 10, 3)],
    ['2', new Product('2', 'B', 100, 50, 50, 50, 22)],
    ['3', new Product('3', 'C', 100, 10, 10, 10, 0.9)],
  ])

  sut = new GetProduct(repositoryFactory)
})

test('Deve retornar um produto cadastrado', async () => {
  const result = await sut.execute('1')
  expect(result?.id).toEqual('1')
  expect(result?.description).toEqual('A')
  expect(result?.price).toEqual(150)
  expect(result?.length).toEqual(10)
});