import { pbkdf2Sync, randomBytes } from 'crypto'
import Email from './email'

export default class User {
  email: Email
  private constructor(
    email: string,
    readonly password: string,
    readonly salt: string
  ) {
    this.email = new Email(email)
  }

  /**
   *
   * @description static factory method
   */
  static create(email: string, password: string) {
    const salt = randomBytes(20).toString('hex')
    const hashedPassword = pbkdf2Sync(
      password,
      salt,
      64,
      100,
      'sha512'
    ).toString('hex')

    return new User(email, hashedPassword, salt)
  }

  /**
   *
   * @description static factory method
   */
  static restore(email: string, hashedPassword: string, salt: string) {
    return new User(email, hashedPassword, salt)
  }
}
