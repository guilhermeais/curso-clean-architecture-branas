import SimulateFreight from '../../src/application/usecases/simulate-freight'
import ZipCode from '../../src/domain/entities/zip-code'
import { InMemoryRepositoryFactory } from '../../src/infra/factory/in-memory-repository-factory'

let simulateFreight: SimulateFreight
let repositoryFactory: InMemoryRepositoryFactory

beforeEach(() => {
  repositoryFactory = new InMemoryRepositoryFactory() 
  repositoryFactory.zipCodeRepository.zipCodes.set('22030060', new ZipCode('22030060', -27.5945, -48.5477))
  repositoryFactory.zipCodeRepository.zipCodes.set('88015600', new ZipCode('88015600', -22.9129, -43.2003))
  simulateFreight = new SimulateFreight(repositoryFactory)
})
test('Deve simular o frete sem o calculo da distância', async () => {
  const input = {
    items: [
      {
        volume: 0.03,
        density: 100,
        quantity: 1,
      },
    ],
    from: '88015601',
    to: '22030060',
  }

  const output = await simulateFreight.execute(input)

  expect(output.freight).toEqual(30)
})


test('Deve simular o frete com o calculo da distância', async () => {
  const input = {
    items: [
      {
        volume: 0.03,
        density: 100,
        quantity: 1,
      },
    ],
    from: '88015600',
    to: '22030060',
  }

  const output = await simulateFreight.execute(input)

  expect(output.freight).toEqual(22.446653340244893)
})
