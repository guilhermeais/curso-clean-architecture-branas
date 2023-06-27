import supertest from 'supertest'
import httpController from '../../src/app'

describe('POST /simulate-freight', () => {

  test('Deve simular o frete de um pedido', async () => {
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

    const result = await supertest(
      httpController.httpServer.nativeListener
    ).post('/simulate-freight').send(input);

    expect(result.statusCode).toEqual(200);
    expect(result.body.freight).toEqual(30);
  })
})
