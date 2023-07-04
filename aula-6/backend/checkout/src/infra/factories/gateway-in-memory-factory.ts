import GatewayFactory from "../../application/gateway/gateway-factory";
import InMemoryCatalogGateway from "../gateway/in-memory-catalog-gateway";
import InMemoryFreightGateway from "../gateway/in-memory-freight-gateway";

export class GatewayInMemoryFactory  implements GatewayFactory {
  createCatalogGateway(): InMemoryCatalogGateway {
    return new  InMemoryCatalogGateway()
  }
  createFreightGateway(): InMemoryFreightGateway {
    return new InMemoryFreightGateway()
  }

}