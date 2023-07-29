import { UseCase } from './usecase'
import UserRepository from '../protocols/repositories/user-repository'
import User from '../../domain/entities/user.entity'
import SignUpUserRepository from '../protocols/repositories/signup-user-repository'

export default class SignUp implements UseCase<SignUp.Input, any> {
  constructor(private readonly userRepo: SignUpUserRepository) {}
  async execute(params: SignUp.Input): Promise<void> {
    const email = params.email.toLowerCase()
    const inputPassword = params.password

    const user = User.create(email, inputPassword, 'pbkdf2')
    await this.userRepo.save(user)
  }
}

export namespace SignUp {
  export type Input = {
    email: string
    password: string
  }
}
