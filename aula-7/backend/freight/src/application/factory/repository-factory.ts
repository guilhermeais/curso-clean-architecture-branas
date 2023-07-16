import ZipCodeRepository from "../protocols/repositories/zip-code.repository";

export default interface RepositoryFactory {
  createZipCodeRepository(): ZipCodeRepository
}