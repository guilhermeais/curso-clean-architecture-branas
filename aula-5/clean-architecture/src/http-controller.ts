import { Checkout } from "./checkout";
import { HttpServer } from "./http-server";

/**
 * Interface adapter
 */
export class HttpController {
  constructor(readonly httpServer: HttpServer, readonly checkout: Checkout) {
    httpServer.on('post', '/checkout', async function (params, body) {
      const output = await checkout.execute(body);

      return output
    })
  }
}