import { CatalogGateway } from "./catalog-gateway";
import FreightGateway from "./freight-gateway";

export default interface GatewayFactory {
  createCatalogGateway(): CatalogGateway
  createFreightGateway(): FreightGateway
}