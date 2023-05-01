import NormalFareCalculatorHandler from '../../src/2/NormalFareCalculatorHandler'
import OvernightFareCalculatorHandler from '../../src/2/OvernightFareCalculatorHandler'
import OvernightSundayFareCalculatorHandler from '../../src/2/OvernightSudayFareCalculatorHandler'
import Ride from '../../src/2/Ride'
import SundayFareCalculatorHandler from '../../src/2/SundayFareCalculatorHandler'

let ride: Ride
beforeEach(() => {
  const overnightSundayFareCalculatorHandler = new OvernightSundayFareCalculatorHandler()
  const overnightFareCalculatorHandler = new OvernightFareCalculatorHandler(overnightSundayFareCalculatorHandler)
  const sundayFareCalculatorHandler = new SundayFareCalculatorHandler(overnightFareCalculatorHandler)
  const normalFareCalculator = new NormalFareCalculatorHandler(
    sundayFareCalculatorHandler
  )

  ride = new Ride(normalFareCalculator)
})

test('Deve calcular a tarifa de uma corrida em um dia normal', () => {
  ride.addSegment(10, new Date('2021-03-01T10:00:00'))
  const fare = ride.calculateFare()

  expect(fare).toBe(21)
})

test('Deve calcular a tarifa de uma corrida de noite', () => {
  ride.addSegment(10, new Date('2021-03-01T23:00:00'))
  const fare = ride.calculateFare()

  expect(fare).toBe(39)
})

test('Deve calcular a tarifa de uma corrida domingo', () => {
  ride.addSegment(10, new Date('2021-03-07T10:00:00'))
  const fare = ride.calculateFare()

  expect(fare).toBe(29)
})

test('Deve calcular a tarifa de uma corrida domingo de noite', () => {
  ride.addSegment(10, new Date('2021-03-07T23:00:00'))
  const fare = ride.calculateFare()

  expect(fare).toBe(50)
})

test('Deve taca um erro se a distância for inválida', () => {
  const invalidAddSegmentCall = () =>
    ride.addSegment(-10, new Date('2021-03-07T10:00:00'))
  expect(invalidAddSegmentCall).toThrow(new Error('Invalid distance'))
})

test('Deve taca um erro se a data for inválida', () => {
  const invalidAddSegmentCall = () =>
    ride.addSegment(10, new Date('ewfewwefewr'))
  expect(invalidAddSegmentCall).toThrow(new Error('Invalid Date'))
})

test('Deve retornar o valor mínimo da tarifa caso a tarifa seja menor que o mínimo', () => {
  ride.addSegment(2, new Date('2021-03-07T23:00:00'))
  const fare = ride.calculateFare()

  expect(fare).toBe(Ride.MIN_FARE)
})
