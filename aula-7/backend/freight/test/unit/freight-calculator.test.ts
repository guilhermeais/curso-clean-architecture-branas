import { FreightCalculator } from '../../src/domain/entities/freight-calculator'

test('Deve calcular o frete', () => {
  const freight = FreightCalculator.calculate(1000, 0.03, 100)

  expect(freight).toEqual(30)
})

test('Deve calcular o frete com frete mínimo', () => {
  const freight = FreightCalculator.calculate(1000, 0.01, 100)

  expect(freight).toEqual(10)
})
