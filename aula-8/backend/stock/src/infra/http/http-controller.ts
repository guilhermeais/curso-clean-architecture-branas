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
    httpServer.on('post', '/increase-stock', async function (params, body) {
      const increaseStock = useCaseFactory.createIncreaseStock()
      const output = await increaseStock.execute({
        items: body.items,
      })
      return output
    })

    httpServer.on('post', '/decrease-stock', async function (params, body) {
      const decreaseStock = useCaseFactory.createDecreaseStock()
      const output = await decreaseStock.execute({
        items: body.items,
      })
      return output
    })

    httpServer.on(
      'get',
      '/get-stock/:idProduct',
      async function (params, body) {
        const getStock = useCaseFactory.createGetStock()
        const output = await getStock.execute({
          idProduct: params.idProduct,
        })
        return output
      }
    )
  }
}
