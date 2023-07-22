import RepositoryFactory from "../../application/protocols/repositories/repository-factory";

export class UseCaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {
    
  }
}