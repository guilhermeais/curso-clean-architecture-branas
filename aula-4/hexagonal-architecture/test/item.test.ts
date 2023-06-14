import { Item } from '../src/item.entity'
import { Product } from '../src/product-entity'

test('Não deve criar um item com quantidade inválida', () => {
  const product = new Product('1', 'A', 150, 100, 30, 10, 3)
  expect(() => new Item(product.id.toString(), product.price, 0)).toThrowError(new Error('Invalid quantity'))
})
