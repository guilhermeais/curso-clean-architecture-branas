import UserRepository from "./user-repository";

export default interface RepositoryFactory {
  createUserRepository(): UserRepository;
}