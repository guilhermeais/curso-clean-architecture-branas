import SimulateFreight from '../../application/usecases/simulate-freight'

export class UseCaseFactory {
  createSimulateFreight(): SimulateFreight {
    return new SimulateFreight()
  }
}
