import { sign } from 'jsonwebtoken'
import Login from '../../src/application/usecases/login'
import SignUp from '../../src/application/usecases/sign-up'
import InMemoryUserRepository from '../../src/infra/repositories/in-memory-user-repository'
import MockDate from 'mockdate'
let sut: SignUp
let userRepo: InMemoryUserRepository
let login: Login

const actualDate = new Date(2022, 0, 1)
beforeEach(() => {
  MockDate.set(actualDate)
  userRepo = new InMemoryUserRepository()
  sut = new SignUp(userRepo)
  login = new Login(userRepo)
})

beforeAll(() => {
  MockDate.reset()
})

test('Deve criar uma conta do usuário', async () => {
  const input = {
    email: 'test@example.com',
    password: '123321',
  }

  await sut.execute(input)
  const expectedToken = sign({ email: input.email }, 'secret', {
    expiresIn: '1 day',
  })
  const output = await login.execute(input)
  expect(output.token).toEqual(expectedToken)
})
