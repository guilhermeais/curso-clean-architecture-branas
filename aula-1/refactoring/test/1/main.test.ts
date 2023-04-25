import { calculateRide } from '../../src/1/main'

test('Deve calcular a tarifa de uma corrida em um dia normal', () => {
  const fare = calculateRide([
    {
      distance: 10,
      date: new Date('2021-03-01T10:00:00'),
    },
  ])  

  expect(fare).toBe(21)
});

test('Deve calcular a tarifa de todas corridas em um dia normal', () => {
  const fare = calculateRide([
    {
      distance: 10,
      date: new Date('2021-03-01T10:00:00'),
    },
    {
      distance: 10,
      date: new Date('2021-03-01T10:00:00'),
    },
  ])  

  expect(fare).toBe(42)
});


test('Deve calcular a tarifa de uma corrida de noite', () => {
  const fare = calculateRide([
    {
      distance: 10,
      date: new Date('2021-03-01T23:00:00'),
    },
  ])  

  expect(fare).toBe(39)
});

test('Deve calcular a tarifa de uma corrida domingo de dia', () => {
  const fare = calculateRide([
    {
      distance: 10,
      date: new Date('2021-03-07T10:00:00'),
    },
  ])  

  expect(fare).toBe(29)
});

test('Deve calcular a tarifa de uma corrida domingo de noite', () => {
  const fare = calculateRide([
    {
      distance: 10,
      date: new Date('2021-03-07T23:00:00'),
    },
  ])  

  expect(fare).toBe(50)
});

test('Deve tacar um erro se a distancia for inválida', () => {
  const invalidDistanceCall = () => calculateRide([
    {
      distance: -10,
      date: new Date('2021-03-07T23:00:00'),
    },
  ])  

  expect(invalidDistanceCall).toThrow(new Error('Invalid distance'))
});

test('Deve retornar -2 se a data for inválida', () => {
  const invalidDateCall = () => calculateRide([
    {
      distance: 10,
      date: new Date('datefddatef'),
    },
  ])  

  expect(invalidDateCall).toThrow(new Error('Invalid Date'))
});

test('Deve retornar 10 como tarifa mínima', () => {
  const fare = calculateRide([
    {
      distance: 2,
      date: new Date('2021-03-07T10:00:00'),
    },
  ])  

  expect(fare).toBe(10)
});