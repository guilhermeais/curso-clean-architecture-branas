import GatewayFactory from '../protocols/factories/gateway-factory'
import AuthGateway from '../protocols/gateway/auth-gateway'
import { UseCase } from '../usecases/usecase'

export default class AuthDecorator<Decoratee extends UseCase>
  implements
    UseCase<
      { token: string } & Parameters<Decoratee['execute']>,
      ReturnType<Decoratee['execute'] | never>
    >
{
  private authGateway: AuthGateway
  constructor(
    private readonly useCase: Decoratee,
    private readonly gatewayFactory: GatewayFactory
  ) {
    this.authGateway = this.gatewayFactory.createAuthGateway()
  }

  async execute(
    params: { token: string } & Parameters<Decoratee['execute']>
  ): Promise<ReturnType<Decoratee['execute']>> {
    const { token, ...restParams } = params
    const session = await this.authGateway.verifySession(params.token)
    
    if (!session.isValid) {
      throw new Error('Invalid User Session.')
    }

    return this.useCase.execute(restParams)
  }
}
