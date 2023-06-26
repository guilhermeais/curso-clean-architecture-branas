import CouponsRepository from "./coupons-repository";
import OrderRepository from "./order-repository";
import ProductsRepository from "./products-repository";

export default interface RepositoryFactory {
  createOrderRepository(): OrderRepository
  createProductsRepository(): ProductsRepository
  createCouponsRepository(): CouponsRepository
}