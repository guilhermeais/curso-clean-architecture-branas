export class CPF {
  readonly value: string
  constructor(unsafeCPF: string) {
    if (!this.validate(unsafeCPF)) throw new Error('Invalid CPF')
    
    this.value = unsafeCPF
  }

  [Symbol.toPrimitive](hint: string) {
    if (hint === 'string') {
      return this.value;
    }
    throw new TypeError('Cannot convert CPF to primitive value.');
  }

  toString(): string {
    return this.value
  }

  private isValidLength(cpf: string) {
    return cpf.length >= 11 || cpf.length <= 14
  }

  private isAllDigitsEqual(cpf: string) {
    return cpf.split('').every(c => c === cpf[0])
  }

  private removeNonDigits(cpf: string) {
    return cpf.replace(/\D/g, '')
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0

    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit, 10) * factor--
    }

    const rest = total % 11

    return rest < 2 ? 0 : 11 - rest
  }

  private validate(cpf: string) {
    if (!cpf) {
      return false
    }

    if (!this.isValidLength(cpf)) {
      return false
    }

    cpf = this.removeNonDigits(cpf)
    if (this.isAllDigitsEqual(cpf)) {
      return false
    }
    const digitOne = this.calculateDigit(cpf, 10)
    const digitTwo = this.calculateDigit(cpf, 11)
    const actualDigit = cpf.slice(9)
    const calculatedDigits = `${digitOne}${digitTwo}`
    return actualDigit == calculatedDigits
  }
}
