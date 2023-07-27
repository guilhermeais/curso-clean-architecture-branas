import { pbkdf2Sync, randomBytes } from 'crypto'
import Password from './password'

export default class PBKDF2Password implements Password {
  readonly value: string
  readonly salt: string

  private constructor(password: string, salt: string) {
    this.value = password
    this.salt = salt
  }

  static create(password: string) {
    const salt = randomBytes(20).toString('hex')
    const hashedPassword = pbkdf2Sync(
      password,
      salt,
      64,
      100,
      'sha512'
    ).toString('hex')

    return new PBKDF2Password(hashedPassword, salt)
  }

  static restore(password: string, salt: string) {
    return new PBKDF2Password(password, salt)
  }

  validate(inputPassword: string) {
    const hashedInputPassword = pbkdf2Sync(
      inputPassword,
      this.salt,
      64,
      100,
      'sha512'
    ).toString('hex')

    return this.value === hashedInputPassword
  }
}
