import AuthGateway from '../../application/protocols/gateway/auth-gateway'
import HttpClient from '../http/http-client'

export default class AuthHttpGateway implements AuthGateway {
  constructor(private readonly httpClient: HttpClient) {}
  async verifySession(
    token: string
  ): Promise<{ email?: string; isValid: boolean }> {
    const output = await this.httpClient.post(
      'http://localhost:3004/verify',
      { token }
    )

    return output
  }
}
