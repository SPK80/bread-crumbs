import {IFilter} from "./IFilter";

export class VectorFilter {
  xFilter: IFilter
  yFilter: IFilter
  zFilter: IFilter
  
  constructor(xFilter: IFilter, yFilter: IFilter, zFilter: IFilter) {
    this.xFilter = xFilter
    this.yFilter = yFilter
    this.zFilter = zFilter
  }
  
  calc(newVector: { x: number, y: number, z: number }) {
    return {
      x: this.xFilter.calc(newVector.x),
      y: this.xFilter.calc(newVector.y),
      z: this.xFilter.calc(newVector.z),
    }
  }
}
