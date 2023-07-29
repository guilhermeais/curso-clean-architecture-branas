import StockEntry from './stock-entry'

export default class StockCalculator {
  static calculate(stockEntries: StockEntry[]): number {
    return stockEntries.reduce((total, entry) => {
      if (entry.isIn) {
        return (total += entry.qty)
      }

      return (total -= entry.qty)
    }, 0)
  }
}
