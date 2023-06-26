import { Product } from "../../domain/entities/product-entity";
import ProductsRepository from "../protocols/repositories/products-repository";
import RepositoryFactory from "../protocols/repositories/repository-factory";
import { UseCase } from "./usecase";

export class GetProduct implements UseCase<string, Product | null> {
  private readonly productRepo: ProductsRepository
  constructor(repositoryFactory: RepositoryFactory) {
    this.productRepo = repositoryFactory.createProductsRepository()
  }
  async execute(productId: string) {
    /**Deve haver muito cuidado ao retornar a entidade diretamente do repositório
     * Isso porque o caso de uso é um responsável por fazer uma operação especifica 
     * e consequentemente, ter um retorno especifico.
     * 
     * A entidade, já é uma regra de negócio que pode ser compartilhada e aplicada em
     * qualquer contexto.
     * 
     * Desse modo, se em algum momento precisarmos retornar coisas diferentes e de outros 
     * repositórios, teríamos alguns problemas aqui.
     */
    return this.productRepo.getProduct(productId) 
  }
}