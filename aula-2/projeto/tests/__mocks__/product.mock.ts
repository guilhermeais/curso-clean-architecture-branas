import { Product, ProductProps } from "../../src/domain/entities/product";
import { Dimesion } from "../../src/domain/value-objects/dimesion";

export function  makeProduct(): ProductProps {
  return {
    name: 'any-product',
    description: 'any-description',
    price: 100,
    weight: 2,
    dimesion: Dimesion.create({
      height: 10,
      length: 10,
      width: 10
    })
  }
}