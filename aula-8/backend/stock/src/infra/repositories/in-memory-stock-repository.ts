import StockEntryRepository from '../../application/protocols/repositories/stock-entry-repository'
import StockEntry from '../../domain/entities/stock-entry'

export default class InMemoryStockRepository implements StockEntryRepository {
  stockEntries: StockEntry[] = []

  async saveStockEntry(stockEntry: StockEntry): Promise<void> {
    this.stockEntries.push(stockEntry)
  }

  async getStockEntries(params: { idProduct: string }): Promise<StockEntry[]> {
    return this.stockEntries.filter(stockEntry => {
      return stockEntry.idProduct === params.idProduct
    })
  }
}
