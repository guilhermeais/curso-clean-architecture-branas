import { OrdersController } from "../application/controller/orders-controller";
import { CreateOrder } from "../application/use-cases/create-order";
import { InMemoryOrderRepository } from "../infra/data/in-memory-order-repository";
import { ExpressRouterAdapter } from "./adapters/express-adapter";

const expressApp = new ExpressRouterAdapter()

const orderRepository = new InMemoryOrderRepository()
const createOrder = new CreateOrder(orderRepository)
const ordersController = new OrdersController(createOrder)

expressApp.post('/orders', ordersController)

export default expressApp