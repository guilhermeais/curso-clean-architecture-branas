import ExpressAdapter from './infra/http/ExpressAdapter'
import { HttpController } from './infra/http/http-controller'
import { UseCaseFactory } from './infra/factory/usecase-factory'
import { InMemoryRepositoryFactory } from './infra/factory/in-memory-repository-factory'
const httpServer = new ExpressAdapter()
const repositoryFactory = new InMemoryRepositoryFactory()
const httpController = new HttpController(httpServer, new UseCaseFactory(repositoryFactory))

export default httpController
