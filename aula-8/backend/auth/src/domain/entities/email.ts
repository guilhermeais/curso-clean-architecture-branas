export default class Email {
  value: string

  constructor(email: string) {
    if (!this.isValid(email)) throw new Error('Invalid Email.')

    this.value = email
  }

  isValid(email: string) {
    const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailValidationRegex.test(email)
  }
}
