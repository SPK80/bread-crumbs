import {CrumbsActionsType} from "./crumbsActions";

export type CrumbType = {
  lat: number
  long: number
}

export  type FollowModeType = 'forward' | 'comeback'

export type CrumbStateType = {
  stuck: CrumbType[]
  followMode: FollowModeType
  takeRadius: number
  distance: number
}

const initialState: CrumbStateType = {
  stuck: [],
  followMode: "forward",
  takeRadius: 10,
  distance: 0,
}

const calcDistance = (location: CrumbType, crumb: CrumbType,): number => {
  return Math.sqrt((location.lat - crumb.lat) * (location.lat - crumb.lat)
    + (location.long - crumb.long) * (location.long - crumb.long)) / 0.000016
}

const isCrumbBeside = (location: CrumbType, crumb: CrumbType, takeRadius: number): boolean => {
  if (!location || !crumb) return false
  return calcDistance(location, crumb) < takeRadius
}

const findBesideCrumbIndex = (state: CrumbStateType, crumb: CrumbType) =>
  state.stuck.findIndex(c => isCrumbBeside(crumb, c, state.takeRadius))

const getLastCrumb = (state: CrumbStateType) => state.stuck[state.stuck.length - 1]

export const crumbsReducer = (state: CrumbStateType = initialState, action: CrumbsActionsType): CrumbStateType => {
  switch (action.type) {
    case "DROP-CRUMB":
      if (isCrumbBeside(action.crumb, getLastCrumb(state), state.takeRadius))
        return state
      else return {...state, stuck: [...state.stuck, action.crumb]}
    case "TAKE-CRUMB":
      const besideCrumbIndex = findBesideCrumbIndex(state, action.crumb)
      if (besideCrumbIndex >= 0)
        return {
          ...state,
          stuck: state.stuck.slice(0, besideCrumbIndex)
        }
      else return state
    case "SET-FOLLOW-MODE":
      return {
        ...state,
        followMode: action.followMode
      }
    case "CALC-DISTANCE":
      const c = getLastCrumb(state)
      if (!c) return {...state, distance: NaN}
      return {
        ...state,
        distance: calcDistance(action.location, c)
      }
    default:
      return state
  }
}
