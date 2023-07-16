import ZipCodeRepository from "../../application/protocols/repositories/zip-code.repository";
import ZipCode from "../../domain/entities/zip-code";

export default class InMemoryZipCodeRepository implements ZipCodeRepository {
  zipCodes: Map<string, ZipCode> = new Map();

  async get(code: string): Promise<ZipCode|null> {
    const zipCode = this.zipCodes.get(code);

    if (!zipCode) return null;

    return zipCode
  }
}