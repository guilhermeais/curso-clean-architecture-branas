import Password from './password'
import PBKDF2Password from './pbkdf2-password'
import PlainPassword from './plain-password'

export type PasswordTypes = 'plaintext' | 'pbkdf2'

export default class PasswordFactory {
  static create(type: PasswordTypes, password: string): Password {
    const passwords: { [key: string]: Password } = {
      pbkdf2: PBKDF2Password.create(password),
      plaintext: PlainPassword.create(password),
    } as const

    const choosenPassword = passwords[type]

    return choosenPassword
  }

  static restore(type: PasswordTypes, password: string, salt?: string): Password {
    const passwords: { [key: string]: Password } = {
      pbkdf2: PBKDF2Password.restore(password, salt!),
      plaintext: PlainPassword.restore(password),
    } as const

    const choosenPassword = passwords[type]

    return choosenPassword
  }
}
