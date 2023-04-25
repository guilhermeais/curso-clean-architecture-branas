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
  private app: Application
  private router: Router
  private server: Server

  constructor() {
    this.router = express.Router()
    this.app = express()
    this.server = new Server(this.app)
  }

  public post(path: string, controller: Controller): void {
    this.router.post(path, async (req: Request, res: Response) => {
      const response = await controller.handle(req.body)
      res.status(200).json(response)
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
    this.app.use(express.json())
    this.app.use(this.router)
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
