import {IFilter} from "../../../common/bll/IFilter";

export type CompassActionsType =
  | ReturnType<typeof calcAzimuthAngleAC>
  | ReturnType<typeof setAzimuthAngleFilterAC>
  | ReturnType<typeof calcTargetAngleAC>

export const calcAzimuthAngleAC = (magVector: { x: number, y: number, z: number },
                                   accelVector: { x: number, y: number, z: number }) => ({
  type: 'CALC-AZIMUTH-ANGLE',
  magVector,
  accelVector,
} as const)

export const calcTargetAngleAC = (location: { lat: number, long: number },
                                  target: { lat: number, long: number }) => ({
  type: 'CALC-TARGET-ANGLE',
  location,
  target,
} as const)


export const setAzimuthAngleFilterAC = (azimuthAngleFilter: IFilter) => ({
  type: 'SET-AZIMUTH-ANGLE-FILTER',
  azimuthAngleFilter,
} as const)
