import Email from './email'

export default class User {
  email: Email
  constructor(email: string, readonly password: string, readonly salt: string) {
    this.email = new Email(email)
  }
}
