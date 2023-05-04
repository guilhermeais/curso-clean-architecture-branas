import { validate } from "../src/main";


test.each([
  "042.759.630-08",
  "587.099.304-00",
  "746.971.314-01",
])(`Deve testar se o cpf é vaĺido %s`, (cpf) => {
  const isValid = validate(cpf)
  expect(isValid).toBeTruthy();
});

test.each([
  "142.759.630-34",
  "142.759.630",
  "142.759",
])('Dve testar um cpf inválido %s', (cpf) => {
  const isValid = validate(cpf)
  expect(isValid).toBeFalsy(); 
});

test.each([
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
])('Dve testar um cpf com dígitos iguais %s', (cpf) => {
  const isValid = validate(cpf)
  expect(isValid).toBeFalsy(); 
});

test.each(
  ['', null, undefined, NaN]
)('Deve validar se o CPF é vazio %s', (cpf) => {
  const isValid = validate(cpf as string)
  expect(isValid).toBeFalsy(); 
});