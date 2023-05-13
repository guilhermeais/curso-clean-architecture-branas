import { Product, ProductProps } from '../../../src/domain/entities/product'
import { makeProduct } from '../../__mocks__/product.mock'

describe('Product', () => {
  test('Deve tacar um erro se a dimensão do produto for menor que zero', () => {
    const productProps = {
      ...makeProduct(),
      dimesion: {
        height: -1,
        length: 0,
        width: 0,
      },
    }

    expect(() => new Product(productProps)).toThrowError('Invalid dimension')
  })

  test('Deve tacar um erro se o peso do produto for menor que zero', () => {
    const productProps = {
      ...makeProduct(),
      weight: -1,
    } as ProductProps

    expect(() => new Product(productProps)).toThrowError('Invalid weight')
  })
})
