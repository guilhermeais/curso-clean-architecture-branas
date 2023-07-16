import Coord from "../../src/domain/entities/coord";
import DistanceCalculator from "../../src/domain/entities/dinstance-calculator";

test('Deve calcular a distância entre duas coordenadas', () => {
  const from = new Coord(-27.5945, -48.5477);
  const to = new Coord(-22.9129, -43.2003);
  const distance = DistanceCalculator.calculate(from, to)

  expect(distance).toEqual(748.2217780081631)
});