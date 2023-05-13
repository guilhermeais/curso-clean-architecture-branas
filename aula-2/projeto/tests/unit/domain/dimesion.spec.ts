import { Dimesion } from "../../../src/domain/value-objects/dimesion";

describe('Dimesion', () => {
  test('Deve tacar um erro se alguma dimensão for inválida', () => {
    expect(() => Dimesion.create({
      height: -1,
      width: 1,
      length: 1
    })).toThrowError('Invalid dimension')

    expect(() => Dimesion.create({
      height: 1,
      width: -1,
      length: 1
    })).toThrowError('Invalid dimension')

    expect(() => Dimesion.create({
      height: 1,
      width: 1,
      length: -1
    })).toThrowError('Invalid dimension')
    
  });

  test('Deve retornar um volume válido', () => {
    const height = 20
    const width = 15
    const length = 10
    const expectedVolume = 0.003

    const dimesion = Dimesion.create({height, width, length})

    expect(dimesion.volume).toBe(expectedVolume)
  });
});