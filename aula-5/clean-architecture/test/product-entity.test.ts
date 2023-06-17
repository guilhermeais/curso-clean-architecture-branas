import { Product } from '../src/product-entity'

test('Deve calcular o volume', () => {
  const product = new Product(1, 'A', 1000, 100, 30, 10, 3)

  expect(product.volume).toEqual(0.03)
})

test('Deve calcular a densidade', () => {
  const product = new Product(1, 'A', 1000, 100, 30, 10, 3)
  expect(product.density).toEqual(100)
})

test('Não deve criar produto com dimensões inválidas', () => {
  expect(() => new Product('1', 'A', 100, -100, -100, -100, 10)).toThrow(
    new Error('Invalid dimensions')
  )
})

test('Não deve criar produto com dimensões inválidas', () => {
  expect(() => new Product('1', 'A', 100, 100, 100, 100, -10)).toThrow(
    new Error('Invalid weight')
  )
})
