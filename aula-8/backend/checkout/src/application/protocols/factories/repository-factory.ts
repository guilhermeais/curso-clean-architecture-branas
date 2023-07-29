import CouponsRepository from "../repositories/coupons-repository";
import OrderRepository from "../repositories/order-repository";
import ProductsRepository from "../repositories/products-repository";

export default interface RepositoryFactory {
  createOrderRepository(): OrderRepository
  createProductsRepository(): ProductsRepository
  createCouponsRepository(): CouponsRepository
}