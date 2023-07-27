import Password from './password'

export default class PlainPassword implements Password {
  readonly value: string

  private constructor(password: string) {
    this.value = password
  }

  static create(password: string) {
    return new PlainPassword(password)
  }

  static restore(password: string) {
    return new PlainPassword(password)
  }

  validate(inputPassword: string) {
    return this.value === inputPassword
  }
}
