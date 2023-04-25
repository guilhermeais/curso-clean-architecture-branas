import { OrdersController } from "../application/controller/orders-controller";
import { CreateOrder } from "../application/use-cases/create-order";
import { InMemoryOrderRepository } from "../infra/data/in-memory-order-repository";
import { ExpressRouterAdapter } from "./adapters/express-adapter";

const port = Number(process.env.PORT) || 3000

const expressRouterAdapter = new ExpressRouterAdapter()

const orderRepository = new InMemoryOrderRepository()
const createOrder = new CreateOrder(orderRepository)
const ordersController = new OrdersController(createOrder)

expressRouterAdapter.post('/orders', ordersController)

expressRouterAdapter.listen(port, () => console.log('Server running at http://localhost:3000'));

const closeEvents = ['SIGINT', 'SIGTERM', 'SIGQUIT']

closeEvents.forEach((event) => {
  process.on(event, async () => {
    await expressRouterAdapter.close()
    process.exit(0)
  })
})