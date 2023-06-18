import { Server } from "http";
import { HttpServer } from "./http-server";
import express, { Express } from 'express';

/**
 * Framework an Driver
 */
export default class ExpressAdapter implements HttpServer {
  readonly nativeListener: any;
  readonly app: Express
  constructor() {
    this.app = express();
    this.app.use(express.json())
    this.nativeListener = this.app
  }

  on(method: string, url: string, callback: (params: any, body: any) => any): void {
    if (this.isAllowedMethod(method)) {
      this.app[method](url, async (req, res) => {
        try {
          const outuput = await callback(req.params, req.body)
          return res.json(outuput)
        } catch (error: any) {
            res.status(422).json({
              message: error.message
            })
        }
      })
    }
  }

  private isAllowedMethod(method: string): method is 'get' | 'post' | 'put' | 'patch' | 'delete' {
    return ['get', 'post', 'put', 'delete', 'patch'].includes(method)
  }

  listen(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve()
      })
    })
  }

}