import StockCalculator from '../../src/domain/entities/stock-calculator'
import StockEntry from '../../src/domain/entities/stock-entry'

describe('StockCalculator', () => {
  test('Deve calcular o estoque de um determinado produto', () => {
    const stockEntries = [
      new StockEntry('1', 'in', 2),
      new StockEntry('1', 'out', 2),
      new StockEntry('1', 'in', 1),
    ]

    const total = StockCalculator.calculate(stockEntries)

    expect(total).toEqual(1)
  })

  test('Deve calcular o estoque negativo de um determinado produto', () => {
    const stockEntries = [
      new StockEntry('1', 'in', 2),
      new StockEntry('1', 'out', 2),
      new StockEntry('1', 'in', 1),
      new StockEntry('1', 'out', 3),
    ]

    const total = StockCalculator.calculate(stockEntries)

    expect(total).toEqual(-2)
  })
})
