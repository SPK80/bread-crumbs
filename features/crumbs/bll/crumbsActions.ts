import {CrumbType, FollowModeType} from "./crumbsReducer";

export type CrumbsActionsType =
  | ReturnType<typeof dropCrumbAC>
  | ReturnType<typeof takeCrumbAC>
  | ReturnType<typeof setFollowModeAC>
  | ReturnType<typeof calcDistanceAC>

export const dropCrumbAC = (crumb: CrumbType) => ({
  type: 'DROP-CRUMB',
  crumb,
} as const)

export const takeCrumbAC = (crumb: CrumbType) => ({
  type: 'TAKE-CRUMB',
  crumb,
} as const)

export const setFollowModeAC = (followMode: FollowModeType) => ({
  type: 'SET-FOLLOW-MODE',
  followMode,
} as const)

export const calcDistanceAC = (location: CrumbType) => ({
  type: 'CALC-DISTANCE',
  location,
} as const)
