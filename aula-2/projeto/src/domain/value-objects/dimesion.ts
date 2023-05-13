export class Dimesion {
  private readonly _height: number
  private readonly _width: number
  private readonly _length: number

  constructor(dimesion: DimesionProps) {
    this._height = dimesion.height
    this._width = dimesion.width
    this._length = dimesion.length
  }

  private static isValid(dimesion: DimesionProps) {
    if (dimesion?.height < 0 || dimesion?.width < 0 || dimesion?.length < 0) {
      return false;
    }

    return true;
  }

  static create(dimesion: DimesionProps) {
    const isValid = Dimesion.isValid(dimesion)

    if (!isValid) {
      throw new Error('Invalid dimension')
    }

    return new Dimesion(dimesion)
  }

  get height() {
    return this._height
  }

  get width() {
    return this._width
  }

  get length() {
    return this._length
  }

  get volume() {
    return (this._height / 100) * (this._width / 100) * (this._length / 100)
  }

  isValid() {
    return Dimesion.isValid({
      height: this._height,
      width: this._width,
      length: this._length
    })
  }
}

export type DimesionProps = {
  height: number
  width: number
  length: number
}