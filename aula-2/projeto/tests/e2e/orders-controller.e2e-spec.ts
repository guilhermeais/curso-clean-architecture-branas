import { CreateOrderRequest } from '../../src/application/controller/orders-controller'
import { DiscountCoupon } from '../../src/domain/entities/discount-coupon'
import expressApp from '../../src/main/app'
import request from 'supertest'
import { makeProduct } from '../__mocks__/product.mock'

describe('OrdersController e2e tests', () => {
  describe('POST /orders', () => {
    test('Deve criar ordem com 3 produtos', async () => {
      const body: CreateOrderRequest = {
        cpf: '047.825.530-64',
        products: [makeProduct(), makeProduct(), makeProduct()],
        description: 'any-description',
        distanceInKm: 1000,
      }

      const response = await request(expressApp.app).post('/orders').send(body)

      expect(response.status).toBe(201)
      expect(response.body.total).toEqual(300)
      expect(response.body.quantity).toEqual(3)
    })

    test('Deve criar ordem com 3 produtos com cupom de desconto', async () => {
      const discountCoupon = new DiscountCoupon({
        code: 'any-code',
        percentage: 10,
      })
      const body: CreateOrderRequest = {
        cpf: '047.825.530-64',
        products: [makeProduct(), makeProduct(), makeProduct()],
        description: 'any-description',
        discountCoupons: [discountCoupon],
        distanceInKm: 1000,
      }

      const response = await request(expressApp.app).post('/orders').send(body)

      expect(response.status).toBe(201)
      expect(response.body.total).toEqual(270)
      expect(response.body.quantity).toEqual(3)
      expect(response.body.totalWithoutDiscount).toEqual(300)
      expect(response.body.discountCoupons.length).toEqual(1)
    })

    test('Deve tacar um erro caso o CPF da ordem seja inválido', async () => {
      const body: CreateOrderRequest = {
        cpf: '111.834.525-00',
        products: [makeProduct()],
        distanceInKm: 1000,
        description: 'any-description',
      }

      const response = await request(expressApp.app).post('/orders').send(body)

      expect(response.status).toBe(400)
      expect(response.body.error).toEqual('Invalid CPF')
    })
  })
})
