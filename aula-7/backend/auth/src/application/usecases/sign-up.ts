import { pbkdf2Sync, randomBytes } from 'crypto'
import { UseCase } from './usecase'
import UserRepository from '../protocols/repositories/user-repository'
import User from '../../domain/entities/user.entity'

export default class SignUp implements UseCase<SignUp.Input, any> {
  constructor(private readonly userRepo: UserRepository) {}
  async execute(params: SignUp.Input): Promise<void> {
    const email = params.email.toLowerCase()
    const inputPassword = params.password

    const salt = randomBytes(20).toString('hex')
    const password = pbkdf2Sync(
      inputPassword,
      salt,
      64,
      100,
      'sha512'
    ).toString('hex')

    const user = new User(email, password, salt)
    await this.userRepo.save(user)
  }
}

export namespace SignUp {
  export type Input = {
    email: string
    password: string
  }
}
