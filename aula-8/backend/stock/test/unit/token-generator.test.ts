import { sign } from 'jsonwebtoken'
import TokenGenerator from '../../src/domain/entities/token-generator'
import MockDate from 'mockdate'
import User from '../../src/domain/entities/user.entity'

let sut: TokenGenerator
const secret = 'secret'

const actualDate = new Date(2022, 0, 1)
beforeEach(() => {
  MockDate.set(actualDate)
  sut = new TokenGenerator(secret)
})

beforeAll(() => {
  MockDate.reset()
})

test('Deve assinar um token válido', () => {
  const user = User.create('teste@mail.com', 'abc123', 'pbkdf2')
  const token = sut.sign(user)

  const expectedToken = sign({ email: user.email.value }, secret, {
    expiresIn: '1 day',
  })

  expect(token).toEqual(expectedToken)
})

test('Deve verificar um token', () => {
  const user = User.create('teste@mail.com', 'abc123', 'pbkdf2')
  const token = sign({ email: user.email.value }, secret, {
    expiresIn: '1 day',
  })

  const output = sut.verify(token)

  expect(output.email).toEqual(user.email.value)
})
