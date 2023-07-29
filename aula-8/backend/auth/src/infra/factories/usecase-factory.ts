import RepositoryFactory from '../../application/protocols/repositories/repository-factory'
import VerifySession from '../../application/usecases/verify-session'

export class UseCaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  createVerifySession(): VerifySession {
    return new VerifySession()
  }
}
