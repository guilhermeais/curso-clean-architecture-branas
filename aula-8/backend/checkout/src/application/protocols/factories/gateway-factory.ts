import AuthGateway from "../gateway/auth-gateway";
import { CatalogGateway } from "../gateway/catalog-gateway";
import FreightGateway from "../gateway/freight-gateway";

export default interface GatewayFactory {
  createCatalogGateway(): CatalogGateway
  createFreightGateway(): FreightGateway
  createAuthGateway(): AuthGateway
}