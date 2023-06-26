import { FreightCalculator } from "../../src/domain/entities/freight-calculator"
import { Product } from "../../src/domain/entities/product-entity"

test('Deve calcular o frete', () => {
  const product = new Product(1, 'A', 1000, 100, 30, 10, 3)
  const freight = FreightCalculator.calculate(product)

  expect(freight).toEqual(30)
})

test('Deve calcular o frete com frete mínimo', () => {
  const product = new Product(1, 'A', 1000, 10, 10, 10, 0.9)

   const freight = FreightCalculator.calculate(product)

  expect(freight).toEqual(10)
});