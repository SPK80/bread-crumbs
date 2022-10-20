export const rounded = function (number: number) {
  return +number.toFixed(2);
}

export class Vector3D {
  x: number
  y: number
  z: number
  
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  dot(rhs: Vector3D): number {
    return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
  }
  
  mul(c: number) {
    return new Vector3D(this.x * c, this.y * c, this.z * c);
  }
  
  sub(v: Vector3D) {
    return new Vector3D(this.x - v.x, this.y - v.y, this.z - v.z);
  }
}
