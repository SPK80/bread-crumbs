import {CompassActionsType} from "./compassActions";
import {IFilter} from "../../../common/bll/IFilter";

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

const calcAzimuthAngle = (magVector: { x: number, y: number, z: number },
                          accelVector: { x: number, y: number, z: number }
): number => {
  const vector_mag = new Vector3D(magVector.x, magVector.y, magVector.z);
  const vector_down = new Vector3D(accelVector.x, accelVector.y, accelVector.z);
  const vector_north = vector_mag.sub(vector_down.mul(vector_mag.dot(vector_down) / vector_down.dot(vector_down)))
  return Math.atan2(vector_north.x, vector_north.y) * 180 / Math.PI;
}


const initialState = {
  azimuthAngle: 0 as number,
  azimuthAngleFilter: null as IFilter | null,
};

export type CompassStateType = {
  azimuthAngle: number
  azimuthAngleFilter: IFilter | null
}

export const compassReducer = (state: CompassStateType = initialState, action: CompassActionsType): CompassStateType => {
  switch (action.type) {
    case 'CALC-AZIMUTH-ANGLE':
      let azimuthAngle = calcAzimuthAngle(action.magVector, action.accelVector)
      state.azimuthAngleFilter && (azimuthAngle = state.azimuthAngleFilter.calc(azimuthAngle))
      return {...state, azimuthAngle}
    case 'SET-AZIMUTH-ANGLE-FILTER':
      return {...state, azimuthAngleFilter: action.azimuthAngleFilter}
    default:
      return state
  }
}
