import ZipCode from "../../../domain/entities/zip-code";

export default interface ZipCodeRepository {
  get(code: string): Promise<ZipCode|null>
}