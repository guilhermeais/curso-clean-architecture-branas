import { CPF } from '../src/cpf'

test('Deve criar um cpf válido', () => {
  const validCPF = '042.759.630-08'
  const cpf = new CPF(validCPF)

  expect(cpf).toBeDefined()
})

test('Deve criar um cpf inválido', () => {
  const invalidCPF = '042.759.630-26'
  expect(() => new CPF(invalidCPF)).toThrowError('Invalid CPF')
})
