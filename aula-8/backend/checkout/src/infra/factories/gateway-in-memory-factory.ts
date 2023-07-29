import GatewayFactory from "../../application/gateway/gateway-factory";
import InMemoryCatalogGateway from "../gateway/in-memory-catalog-gateway";
import InMemoryFreightGateway from "../gateway/in-memory-freight-gateway";

export class GatewayInMemoryFactory  implements GatewayFactory {
  catalogGateway: InMemoryCatalogGateway = new  InMemoryCatalogGateway();
  freightGateway: InMemoryFreightGateway = new  InMemoryFreightGateway();
  createCatalogGateway(): InMemoryCatalogGateway {
    return this.catalogGateway
  }
  createFreightGateway(): InMemoryFreightGateway {
    return this.freightGateway
  }

}