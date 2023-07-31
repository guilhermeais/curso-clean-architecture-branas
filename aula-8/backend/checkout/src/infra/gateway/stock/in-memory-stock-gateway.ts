import { StockGateway } from '../../../application/protocols/gateway/stock-gateway'

export default class InMemoryStockGateway implements StockGateway {
  stocks: { productId: string; quantity: number }[] = []

  async decreaseStock(params: StockGateway.Input): Promise<void> {
    for (const item of params.items) {
      const stock = this.stocks.find(
        stock => stock.productId === item.idProduct
      )

      if (stock && stock.quantity) {
        stock.quantity--
      }
    }
  }
}
