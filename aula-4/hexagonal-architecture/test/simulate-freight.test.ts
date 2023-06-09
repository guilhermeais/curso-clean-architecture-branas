import { Product } from '../src/product-entity'
import ProductRepositoryInMemory from '../src/product-repository-in-memory'
import SimulateFreight from '../src/simulate-freight'

let simulateFreight: SimulateFreight
let productRepository: ProductRepositoryInMemory

beforeEach(() => {
  productRepository = new ProductRepositoryInMemory()
  productRepository.products = new Map<string, Product>([
    ['1', new Product('1', 'A', 150, 100, 30, 10, 3)],
    ['2', new Product('2', 'B', 100, 50, 50, 50, 22)],
    ['3', new Product('3', 'C', 100, 10, 10, 10, 0.9)],
    ['4', new Product('4', 'D', 30, -10, -10, -10, 1)],
    ['5', new Product('5', 'D', 30, 10, 10, 10, -1)],
  ])

  simulateFreight = new SimulateFreight(productRepository)
})

test('Deve simular o frete', async () => {
  const input = {
    items: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 1,
      },
    ],
    from: '04841010',
    to: '04842000',
  }

  const output = await simulateFreight.execute(input)

  expect(output.freight).toEqual(250)
})
