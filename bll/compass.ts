export const calcAngle = (magVector: { x: number, y: number, z: number },
                          accelVector: { x: number, y: number, z: number }
): number => {
  
  const vector_mag = new Vector3D(magVector.x, magVector.y, magVector.z);
  const vector_down = new Vector3D(accelVector.x, accelVector.y, accelVector.z);
  const vector_north = vector_mag.sub(vector_down.mul(vector_mag.dot(vector_down) / vector_down.dot(vector_down)))
  
  return Math.atan2(vector_north.x, vector_north.y) * 180 / Math.PI;
}

class Vector3D {
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
