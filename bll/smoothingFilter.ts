export class SmoothingFilter {
  value: number
  
  constructor(value: number = 0) {
    this.value = value
  }
  
  calc(value: number) {
    return (value - this.value) * 0.5
  }
}
