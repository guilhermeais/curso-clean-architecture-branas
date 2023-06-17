import { Coupom } from '../src/coupon.entity'
import moment from 'moment'

test('Deve testar se o cupom de desconto é válido', () => {
  const coupon = new Coupom('VALE20', 20, moment('2023/03/01', 'YYYY/MM/DD').toDate())

  expect(coupon.isExpired(moment('2023/01/01', 'YYYY/MM/DD').toDate())).toBe(false)
})

test('Deve testar se o cupom de desconto é inválido', () => {
  const coupon = new Coupom('VALE20', 20, moment('2023/03/01', 'YYYY/MM/DD').toDate())

  expect(coupon.isExpired(moment('2023/05/01', 'YYYY/MM/DD').toDate())).toBe(true)
})

test('Deve calcular o desconto', () => {
  const coupon = new Coupom('VALE20', 20, moment('2023/03/01', 'YYYY/MM/DD').toDate())
  
  expect(coupon.calculateDiscount(1000)).toEqual(200)
});