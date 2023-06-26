import { CouponRepositoryInMemory } from "../../src/infra/repositories/coupon-repository-in-memory";
import { Coupom } from "../../src/domain/entities/coupon.entity";
import { InMemoryRepositoryFactory } from "../../src/infra/factories/in-memory-repository-factory";
import ValidateCoupon from "../../src/application/usecases/validate-coupon";

let sut: ValidateCoupon;
let repositoryFactory: InMemoryRepositoryFactory

beforeEach(() => {
  repositoryFactory = new InMemoryRepositoryFactory()
  repositoryFactory.couponsRepository = new CouponRepositoryInMemory()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  repositoryFactory.couponsRepository.coupons = new Map<string, Coupom>([
    ['VALE20', new Coupom('VALE20', 20, tomorrow)],
    ['VALE10', new Coupom('VALE10', 10, yesterday)],
  ])
  sut = new ValidateCoupon(repositoryFactory);
})

test('Deve validar o cupom de desconto válido', async () => {
  const input ='VALE20'

  const output = await sut.execute(input)

  expect(output.isValid).toBe(true)
});

test('Deve validar o cupom de desconto que não existe', async () => {
  const input ='VALE30'

  const output = await sut.execute(input)

  expect(output.isValid).toBe(false)
});

test('Deve validar o cupom de desconto que já venceu', async () => {
  const input ='VALE10'

  const output = await sut.execute(input)

  expect(output.isValid).toBe(false)
});