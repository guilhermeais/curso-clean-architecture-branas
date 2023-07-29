import { sign, verify } from 'jsonwebtoken'
import User from './user.entity'

export default class TokenGenerator {
  constructor(private readonly secret: string) {}

  sign(user: User): string {
    return sign({ email: user.email.value }, this.secret, {
      expiresIn: '1 day',
    })
  }

  verify(token: string): any {
    return verify(token, this.secret)
  }
}
