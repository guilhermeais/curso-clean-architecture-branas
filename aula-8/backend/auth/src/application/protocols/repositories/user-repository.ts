import User from "../../../domain/entities/user.entity"
import SignUpUserRepository from "./signup-user-repository"

export default interface UserRepository extends SignUpUserRepository {
  getByEmail(email: string): Promise<User|null>
}