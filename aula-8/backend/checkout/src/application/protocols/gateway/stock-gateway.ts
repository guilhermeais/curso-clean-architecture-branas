export interface StockGateway {
  decreaseStock(params: StockGateway.Input): Promise<StockGateway.Output>
}

export namespace StockGateway {
  export type Input = {
    items: { idProduct: string; quantity: number }[]
  }

  export type Output = void
}
