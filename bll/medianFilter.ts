import {IFilter} from "./IFilter";

export class MedianFilter implements IFilter {
  values: number[]
  
  constructor() {
    this.values = Array(3).fill(0)
  }
  
  calc(newValue: number) {
    this.values.push(newValue)
    this.values.shift()
    
    const sorted = [...this.values].sort();
    return sorted[1]
  }
}
