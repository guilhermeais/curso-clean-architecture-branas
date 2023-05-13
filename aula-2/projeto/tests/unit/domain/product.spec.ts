import { Product } from "../../../src/domain/entities/product";

describe('Product', () => {
  test('Deve tacar um erro se a dimensão do produto for menor que zero', () => {
    const productProps = {
      name: 'any-name',
      description: 'any-description',
      price: 100,
      weight: 2,
      dimesion: {
        height: -1,
        length: 0,
        width: 0,
      }
    }

    expect(() => new Product(productProps)).toThrowError('Invalid dimension')
  });
});