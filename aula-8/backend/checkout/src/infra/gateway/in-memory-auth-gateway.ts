import AuthGateway from '../../application/protocols/gateway/auth-gateway'

export default class InMemoryAuthGateway implements AuthGateway {
  isValid: boolean = true
  email = 'mail@mail.com'

  token: string
  verifySession(token: string): Promise<{ email?: string; isValid: boolean }> {
    this.token = token
    return Promise.resolve({
      isValid: this.isValid,
      email: this.email,
    })
  }
}
