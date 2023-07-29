import { GetStock } from '../../src/application/usecases/get-stock'
import StockEntry from '../../src/domain/entities/stock-entry'
import { InMemoryRepositoryFactory } from '../../src/infra/factories/in-memory-repository-factory'
import InMemoryStockRepository from '../../src/infra/repositories/in-memory-stock-repository'

describe('GetStock', () => {
  let sut: GetStock
  let inMemoryRepositoryFactory: InMemoryRepositoryFactory
  let stockRepository: InMemoryStockRepository

  beforeEach(() => {
    inMemoryRepositoryFactory = new InMemoryRepositoryFactory()

    stockRepository = new InMemoryStockRepository()
    inMemoryRepositoryFactory.stockEntryRepository = stockRepository
    sut = new GetStock(inMemoryRepositoryFactory)
  })

  test('Deve retornar o estoque do produto', async () => {
    stockRepository.stockEntries = [
      new StockEntry('1', 'in', 5),
      new StockEntry('1', 'in', 5),
      new StockEntry('1', 'out', 2),
      new StockEntry('2', 'out', 20),
    ]

    const input: GetStock.Input = {
      idProduct: '1',
    }

    const result = await sut.execute(input)

    expect(result).toEqual(8)
  })
})
