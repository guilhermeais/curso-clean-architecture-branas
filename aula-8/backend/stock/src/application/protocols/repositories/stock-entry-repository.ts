import StockEntry from '../../../domain/entities/stock-entry'

export default interface StockEntryRepository {
  saveStockEntry(stockEntry: StockEntry): Promise<void>
  getStockEntries(params: { idProduct: string }): Promise<StockEntry[]>
}
