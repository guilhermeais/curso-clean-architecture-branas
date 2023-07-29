import StockEntry from '../../domain/entities/stock-entry'
import RepositoryFactory from '../protocols/repositories/repository-factory'
import StockEntryRepository from '../protocols/repositories/stock-entry-repository'
import { UseCase } from './usecase'

export class IncreaseStock
  implements UseCase<IncreaseStock.Input, IncreaseStock.Output>
{
  private readonly stockEntryRepo: StockEntryRepository
  constructor(repoFactory: RepositoryFactory) {
    this.stockEntryRepo = repoFactory.createStockEntryRepository()
  }
  async execute(params: IncreaseStock.Input): Promise<void> {
    await Promise.all(
      params.items.map(async item => {
        const stockEntry = new StockEntry(item.idProduct, 'in', item.qty)
        await this.stockEntryRepo.saveStockEntry(stockEntry)
      })
    )
  }
}

export namespace IncreaseStock {
  export type Input = {
    items: {
      idProduct: string
      qty: number
    }[]
  }

  export type Output = void
}
