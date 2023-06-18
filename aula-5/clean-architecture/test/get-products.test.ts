import { GetProducts } from "../src/get-products";
import { InMemoryRepositoryFactory } from "../src/in-memory-repository-factory";
import { Product } from "../src/product-entity";

let sut: GetProducts
let repositoryFactory: InMemoryRepositoryFactory;

beforeEach(() => {
  repositoryFactory = new InMemoryRepositoryFactory()
  repositoryFactory.productRepository.products = new Map<string, Product>([
    ['1', new Product('1', 'A', 150, 100, 30, 10, 3)],
    ['2', new Product('2', 'B', 100, 50, 50, 50, 22)],
    ['3', new Product('3', 'C', 100, 10, 10, 10, 0.9)],
  ])

  sut = new GetProducts(repositoryFactory)
})

test('Deve retornar os produtos cadastrados', async () => {
  const result = await sut.execute()
  expect(result.length).toEqual(repositoryFactory.productRepository.products.size)
  expect(result).toEqual([...repositoryFactory.productRepository.products.values()])
});