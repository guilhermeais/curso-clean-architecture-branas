import MockDate from 'mockdate'
import VerifySession from '../../src/application/usecases/verify-session'
import User from '../../src/domain/entities/user.entity'
import { sign } from 'jsonwebtoken'

let sut: VerifySession
const actualDate = new Date(2022, 0, 1)
beforeEach(() => {
  MockDate.set(actualDate)
  sut = new VerifySession()
})

afterEach(() => {
  MockDate.reset()
})

test('Deve verificar o token', async () => {
  const user = User.create('teste@mail.com', 'abc123', 'pbkdf2')
  const token = sign({ email: user.email.value }, 'secret', {
    expiresIn: '1 day',
  })
  const output = await sut.execute({ token })

  expect(output.email).toBe(user.email.value)
  expect(output.isValid).toBe(true)
})

test('Deve verificar o token expirado', async () => {
  const user = User.create('teste@mail.com', 'abc123', 'pbkdf2')
  const token = sign({ email: user.email.value }, 'secret', {
    expiresIn: '1 day',
  })
  const oneDayAfterDate = actualDate.setDate(actualDate.getDate() + 1)
  MockDate.set(oneDayAfterDate)

  const output = await sut.execute({ token })

  expect(output.isValid).toBe(false)
})

test('Deve verificar o token com a chave secreta inválida', async () => {
  const user = User.create('teste@mail.com', 'abc123', 'pbkdf2')
  const token = sign({ email: user.email.value }, 'invalid_secret', {
    expiresIn: '1 day',
  })

  const output = await sut.execute({ token })

  expect(output.isValid).toBe(false)
})
