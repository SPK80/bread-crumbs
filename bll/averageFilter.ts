export class AverageFilter {
  values: number[]
  
  constructor(length: number = 1) {
    this.values = Array(length).fill(0)
  }
  
  calc(newValue: number) {
    const shifted = this.values.shift() ?? 0
    this.values.push(newValue)
    return this.values.reduce((out, v) => out + v
      , shifted) / (this.values.length + 1)
  }
}
