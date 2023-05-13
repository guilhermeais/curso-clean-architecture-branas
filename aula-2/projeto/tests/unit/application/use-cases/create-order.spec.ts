import { CreateOrder } from '../../../../src/application/use-cases/create-order'
import Order from '../../../../src/domain/entities/order'
import { Product } from '../../../../src/domain/entities/product'
import { InMemoryOrderRepository } from '../../../../src/infra/data/in-memory-order-repository'
import { makeProduct } from '../../../__mocks__/product.mock'

describe('CreateOrder', () => {
  function makeSut() {
    const orderRepository = new InMemoryOrderRepository()
    const sut = new CreateOrder(orderRepository)

    return {
      sut,
      orderRepository,
    }
  }

  test('Deve criar uma ordem', async () => {
    const { sut, orderRepository } = makeSut()

    const product = new Product(makeProduct())
    const productTwo = new Product(makeProduct())
    const productThree = new Product(makeProduct())

    const order = new Order({
      distanceInKm: 1000,
      cpf: '999.253.640-35',
    })

    order.addProduct(product, productTwo, productThree)

    await sut.execute({ order })

    expect(orderRepository.orders.size).toBe(1)
    expect(orderRepository.orders.get(order.id)).toEqual(order)
    expect(orderRepository.orders.get(order.id)?.products.length).toEqual(3)
  })
})
