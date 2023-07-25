import { pbkdf2Sync, randomBytes } from 'crypto'
import Email from './email'
import Password from './password'

/**
 * AG -> Aggregate Root
 */
export default class User {
  email: Email
  private _password: Password

  private constructor(email: string, password: Password) {
    this.email = new Email(email)
    this._password = password
  }

  get password() {
    return this._password
  }

  /**
   *
   * @description static factory method
   */
  static create(email: string, password: string) {
    return new User(email, Password.create(password))
  }

  /**
   *
   * @description static factory method
   */
  static restore(email: string, hashedPassword: string, salt: string) {
    return new User(email, Password.restore(hashedPassword, salt))
  }

  validatePassword(password: string) {
    return this.password.validate(password)
  }

  updatePassword(password: string) {
    this._password = Password.create(password)
  }
}
