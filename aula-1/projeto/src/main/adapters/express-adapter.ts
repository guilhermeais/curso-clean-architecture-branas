import express, {
  Express,
  Request,
  Response,
  Application,
  Router,
} from 'express'
import { Server } from 'http'
import { Controller } from '../../application/controller/controller'

export class ExpressRouterAdapter {
  private _app: Application
  private router: Router
  private server: Server

  constructor() {
    this.router = express.Router()
    this._app = express()
    this._app.use(express.json())
    this._app.use(this.router)
    this.server = new Server(this._app)
  }

  get app () {
    return this._app
  }

  public post(path: string, controller: Controller): void {
    this.router.post(path, async (req: Request, res: Response) => {
      try {
        const response = await controller.handle(req.body)
        return res.status(201).json(response)
      } catch (error: Error | any) {
        return res.status(400).json({ error: error?.message })
      }
    })
  }

  public get(path: string, controller: Controller): void {
    this.router.get(path, async (req: Request, res: Response) => {
      const response = await controller.handle(req.body)
      res.status(200).json(response)
    })
  }

  public put(path: string, controller: Controller): void {
    this.router.put(path, async (req: Request, res: Response) => {
      const response = await controller.handle(req.body)
      res.status(200).json(response)
    })
  }

  public delete(path: string, controller: Controller): void {
    this.router.delete(path, async (req: Request, res: Response) => {
      const response = await controller.handle(req.body)
      res.status(200).json(response)
    })
  }

  public listen(port: number, callback: () => void): Server {
    return this.server.listen(port, callback)
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close((err: any) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}
