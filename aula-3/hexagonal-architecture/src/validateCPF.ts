function isValidLength(cpf: string) {
  return cpf.length >= 11 || cpf.length <= 14
}

function isAllDigitsEqual(cpf: string) {
  return cpf.split('').every(c => c === cpf[0])
}

function removeNonDigits(cpf: string) {
  return cpf.replace(/\D/g, '')
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0

  for (const digit of cpf) {
    if (factor > 1) total += parseInt(digit, 10) * factor--
  }

  const rest = total % 11

  return rest < 2 ? 0 : 11 - rest
}

export function validate(cpf: string) {
  if (!cpf) {
    return false
  }

  if (!isValidLength(cpf)) {
    return false
  }

  cpf = removeNonDigits(cpf)
  if (isAllDigitsEqual(cpf)) {
    return false
  }
  const digitOne = calculateDigit(cpf, 10)
  const digitTwo = calculateDigit(cpf, 11)
  const actualDigit = cpf.slice(9)
  const calculatedDigits = `${digitOne}${digitTwo}`
  return actualDigit == calculatedDigits
}
