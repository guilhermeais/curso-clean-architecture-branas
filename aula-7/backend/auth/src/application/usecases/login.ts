import { pbkdf2Sync } from 'crypto'
import { UseCase } from './usecase'
import UserRepository from '../protocols/repositories/user-repository'
import { sign } from 'jsonwebtoken'

export default class Login implements UseCase<Login.Input, Login.Result> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(params: Login.Input): Promise<Login.Result> {
    const email = params.email.toLowerCase()
    const inputPassword = params.password

    const user = await this.userRepo.getByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    const hashedInputPassword = pbkdf2Sync(
      inputPassword,
      user.salt,
      64,
      100,
      'sha512'
    ).toString('hex')

    if (user.password !== hashedInputPassword) {
      throw new Error('Invalid user password.')
    }

    const token = sign({ email: user.email.value }, 'secret', {
      expiresIn: '1 day',
    })

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
