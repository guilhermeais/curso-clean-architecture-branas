import UserRepository from '../../application/protocols/repositories/user-repository'
import User from '../../domain/entities/user.entity'

export default class InMemoryUserRepository implements UserRepository {
  users: User[] = []

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email.value === email)
    if (!user) return null
    return User.restore(user.email.value, user.password, user.salt)
  }
}
