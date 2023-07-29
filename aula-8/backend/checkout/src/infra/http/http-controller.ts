import { Checkout } from '../../application/usecases/checkout'
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
    httpServer.on('post', '/checkout', async function (params, body, headers) {
      const output = await useCaseFactory.createCheckout().execute({
        token: headers['Authorization'],
        ...body,
      })

      return output
    })

    httpServer.on('get', '/products', async function (params, body) {
      const output = await useCaseFactory.createGetProducts().execute()

      return output
    })

    httpServer.on('get', '/orders/:id', async function (params, body, headers) {
      const output = await useCaseFactory.createGetOrder().execute({
        ...body, 
        ...params,
        token: headers['Authorization']
      })

      return {
        total: output.total,
        code: output.code,
      }
    })
  }
}
