import {CompassActionsType} from "./compassActions";
import {IFilter} from "../../../common/bll/IFilter";
import {Vector3D} from "../../../bll/common";

const calcAzimuthAngle = (magVector: { x: number, y: number, z: number },
                          accelVector: { x: number, y: number, z: number }
): number => {
  const vector_mag = new Vector3D(magVector.x, magVector.y, magVector.z);
  const vector_down = new Vector3D(accelVector.x, accelVector.y, accelVector.z);
  const vector_north = vector_mag.sub(vector_down.mul(vector_mag.dot(vector_down) / vector_down.dot(vector_down)))
  return Math.atan2(vector_north.x, vector_north.y) * 180 / Math.PI;
}

const calcTargetAngle = (location: { lat: number; long: number },
                         target: { lat: number; long: number }
): number => {
  return Math.atan2((location.long - target.long), (location.lat - target.lat)) * 180 / Math.PI
}

export type CompassStateType = {
  azimuthAngle: number
  targetAngle: number
  azimuthAngleFilter: IFilter | null
}

const initialState: CompassStateType = {
  azimuthAngle: 0,
  targetAngle: 0,
  azimuthAngleFilter: null,
};

export const compassReducer = (state: CompassStateType = initialState, action: CompassActionsType): CompassStateType => {
  switch (action.type) {
    case 'CALC-AZIMUTH-ANGLE':
      let azimuthAngle = calcAzimuthAngle(action.magVector, action.accelVector)
      state.azimuthAngleFilter && (azimuthAngle = state.azimuthAngleFilter.calc(azimuthAngle))
      return {...state, azimuthAngle}
    case 'SET-AZIMUTH-ANGLE-FILTER':
      return {...state, azimuthAngleFilter: action.azimuthAngleFilter}
    case "CALC-TARGET-ANGLE":
      const targetAngle = calcTargetAngle(action.location, action.target)
      // if (Number.isNaN(targetAngle)) return state
      return {...state, targetAngle}
    default:
      return state
  }
}
