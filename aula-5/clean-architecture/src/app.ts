import express, { Request, Response } from 'express'
import { Checkout } from './checkout'
import { InMemoryRepositoryFactory } from './in-memory-repository-factory'
import ExpressAdapter from './ExpressAdapter'
import { HttpController } from './http-controller'
const httpServer = new ExpressAdapter()
const checkout = new Checkout(
  new InMemoryRepositoryFactory()
);
const httpController = new HttpController(httpServer, checkout)

export default httpController
