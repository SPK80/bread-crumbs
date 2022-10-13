export type CoordsType = {
  lat: number
  long: number
}

export class CrumbsStack {
  private readonly items: Array<CoordsType> = []
  
  push(coords: CoordsType) {
    this.items.push(coords)
  }
  
  pop() {
    return this.items.pop()
  }
  
  get current() {
    return this.items[this.items.length - 1]
  }
  
  get all() {
    return this.items
  }
  
  getLengthTo(coords: CoordsType) {
    const {lat, long} = this.current;
    return Math.sqrt((lat - coords.lat) ^ 2 + (long - coords.long) ^ 2)
  }
}
