import supertest from 'supertest'
import httpController from '../../src/app'
import { InMemoryRepositoryFactory } from '../../src/infra/factories/in-memory-repository-factory'
import { Product } from '../../src/domain/entities/product-entity'
import { GatewayInMemoryFactory } from '../../src/infra/factories/gateway-in-memory-factory'
import { CouponRepositoryInMemory } from '../../src/infra/repositories/coupon-repository-in-memory'
import { Coupom } from '../../src/domain/entities/coupon.entity'
import OrderRepositoryInMemory from '../../src/infra/repositories/order-repository-in-memory'
import { sign } from 'jsonwebtoken'

let request: supertest.SuperTest<supertest.Test>
let repositoryFactory: InMemoryRepositoryFactory
let gatewayFactory: GatewayInMemoryFactory

beforeEach(() => {
  repositoryFactory = new InMemoryRepositoryFactory()
  gatewayFactory = new GatewayInMemoryFactory()

  gatewayFactory.catalogGateway.products = new Map<string, Product>([
    ['1', new Product('1', 'A', 150, 100, 30, 10, 3)],
    ['2', new Product('2', 'B', 100, 50, 50, 50, 22)],
    ['3', new Product('3', 'C', 100, 10, 10, 10, 0.9)],
  ])
  gatewayFactory.freightGateway.result.freight = 20
  repositoryFactory.couponsRepository = new CouponRepositoryInMemory()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  repositoryFactory.couponsRepository.coupons = new Map<string, Coupom>([
    ['VALE20', new Coupom('VALE20', 20, tomorrow)],
    ['VALE10', new Coupom('VALE10', 10, yesterday)],
  ])

  httpController.useCaseFactory.setRepositoryFactory(repositoryFactory)
  httpController.useCaseFactory.setGatewayFactory(gatewayFactory)

  request = supertest(httpController.httpServer.nativeListener)
})

describe('POST /checkout', () => {
  test('Deve fazer um pedido com 3 itens e valida a autenticação', async () => {
    const input = {
      cpf: '587.099.304-00',
      items: [
        {
          productId: 1, // 150
          quantity: 1,
        },
        {
          productId: 2, // 100
          quantity: 2,
        },
      ],
    }

    const userToken = sign(
      {
        email: 'some_email@mail.com',
      },
      'secret',
      {
        expiresIn: '1 day',
      }
    )

    const createOrderResponse = await request
      .post('/checkout')
      .send(input)
      .set('Authorization', `Bearer ${userToken}`)

    expect(createOrderResponse.statusCode).toEqual(200)
    expect(createOrderResponse.body.total).toEqual(350)

    const orderId = createOrderResponse.body.orderId

    const orderResponse = await request
      .get(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`)

    expect(orderResponse.statusCode).toEqual(200)
    expect(orderResponse.body.total).toEqual(350)
  })
})
