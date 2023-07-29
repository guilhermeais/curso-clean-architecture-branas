import StockCalculator from '../../domain/entities/stock-calculator'
import StockEntry from '../../domain/entities/stock-entry'
import RepositoryFactory from '../protocols/repositories/repository-factory'
import StockEntryRepository from '../protocols/repositories/stock-entry-repository'
import { UseCase } from './usecase'

export class GetStock implements UseCase<GetStock.Input, GetStock.Output> {
  private readonly stockEntryRepo: StockEntryRepository
  constructor(repoFactory: RepositoryFactory) {
    this.stockEntryRepo = repoFactory.createStockEntryRepository()
  }
  async execute(params: GetStock.Input): Promise<GetStock.Output> {
    const stockEntrues = await this.stockEntryRepo.getStockEntries({
      idProduct: params.idProduct,
    })

    return StockCalculator.calculate(stockEntrues)
  }
}

export namespace GetStock {
  export type Input = {
    idProduct: string
  }

  export type Output = number
}
