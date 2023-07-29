import { pbkdf2Sync } from 'crypto'
import { UseCase } from './usecase'
import UserRepository from '../protocols/repositories/user-repository'
import { sign } from 'jsonwebtoken'
import TokenGenerator from '../../domain/entities/token-generator'

export default class VerifySession
  implements UseCase<VerifySession.Input, VerifySession.Result>
{
  async execute(params: VerifySession.Input): Promise<VerifySession.Result> {
    const tokenGenerator = new TokenGenerator('secret')
    try {
      const output = tokenGenerator.verify(params.token)
      return {
        email: output.email,
        isValid: true,
      }
    } catch (error) {
      return {
        isValid: false,
      }
    }
  }
}

export namespace VerifySession {
  export type Input = {
    token: string
  }

  export type Result = {
    isValid: boolean
    email?: string
  }
}
