import express, { Request, Response } from 'express'
import { Checkout } from './application/usecases/checkout'
import { InMemoryRepositoryFactory } from './infra/factories/in-memory-repository-factory'
import ExpressAdapter from './infra/http/ExpressAdapter'
import { HttpController } from './infra/http/http-controller'
import { UseCaseFactory } from './infra/factories/usecase-factory'
import GatewayHttpFactory from './infra/factories/gateway-http-factories'
import AxiosAdapter from './infra/http/axios-adapter'
const httpServer = new ExpressAdapter()
const httpClient = new AxiosAdapter()
const gatewayHttpFactory = new GatewayHttpFactory(httpClient)
const httpController = new HttpController(
  httpServer,
  new UseCaseFactory(
    new InMemoryRepositoryFactory(),
    gatewayHttpFactory
  )
)

export default httpController
