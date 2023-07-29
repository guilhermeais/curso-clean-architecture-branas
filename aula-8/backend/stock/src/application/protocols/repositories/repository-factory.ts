import StockEntryRepository from './stock-entry-repository'

export default interface RepositoryFactory {
  createStockEntryRepository(): StockEntryRepository
}
