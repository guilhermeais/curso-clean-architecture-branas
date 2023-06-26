import { HttpServer } from "./http-server";
import { UseCaseFactory } from "../factories/usecase-factory";

/**
 * Interface adapter
 */
export class HttpController {
  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {

    httpServer.on('get', '/products', async function (params, body) {
      const output = await useCaseFactory.createGetProducts().execute();

      return output
    })
  }
}