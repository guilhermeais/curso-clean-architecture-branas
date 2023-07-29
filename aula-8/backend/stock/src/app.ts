import { InMemoryRepositoryFactory } from './infra/factories/in-memory-repository-factory'
import ExpressAdapter from './infra/http/ExpressAdapter'
import { HttpController } from './infra/http/http-controller'
import { UseCaseFactory } from './infra/factories/usecase-factory'
const httpServer = new ExpressAdapter()
const httpController = new HttpController(
  httpServer,
  new UseCaseFactory(new InMemoryRepositoryFactory())
)

export default httpController
