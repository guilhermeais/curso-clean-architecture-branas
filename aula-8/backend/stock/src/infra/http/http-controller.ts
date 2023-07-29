import { HttpServer } from './http-server'
import { UseCaseFactory } from '../factories/usecase-factory'

/**
 * Interface adapter
 */
export class HttpController {
  constructor(
    readonly httpServer: HttpServer,
    readonly useCaseFactory: UseCaseFactory
  ) {
    // httpServer.on('post', '/verify', async function (params, body) {
    //   const verify = useCaseFactory.createVerifySession()
    //   const output = await verify.execute({
    //     token: body.token,
    //   })
    //   return output
    // })
  }
}
