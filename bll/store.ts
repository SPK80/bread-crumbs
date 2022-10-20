import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {appReducer} from "./appReducer";
import {AppActionsType} from "./appActions";
import {CompassActionsType} from "../features/compass/bll/compassActions";
import {compassReducer} from "../features/compass/bll/compassReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {crumbsReducer} from "../features/crumbs/bll/crumbsReducer";
import {CrumbsActionsType} from "../features/crumbs/bll/crumbsActions";

const rootReducer = combineReducers({
  app: appReducer,
  compass: compassReducer,
  crumbs: crumbsReducer,
})

export type AllActionsType = AppActionsType | CompassActionsType | CrumbsActionsType
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
