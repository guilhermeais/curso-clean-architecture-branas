import User from "../../../domain/entities/user.entity"

export default interface UserRepository {
  save(user: User): Promise<void>
  getByEmail(email: string): Promise<User|null>
}