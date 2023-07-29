import PBKDF2Password from "../../src/domain/entities/pbkdf2-password";

test('Deve criar uma senha', () => {
  const password= PBKDF2Password.create('abc123')
  const isValid = password.validate('abc123')

  expect(isValid).toBe(true)
});