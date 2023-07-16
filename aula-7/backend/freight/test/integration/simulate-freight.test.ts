import SimulateFreight from '../../src/application/usecases/simulate-freight'

let simulateFreight: SimulateFreight

beforeEach(() => {
  simulateFreight = new SimulateFreight()
})
test('Deve simular o frete', async () => {
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

  expect(output.freight).toEqual(30)
})
