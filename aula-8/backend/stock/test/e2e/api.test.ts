import supertest from 'supertest'
import httpController from '../../src/app'
import TokenGenerator from '../../src/domain/entities/token-generator'
import User from '../../src/domain/entities/user.entity'
const request = supertest(httpController.httpServer.nativeListener)
describe('POST /verify', () => {
  test('Deve verificar um token', async () => {
    const mockedUser = User.create('test@mail.com', 'abc123', 'pbkdf2')
    const token = new TokenGenerator('secret').sign(mockedUser)
    const result = await request.post('/verify').send({
      token,
    })

    expect(result.statusCode).toEqual(200)
    expect(result.body.email).toEqual(mockedUser.email.value)
    expect(result.body.isValid).toEqual(true)
  })
})
