import RepositoryFactory from '../../application/protocols/repositories/repository-factory'
import UserRepository from '../../application/protocols/repositories/user-repository'
import InMemoryUserRepository from '../repositories/in-memory-user-repository'

export class InMemoryRepositoryFactory implements RepositoryFactory {
  createUserRepository(): UserRepository {
    return new InMemoryUserRepository()
  }
}
