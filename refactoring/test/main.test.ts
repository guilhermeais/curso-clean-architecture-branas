import { calc } from '../src/main'

test('Deve calcular a tarifa de uma corrida em um dia normal', () => {
  const fare = calc([
    {
      dist: 10,
      ds: new Date('2021-03-01T10:00:00'),
    },
  ])  

  expect(fare).toBe(21)
});


