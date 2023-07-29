import RepositoryFactory from '../../application/factory/repository-factory'
import ZipCodeRepository from '../../application/protocols/repositories/zip-code.repository';
import InMemoryZipCodeRepository from '../repositories/in-memory-zip-code.repository';

export class InMemoryRepositoryFactory implements RepositoryFactory {
  zipCodeRepository: InMemoryZipCodeRepository = new InMemoryZipCodeRepository()
  
  createZipCodeRepository(): ZipCodeRepository {
    return this.zipCodeRepository
  }
}

