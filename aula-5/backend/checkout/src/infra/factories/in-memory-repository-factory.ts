import { CouponRepositoryInMemory } from "../repositories/coupon-repository-in-memory";
import OrderRepositoryInMemory from "../repositories/order-repository-in-memory";
import ProductRepositoryInMemory from "../repositories/product-repository-in-memory";
import RepositoryFactory from "../../application/protocols/repositories/repository-factory";

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