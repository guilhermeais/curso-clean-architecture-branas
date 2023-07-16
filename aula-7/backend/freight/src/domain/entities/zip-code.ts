import Coord from "./coord";
/**
 * Entity - Aggregate Root
 */
export default class ZipCode {
  readonly coord: Coord
  constructor(readonly code: string, readonly lat: number, readonly long: number) {
    this.coord = new Coord(lat, long);
  }
}