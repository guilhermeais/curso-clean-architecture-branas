import { InMemoryRepositoryFactory } from './infra/factories/in-memory-repository-factory'
import ExpressAdapter from './infra/http/ExpressAdapter'
import { HttpController } from './infra/http/http-controller'
import { UseCaseFactory } from './infra/factories/usecase-factory'
import GatewayHttpFactory from './infra/factories/gateway-http-factories'
import AxiosAdapter from './infra/http/axios-adapter'
import RabbitMQAdapter from './infra/queue/rabbit-mq-adapter'
import Queue from './application/protocols/queue/queue'

async function createApp(
  queue: Queue = new RabbitMQAdapter()
): Promise<HttpController> {
  const httpServer = new ExpressAdapter()
  const httpClient = new AxiosAdapter()
  const gatewayHttpFactory = new GatewayHttpFactory(httpClient)
  await queue.connect()
  const httpController = new HttpController(
    httpServer,
    new UseCaseFactory(
      new InMemoryRepositoryFactory(),
      gatewayHttpFactory,
      queue
    )
  )
  
  return httpController
}

export default createApp
