import { DecreaseStock } from '../../src/application/usecases/decrease-stock'
import { InMemoryRepositoryFactory } from '../../src/infra/factories/in-memory-repository-factory'
import InMemoryStockRepository from '../../src/infra/repositories/in-memory-stock-repository'

describe('DecreaseStock', () => {
  let sut: DecreaseStock
  let inMemoryRepositoryFactory: InMemoryRepositoryFactory
  let stockRepository: InMemoryStockRepository

  beforeEach(() => {
    inMemoryRepositoryFactory = new InMemoryRepositoryFactory()

    stockRepository = new InMemoryStockRepository()
    inMemoryRepositoryFactory.stockEntryRepository = stockRepository
    sut = new DecreaseStock(inMemoryRepositoryFactory)
  })

  test('Deve diminuir o estoque do produto', async () => {
    const input: DecreaseStock.Input = {
      items: [
        {
          idProduct: '1',
          qty: 2,
        },
      ],
    }

    await sut.execute(input)

    expect(stockRepository.stockEntries.length).toEqual(1)
    expect(stockRepository.stockEntries[0].operation).toEqual('out')
    expect(stockRepository.stockEntries[0].qty).toEqual(2)
    expect(stockRepository.stockEntries[0].idProduct).toEqual('1')
  })
})
