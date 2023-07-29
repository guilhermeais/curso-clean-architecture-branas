import RepositoryFactory from '../../application/protocols/repositories/repository-factory'
import StockEntryRepository from '../../application/protocols/repositories/stock-entry-repository'
import InMemoryStockRepository from '../repositories/in-memory-stock-repository'

export class InMemoryRepositoryFactory implements RepositoryFactory {
  stockEntryRepository: InMemoryStockRepository = new InMemoryStockRepository()

  createStockEntryRepository(): StockEntryRepository {
    return this.stockEntryRepository
  }
}
