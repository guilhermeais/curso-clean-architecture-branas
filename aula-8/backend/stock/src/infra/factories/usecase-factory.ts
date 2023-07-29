import RepositoryFactory from '../../application/protocols/repositories/repository-factory'
import { DecreaseStock } from '../../application/usecases/decrease-stock'
import { GetStock } from '../../application/usecases/get-stock'
import { IncreaseStock } from '../../application/usecases/increase-stock'

export class UseCaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  createIncreaseStock(): IncreaseStock {
    return new IncreaseStock(this.repositoryFactory)
  }

  createDecreaseStock(): DecreaseStock {
    return new DecreaseStock(this.repositoryFactory)
  }

  createGetStock(): GetStock {
    return new GetStock(this.repositoryFactory)
  }
}
