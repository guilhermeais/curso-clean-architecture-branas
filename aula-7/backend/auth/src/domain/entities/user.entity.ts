import Email from './email'
import Password from './password'
import PasswordFactory, { PasswordTypes } from './password-factory'
import PBKDF2Password from './pbkdf2-password'

/**
 * AG -> Aggregate Root
 */
export default class User {
  email: Email
  private _password: Password

  private constructor(
    email: string,
    password: Password,
    readonly passwordType: PasswordTypes
  ) {
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
  static create(email: string, password: string, passwordType: PasswordTypes) {
    const passwordStrategy = PasswordFactory.create(passwordType, password)
    return new User(email, passwordStrategy, passwordType)
  }

  /**
   *
   * @description static factory method
   */
  static restore(
    email: string,
    hashedPassword: string,
    salt: string,
    passwordType: PasswordTypes
  ) {
    const passwordStrategy = PasswordFactory.restore(passwordType, hashedPassword, salt)

    return new User(
      email,
      passwordStrategy,
      passwordType
    )
  }

  validatePassword(password: string) {
    return this.password.validate(password)
  }

  updatePassword(password: string) {
    this._password = PBKDF2Password.create(password)
  }
}
