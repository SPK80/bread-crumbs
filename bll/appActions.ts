import {StatusType} from './appReducer'

export type AppActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: StatusType) =>
  ({type: 'APP/SET-STATUS', status} as const)
