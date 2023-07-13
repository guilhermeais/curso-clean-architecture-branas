// value object 
export default class OrderCode {
  private _value: string 

  constructor(date: Date, sequence: number) {
    this._value = `${date.getFullYear()}${sequence.toString().padStart(8, '0')}`
  }

  get value() {
    return this._value
  }
}