import { pbkdf2Sync } from 'crypto'
import { UseCase } from './usecase'
import UserRepository from '../protocols/repositories/user-repository'
import { sign } from 'jsonwebtoken'
import TokenGenerator from '../../domain/entities/token-generator'

export default class Login implements UseCase<Login.Input, Login.Result> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(params: Login.Input): Promise<Login.Result> {
    const email = params.email.toLowerCase()
    const inputPassword = params.password

    const user = await this.userRepo.getByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    if (!user.validatePassword(inputPassword)) {
      throw new Error('Invalid user password.')
    }
    const tokenGenerator = new TokenGenerator('secret')

    const token = tokenGenerator.sign(user)

    return { token }
  }
}

export namespace Login {
  export type Input = {
    email: string
    password: string
  }

  export type Result = {
    token: string
  }
}
