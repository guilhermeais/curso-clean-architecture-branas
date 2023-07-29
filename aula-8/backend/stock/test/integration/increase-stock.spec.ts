import { IncreaseStock } from '../../src/application/usecases/increase-stock'
import { InMemoryRepositoryFactory } from '../../src/infra/factories/in-memory-repository-factory'
import InMemoryStockRepository from '../../src/infra/repositories/in-memory-stock-repository'

describe('IncreaseStock', () => {
  let sut: IncreaseStock
  let inMemoryRepositoryFactory: InMemoryRepositoryFactory
  let stockRepository: InMemoryStockRepository

  beforeEach(() => {
    inMemoryRepositoryFactory = new InMemoryRepositoryFactory()

    stockRepository = new InMemoryStockRepository()
    inMemoryRepositoryFactory.stockEntryRepository = stockRepository
    sut = new IncreaseStock(inMemoryRepositoryFactory)
  })

  test('Deve aumentar o estoque do produto', async () => {
    const input: IncreaseStock.Input = {
      items: [
        {
          idProduct: '1',
          qty: 2,
        },
      ],
    }

    await sut.execute(input)

    expect(stockRepository.stockEntries.length).toEqual(1)
    expect(stockRepository.stockEntries[0].operation).toEqual('in')
    expect(stockRepository.stockEntries[0].qty).toEqual(2)
    expect(stockRepository.stockEntries[0].idProduct).toEqual('1')
  })
})
