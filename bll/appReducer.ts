import {AppActionsType} from "./appActions";

export enum StatusType {
  idle,
  loading,
  succeeded,
  failed,
}

export type AppStateType = {
  status: StatusType
  error: string | null
}

const initialState: AppStateType = {
  status: StatusType.idle,
  error: null,
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error, status: StatusType.failed}
    default:
      return state
  }
}
