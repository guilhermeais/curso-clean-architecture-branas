import { CPF } from '../../src/domain/entities/cpf'

test.each([
  "042.759.630-08",
  "587.099.304-00",
  "746.971.314-01",
  "74697131401",
])('Deve validar um cpf válido: %s', (validCPF) => {
  const cpf = new CPF(validCPF)

  expect(cpf).toBeDefined()
})

test.each([
  "142.759.630-34",
  "142.759.630",
  "142.759",
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
])('Deve validar um cpf inválido: %s', (invalidCPF) => {
  expect(() => new CPF(invalidCPF)).toThrowError('Invalid CPF')
})


test.each(
  ['', null, undefined, NaN]
)('Deve validar se o CPF é vazio %s', (invalidCPF) => {
  expect(() => new CPF(invalidCPF as string)).toThrowError('Invalid CPF')

});