import Segment from "./Segment";

export default interface FareCalculatorHandler {
  calculate(segment: Segment): number

  next?:  FareCalculatorHandler
}