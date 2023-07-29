import RepositoryFactory from '../../application/factory/repository-factory'
import SimulateFreight from '../../application/usecases/simulate-freight'

export class UseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {
    
  }
  createSimulateFreight(): SimulateFreight {
    return new SimulateFreight(this.repositoryFactory)
  }
}
