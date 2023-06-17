import { CouponRepositoryInMemory } from "./coupon-repository-in-memory";
import OrderRepositoryInMemory from "./order-repository-in-memory";
import ProductRepositoryInMemory from "./product-repository-in-memory";
import RepositoryFactory from "./repository-factory";

export class InMemoryRepositoryFactory implements RepositoryFactory {
  orderRepository = new OrderRepositoryInMemory()
  productRepository = new ProductRepositoryInMemory()
  couponsRepository = new CouponRepositoryInMemory()

  createOrderRepository(): OrderRepositoryInMemory {
    return this.orderRepository
  }
  createProductsRepository(): ProductRepositoryInMemory {
    return this.productRepository
  }
  createCouponsRepository(): CouponRepositoryInMemory {
    return this.couponsRepository
  }

}