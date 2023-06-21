import { test } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'
import CheckoutGateway from '../src/gateway/CheckoutGateway'

async function sleep(mls: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), mls)
  })
}

test('Deve testar tudo', async () => {
  const checkoutGateway: CheckoutGateway = {
    getProducts: async () => [
      {
        id: 1,
        description: 'A',
        price: 1000,
      },
      {
        id: 2,
        description: 'B',
        price: 5000,
      },
      {
        id: 3,
        description: 'C',
        price: 30,
      },
    ],
    checkout: async (order: any) => {
      return {
        freight: 0,
        total: 6090,
      }
    },
  }
  const wrapper = mount(App, {
    global: {
      provide: {
        CheckoutGateway: checkoutGateway,
      },
    },
  })
  await sleep(150)
  expect(wrapper.get('.module-name').text()).toEqual('Checkout')
  expect(wrapper.findAll('.product-description').at(0)?.text()).toEqual('A')
  expect(wrapper.findAll('.product-description').at(1)?.text()).toEqual('B')
  expect(wrapper.findAll('.product-description').at(2)?.text()).toEqual('C')

  expect(wrapper.findAll('.product-price').at(0)?.text()).toEqual('1000')
  expect(wrapper.findAll('.product-price').at(1)?.text()).toEqual('5000')
  expect(wrapper.findAll('.product-price').at(2)?.text()).toEqual('30')

  await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
  await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
  await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
  expect(wrapper.get('.total').text()).toBe('3000')
  expect(wrapper.findAll('.order-item').at(0)?.text()).toBe('1 3')

  await wrapper.get('.checkout-button').trigger('click')
})
