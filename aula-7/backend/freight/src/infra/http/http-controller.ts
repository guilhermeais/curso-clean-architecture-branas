import { HttpServer } from "./http-server";
import { UseCaseFactory } from "../factory/usecase-factory";

/**
 * Interface adapter
 */
export class HttpController {
  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
    httpServer.on('post', '/simulate-freight', async function (params, body) {
      const output = await useCaseFactory.createSimulateFreight().execute(body);

      return output
    })
  }
}