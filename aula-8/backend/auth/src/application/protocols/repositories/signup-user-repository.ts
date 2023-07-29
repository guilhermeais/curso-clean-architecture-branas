import User from "../../../domain/entities/user.entity"

export default interface SignUpUserRepository {
  save(user: User): Promise<void>
}